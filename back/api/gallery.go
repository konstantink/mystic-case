package api

import (
	"fmt"
	"log"
	"mime/multipart"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/h2non/bimg"
	"github.com/mingrammer/cfmt"
	"github.com/mystic-case/back/models"
)

func createThumbnail(width, height int, input *multipart.FileHeader) {
	src, _ := input.Open()
	defer src.Close()

	rawImage := make([]byte, input.Size)
	src.Read(rawImage)

	img := bimg.NewImage(rawImage)
	corpImg, _ := img.SmartCrop(width, height)

	sf, _ := os.Create(fmt.Sprintf("build/uploads/thumbnails/tb_%d_%d_%s", width, height, input.Filename))
	defer sf.Close()

	sf.Write(corpImg)
}

func UploadFileHandlerFunc(c *gin.Context) {
	file, _ := c.FormFile("file")
	dst := fmt.Sprintf("build/uploads/%s", file.Filename)
	err := c.SaveUploadedFile(file, dst)
	if err != nil {
		log.Print(cfmt.Errorf("[ERROR] Failed to save file %s", err.Error()))
		c.JSON(http.StatusUnprocessableEntity, gin.H{"success": false, "error": err.Error()})
		return
	}

	createThumbnail(150, 150, file)

	image := models.Image{
		Name: file.Filename,
	}

	models.DB.Create(&image)

	c.JSON(http.StatusCreated, gin.H{"success": true, "item": image})
}
