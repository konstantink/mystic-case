package main

import (
	"github.com/gin-gonic/gin"
	"github.com/mystic-case/back/api"
)

func initRoutes(router *gin.Engine) {
	initAPIV1Routes(router)
}

func initAPIV1Routes(router *gin.Engine) {
	apiV1Routes := router.Group("/api/v1")
	{
		authRoutes := apiV1Routes.Group("/u")
		{
			authRoutes.POST("/signin", api.LoginTokenHandlerFunc)
			authRoutes.POST("/signup", api.RegisterHandlerFunc)
			// authRoutes.GET("/whoami", api.WhomaiHandlerFunc)
		}

		tokenRoutes := apiV1Routes.Group("/token")
		{
			tokenRoutes.POST("/refresh", api.TokenRefreshHandlerFunc)
			tokenRoutes.GET("/health", api.AuthMiddleware(), api.TokenHealthHandlerFunc)
		}

		productRoutes := apiV1Routes.Group("/products", SessionManager())
		{
			productRoutes.GET("/featured", api.GetFeaturedProductsList)
		}

		adminRoutes := apiV1Routes.Group("/admin", api.AuthMiddleware())
		{
			adminRoutes.GET("/products", api.ProductsHandlerFunc)
			adminRoutes.POST("/product", api.ProductHandlerFunc)
			adminRoutes.POST("/gallery/upload", api.UploadFileHandlerFunc)
		}
	}
}
