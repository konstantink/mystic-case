package main

import (
	"fmt"
	"log"
	"os"
	"time"

	"github.com/adam-hanna/sessions"
	"github.com/adam-hanna/sessions/auth"
	"github.com/adam-hanna/sessions/transport"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/mystic-case/back/api"
)

var router *gin.Engine
var sesh *sessions.Service

// EnvConfig configuration for the environment that can be set for the app
type EnvConfig struct {
	Env string
}

func initSessionsManager() {
	// seshStore := store.New(store.Options{})
	seshStore := &api.SessionStore{}
	seshAuth, err := auth.New(auth.Options{
		Key: []byte("2ldKfvHU8qO0oFN2nPTyAXT6tfwHbu62YB1mU/XGFSrgrrmJFViapDsd8keQDbX6wSd3jOpwwHbI9UXZzf97Eg=="),
	})

	if err != nil {
		log.Fatal(err)
	}

	seshTran := transport.New(transport.Options{
		HTTPOnly: true,
		Secure:   false, // Should depend on environment: prod or dev
	})

	sesh = sessions.New(seshStore, seshAuth, seshTran, sessions.Options{ExpirationDuration: 24 * time.Hour})
}

// func issueSession(c *gin.Context, sesh *sessions.Service, u *models.User) error {
// 	csrf, err := generateKey()
// 	if err != nil {
// 		log.Fatal("Something happened during csrf generation")
// 		return err
// 	}
//
// 	csrfJSON := SessionJSON{CSRF: csrf}
//
// 	JSONBytes, err := json.Marshal(csrfJSON)
// 	if err != nil {
// 		log.Fatalf("Couldn't marshal csrf structure: %s", err)
// 		return err
// 	}
//
// 	_, err = sesh.IssueUserSession(u.ID.String(), string(JSONBytes[:]), c.Writer)
// 	if err != nil {
// 		log.Fatalf("Couldn't issue session: %s", err)
// 		return err
// 	}
//
// 	c.SetCookie("csrf", csrf, 3600, "/", "", false, false) // TODO: should depend on the environment
// 	return nil
// }

func main() {
	var router = gin.Default()

	initSessionsManager()

	// initRoutes(router)

	// router.POST("/login", func(c *gin.Context) {
	// 	var user models.User
	//
	// 	c.ShouldBind(&user)
	//
	// 	if ok, errors := tryLogin(&user); ok {
	// 		err := issueSession(c, sesh, &user)
	// 		if err != nil {
	// 			log.Fatal("Can't login user")
	// 			c.JSON(http.StatusInternalServerError, err)
	// 		}
	//
	// 		// c.Cookie(name)
	// 		// c.JSON(http.StatusOK, obj)
	// 	} else {
	// 		c.JSON(http.StatusUnauthorized, errors.Errors)
	// 	}
	// })

	// CORS for https://foo.com and https://github.com origins, allowing:
	// - PUT and PATCH methods
	// - Origin header
	// - Credentials share
	// - Preflight requests cached for 12 hours
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://127.0.0.1:3000", "http://localhost:3000", "http://mysticcase.io:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Content-Length", "x-mystic-case-request-id", "x-mystic-case-session-id", "authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		// AllowOriginFunc: func(origin string) bool {
		// 	return origin == "https://github.com"
		// },
		MaxAge: 12 * time.Hour,
	}))
	initRoutes(router)
	router.Run(fmt.Sprintf("%s:8085", os.Getenv("MYSTIC_CASE_DOMAIN")))
}
