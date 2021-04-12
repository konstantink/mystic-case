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
		authRoutes := apiV1Routes.Group("/u", SessionManager())
		{
			authRoutes.POST("/signin", api.LoginHandlerFunc)
			authRoutes.POST("/signup", api.RegisterHandlerFunc)
		}
	}
}
