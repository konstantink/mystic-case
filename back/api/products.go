package api

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/mingrammer/cfmt"
	"github.com/mystic-case/back/models"
	"gorm.io/gorm"
)

type WebProduct struct {
	ID           string
	Name         string
	Title        string
	Description  string
	Price        string
	Currency     string
	Difficulty   int8
	IsFeatured   bool
	IsNew        bool
	IsBestseller bool
	Images       []string `json:",omitempty"`
	HasVariants  bool
	Variants     []string `json:",omitempty"`
}

func GetFeaturedProductsList(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"products": []gin.H{{
		"id":          1,
		"name":        "Haunted Castle box",
		"description": "Mr. X recently has bought an old castle somewhere in Scotland. Soon afterwards he moved in with his family. However, after a few weeks, mysterious events began to happen in and around the castle that frightened all the family. Will you be able to resolve this case and help Mr. X?",
		"prices": []gin.H{{
			"price":    "3600",
			"currency": "GBP",
		}},
		"difficulty":   3,
		"isFeatured":   true,
		"isNew":        false,
		"isBestseller": true,
		"images": []gin.H{{
			"id":   1,
			"url":  "https://cdn.filestackcontent.com/security=p:eyJleHBpcnkiOjE2MjQyMzcxOTl9,s:6849b3e8c81081db48621ac9bfba1065e6084bfe50d40a7c03e1e5531ea2579b/resize=w:1000,h:1000,fit:max/output=format:jpg/quality=v:70/N4SvVujsQCOJucdlH8Mc",
			"name": "Haunted Castle box",
		}},
	}, {
		"id":          2,
		"name":        "UFO Crash box",
		"description": "The National Space Agency tracked a UFO as it fell through to Earth. As of yet, no conclusive evidence has been found on the nature of the spacecraft, the causes of the accident, or its purpose. All we have been left with is a locked cockpit and a black box. Will you be able to untangle this mystery and find out the Truth? Why did these extraterrestrial visitors decide to come to Earth and just what caused them to crash here?",
		"prices": []gin.H{{
			"price":    "3600",
			"currency": "GBP",
		}},
		"difficulty":   3,
		"isFeatured":   true,
		"isNew":        false,
		"isBestseller": false,
		"images": []gin.H{{
			"id":   1,
			"url":  "https://cdn.filestackcontent.com/security=p:eyJleHBpcnkiOjE2MjQyMzcxOTl9,s:6849b3e8c81081db48621ac9bfba1065e6084bfe50d40a7c03e1e5531ea2579b/resize=w:1000,h:1000,fit:max/output=format:jpg/quality=v:70/BZQ3i8TjQSQpIlSxbhXK",
			"name": "UFO Crash box",
		}},
	}, {
		"id":          4,
		"name":        "Simulation Theory box",
		"description": "Knock, knock… A laptop has mysteriously materialised at our detective agency. Attached was a note: \"Only the chosen knows the username.\" Will you be able to get inside the system and complete what is necessary to save the simulation itself, and therefore all humanity?",
		"prices": []gin.H{{
			"price":    "3600",
			"currency": "GBP",
		}},
		"currency":     "GBP",
		"difficulty":   5,
		"isFeatured":   true,
		"isNew":        true,
		"isBestseller": false,
		"images": []gin.H{{
			"id":   1,
			"url":  "https://cdn.filestackcontent.com/security=p:eyJleHBpcnkiOjE2MjQyMzcxOTl9,s:6849b3e8c81081db48621ac9bfba1065e6084bfe50d40a7c03e1e5531ea2579b/resize=w:1000,h:1000,fit:max/output=format:jpg/quality=v:70/Z1t6nRaTNOOEyV6MHkVN",
			"name": "Simulation Theory box",
		}},
	}, {
		"id":          3,
		"name":        "School of Magic box",
		"description": "Recently an attack was made on a School of Magic. Someone tried to steal the Sacred Tablet hidden in the secret depths of the castle. The school founder inscribed a mighty spell on it, that gives infinite power to its owner. Are you able to face up to magical forces and find out who dared to invade the school and can you solve where the Sacred Tablet is now?",
		"prices": []gin.H{{
			"price":    "3600",
			"currency": "GBP",
		}},
		"difficulty":   4,
		"isFeatured":   true,
		"isNew":        false,
		"isBestseller": false,
		"images": []gin.H{{
			"id":   1,
			"url":  "https://cdn.filestackcontent.com/security=p:eyJleHBpcnkiOjE2MjQyMzcxOTl9,s:6849b3e8c81081db48621ac9bfba1065e6084bfe50d40a7c03e1e5531ea2579b/resize=w:1000,h:1000,fit:max/output=format:jpg/quality=v:70/z5c29Et1REGj0XcRfCOM",
			"name": "School of Magic box",
		}},
	}}})
}

// ProductsHandlerFunc is a handler for GET requests used for
// admin access of the shop to show all available products
// whether they are published or not
func ProductsHandlerFunc(c *gin.Context) {
	var products []models.Product
	models.DB.Scopes(models.WithoutDeleted).Find(&products)
	//c.JSON(http.StatusOK, gin.H{"success": true, "products": []string{"Product #1", "Product #2"}})
	c.JSON(http.StatusOK, gin.H{"success": true, "products": products})
}

// ProductHandlerFunc is a handler for POST / PUT / PATCH
// requests. This is available only for registered users,
// i.e. admins to create new products for the shop
func ProductHandlerFunc(c *gin.Context) {
	var (
		newProduct models.Product
		errors     models.ModelErrors
		// price      models.Price
		// webProduct WebProduct
	)

	err := c.BindJSON(&newProduct)
	if err != nil {
		log.Print(cfmt.Errorf("Failed to parse input %s", err.Error()))
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "error": err.Error()})
		return
	}
	// log.Print(newProduct)

	errors, valid := models.Validate(newProduct)
	if !valid {
		log.Print(cfmt.Warningf("[WARNING] something is invalid"))
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "errors": errors})
		return
	}

	err = models.DB.Transaction(func(tx *gorm.DB) error {
		errors, err = models.CreateProduct(tx, &newProduct)
		return err
	})

	if len(errors) != 0 {
		log.Print(cfmt.Serrorf("[ERROR] failed to product with associations: %s", err.Error()))
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "errors": errors})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"success": true, "product": newProduct})
}

// func extractPrice(input *WebProduct, dest *models.Price) error {
// 	// TODO: Perhaps need to check that this is correct currency code
// 	dest.Currency = input.Currency
// 	dest.Amount = input.Price

// 	return nil
// }
