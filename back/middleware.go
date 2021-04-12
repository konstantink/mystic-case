package main

import (
	"encoding/json"
	"errors"
	"log"
	"net/http"

	"github.com/adam-hanna/sessions"
	"github.com/gin-gonic/gin"
	"github.com/mystic-case/back/api"
)

// SessionManager is a middleware that adds session manager object
// to the context, that can be used further
func SessionManager() func(*gin.Context) {
	return func(c *gin.Context) {
		c.Set("sessionManager", sesh)

		c.Next()
	}
}

// AuthRequired is a middleware that checks the CSRF token recieved
// in request (or if it's missing), once user is identified, the
// reference is added to the context
func AuthRequired() func(*gin.Context) {
	return func(c *gin.Context) {
		tmp, _ := c.Get("sessionManager")
		sesh := tmp.(*sessions.Service)
		userSession, err := sesh.GetUserSession(c.Request)

		if err != nil {
			log.Printf("Err fetching user session: %v\n", err)
			c.AbortWithError(http.StatusInternalServerError, errors.New("Internal Server Error"))
			return
		}
		if userSession == nil {
			c.AbortWithError(http.StatusUnauthorized, errors.New("sign in to the system"))
			return
		}
		// log.Printf("Found user session %s, expires at %s", userSession.ID, userSession.ExpiresAt)

		csrfJSON := api.SessionJSON{}
		if err := json.Unmarshal([]byte(userSession.JSON), &csrfJSON); err != nil {
			log.Printf("Err unmarshalling json: %v\n", err)
			c.AbortWithError(http.StatusInternalServerError, err)
			return
		}

		csrfToken := c.Request.Header.Get("X-CSRF-Token")
		if csrfToken != csrfJSON.CSRF {
			c.AbortWithError(http.StatusUnauthorized, errors.New("csrf doesn't match user session"))
			return
		}

		// models.DB.Find(&user, userSession.UserID)

		c.Set("user_id", userSession.UserID)
		c.Next()
	}
}
