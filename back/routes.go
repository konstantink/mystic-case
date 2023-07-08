package main

import (
	"github.com/gin-gonic/gin"
	"github.com/mystic-case/back/api"
)

func initRoutes(router *gin.Engine) {
	initPublicRoutes(router)
	initAPIV1Routes(router)
}

func initPublicRoutes(router *gin.Engine) {
	// router.GET("/whoami", api.UserMiddleware(), api.WhoamIHandlerFunc)
	// router.GET("/_helth", func(c *gin.Context) { c.JSON(http.StatusOK, gin.H{"success": true}) })
}

func initAPIV1Routes(router *gin.Engine) {
	apiV1Routes := router.Group("/api/v1")
	{
		authRoutes := apiV1Routes.Group("/u")
		{
			authRoutes.POST("/signin", api.LoginTokenHandlerFunc)
			authRoutes.POST("/signup", api.RegisterHandlerFunc)
			authRoutes.GET("/whoami", api.UserMiddleware(), api.WhoamIHandlerFunc)
		}

		tokenRoutes := apiV1Routes.Group("/token")
		{
			tokenRoutes.POST("/refresh", api.TokenRefreshHandlerFunc)
			tokenRoutes.GET("/health", api.AuthMiddleware(), api.TokenHealthHandlerFunc)
		}

		productRoutes := apiV1Routes.Group("/products", api.UserMiddleware())
		{
			productRoutes.GET("/featured", api.GetFeaturedProductsList)
		}

		adminRoutes := apiV1Routes.Group("/admin", api.AuthMiddleware())
		{
			adminRoutes.GET("/products", api.FetchProductsHandlerFunc)
			adminRoutes.GET("/product/:productId", api.FetchProductHandlerFunc)
			adminRoutes.PATCH("/product/:productId", api.PatchProductHandlerFunc)
			adminRoutes.POST("/product", api.ProductHandlerFunc)
			adminRoutes.POST("/gallery/upload", api.UploadFileHandlerFunc)
		}
	}
}
