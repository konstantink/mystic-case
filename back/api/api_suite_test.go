package api_test

import (
	"log"
	"testing"

	"github.com/gin-gonic/gin"
	uut "github.com/mystic-case/back/api"
	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
)

func TestApi(t *testing.T) {
	RegisterFailHandler(Fail)
	RunSpecs(t, "Api Suite")
}

var Router *gin.Engine

func setupRouter() *gin.Engine {
	var router = gin.Default()
	authGroup := router.Group("/u")
	{
		authGroup.POST("/signup", uut.RegisterHandlerFunc)
		authGroup.POST("/signin", uut.LoginHandlerFunc)
	}

	productsGroup := router.Group("/products")
	{
		productsGroup.GET("/featured", uut.GetFeaturedProductsList)
	}

	return router
}

var _ = BeforeSuite(func() {
	log.SetFlags(log.Ldate | log.Ltime | log.Lmicroseconds | log.Llongfile)
	Router = setupRouter()
})
