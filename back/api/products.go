package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetFeaturedProductsList(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"products": []gin.H{{
		"id":           1,
		"name":         "Haunted Castle box",
		"description":  "Mr. X recently has bought an old castle somewhere in Scotland. Soon afterwards he moved in with his family. However, after a few weeks, mysterious events began to happen in and around the castle that frightened all the family. Will you be able to resolve this case and help Mr. X?",
		"price":        "3600",
		"currency":     "GBP",
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
		"id":           2,
		"name":         "UFO Crash box",
		"description":  "The National Space Agency tracked a UFO as it fell through to Earth. As of yet, no conclusive evidence has been found on the nature of the spacecraft, the causes of the accident, or its purpose. All we have been left with is a locked cockpit and a black box. Will you be able to untangle this mystery and find out the Truth? Why did these extraterrestrial visitors decide to come to Earth and just what caused them to crash here?",
		"price":        "3600",
		"currency":     "GBP",
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
		"id":           4,
		"name":         "Simulation Theory box",
		"description":  "Knock, knock… A laptop has mysteriously materialised at our detective agency. Attached was a note: \"Only the chosen knows the username.\" Will you be able to get inside the system and complete what is necessary to save the simulation itself, and therefore all humanity?",
		"price":        "3600",
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
		"id":           3,
		"name":         "School of Magic box",
		"description":  "Recently an attack was made on a School of Magic. Someone tried to steal the Sacred Tablet hidden in the secret depths of the castle. The school founder inscribed a mighty spell on it, that gives infinite power to its owner. Are you able to face up to magical forces and find out who dared to invade the school and can you solve where the Sacred Tablet is now?",
		"price":        "3600",
		"currency":     "GBP",
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
	c.JSON(http.StatusOK, gin.H{"success": true, "products": []string{"Product #1", "Product #2"}})
}
