package api

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gofrs/uuid"
	"github.com/mingrammer/cfmt"
	"github.com/mystic-case/back/models"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
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
			"url":  "https://storage.googleapis.com/mystic-case.co.uk/google-merchants-images/gm-jigsaw.jpeg",
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
			"url":  "https://storage.googleapis.com/mystic-case.co.uk/google-merchants-images/gm-jigsaw.jpeg",
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
			"url":  "https://storage.googleapis.com/mystic-case.co.uk/google-merchants-images/gm-jigsaw.jpeg",
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
			"url":  "https://storage.googleapis.com/mystic-case.co.uk/google-merchants-images/gm-jigsaw.jpeg",
			"name": "School of Magic box",
		}},
	}}})
}

// FetchProductsHandlerFunc is a handler for GET requests used for
// admin access of the shop to show all available products
// whether they are published or not
func FetchProductsHandlerFunc(c *gin.Context) {
	var products []models.Product

	userID, exists := c.Get("user_id")
	if !exists {
		log.Print(cfmt.Serrorf("[ERROR] request is not authorized"))
		c.JSON(http.StatusUnauthorized, gin.H{"success": false, "error": "user is not authenticated"})
		return
	}

	models.DB.Scopes(models.WithoutDeleted, models.Personalised(userID)).
		Preload("Prices").Preload("Prices.Interval").
		Where("deleted_at IS NULL").
		Find(&products)

	c.JSON(http.StatusOK, gin.H{"success": true, "products": products})
}

// FetchProductHandlerFunc is a handler for GET requests used
// to get information about product
func FetchProductHandlerFunc(c *gin.Context) {
	var product models.Product
	userID, _ := c.Get("user_id")
	log.Print(cfmt.Sinfof("[DEBUG] found user %s", userID))
	models.DB.Scopes(models.WithoutDeleted, models.Personalised(userID)).
		Preload("Prices").
		Preload("Prices.Interval").
		Find(&product, "id = ?", c.Param("productId"))

	c.JSON(http.StatusOK, gin.H{"success": true, "product": product})
}

// PatchProductHandlerFunc is a handler for PATCH requests used
// to update product. Only changes are sent that should be applied
// to the product.
func PatchProductHandlerFunc(c *gin.Context) {
	var (
		product, updatedProduct models.Product
	)

	// userID, exists := c.Get("user_id")
	// if !exists {
	// 	log.Print(cfmt.Serrorf("[ERROR] request is not authorized"))
	// 	c.JSON(http.StatusUnauthorized, gin.H{"success": false, "error": "user is not authenticated"})
	// 	return
	// }

	userID, _ := c.Get("user_id")

	err := models.GetProductByID(&product, c.Param("productId"), userID.(string))
	if err != nil {
		log.Print(cfmt.Serrorf("[ERROR] can't find product %s", err.Error()))
		c.JSON(http.StatusNotFound, gin.H{"success": false, "error": err.Error()})
		return
	}

	c.BindJSON(&updatedProduct)

	err = models.DB.Model(&updatedProduct).Omit(clause.Associations).Updates(updatedProduct).Error
	if err != nil {
		log.Print(cfmt.Serrorf("[ERROR] can't update product %s", err.Error()))
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "error": err.Error()})
		return
	}

	// if
	if len(updatedProduct.Prices) > 0 {
		// for _, price := range product.Prices {
		for _, updatedPrice := range updatedProduct.Prices {
			log.Println("[DEBUG]: Before:", updatedPrice)
			//var price models.Price
			// err := models.DB.Model(&updatedPrice).First(&updatedPrice).Error
			err := models.DB.Model(&updatedPrice).Omit(clause.Associations).Error
			if err != nil {
				log.Print(cfmt.Serrorf("[ERROR] can't update price %s", err.Error()))
				c.JSON(http.StatusNotFound, gin.H{"success": false, "error": err.Error()})
				return
			}
			log.Println("[DEBUG]: After:", updatedPrice)
		}
		// }
	}

	c.JSON(http.StatusAccepted, gin.H{"success": true})
}

// ProductHandlerFunc is a handler for POST requests.
// This is available only for registered users,
// i.e. admins to create new products for the shop
func ProductHandlerFunc(c *gin.Context) {
	var (
		user       models.User
		newProduct models.Product
		errors     models.ModelErrors
		// price      models.Price
		// webProduct WebProduct
	)

	userID, exists := c.Get("user_id")
	if !exists {
		log.Print(cfmt.Serrorf("[ERROR] request is not authenticated"))
		c.JSON(http.StatusUnauthorized, gin.H{"success": false, "error": "user is not authenticated"})
		return
	}

	models.GetUserByID(&user, userID.(string))

	if !user.IsAdmin {
		log.Print(cfmt.Serrorf("[ERROR] user is not authorized"))
		c.JSON(http.StatusUnauthorized, gin.H{"success": false, "error": "user is not authorized"})
		return
	}

	err := c.BindJSON(&newProduct)
	if err != nil {
		log.Print(cfmt.Errorf("Failed to parse input %s", err.Error()))
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "error": err.Error()})
		return
	}
	// log.Print(newProduct)

	newProduct.UserID = uuid.FromStringOrNil(userID.(string))
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
