package api

import (
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	"github.com/mingrammer/cfmt"
)

func extractFromHeader(c *gin.Context) (string, error) {
	authHeader := c.GetHeader("Authorization")
	if authHeader == "" {
		return "", nil
	}

	authHeaderParts := strings.Fields(authHeader)
	if len(authHeaderParts) != 2 || strings.ToLower(authHeaderParts[0]) != "bearer" {
		return "", errors.New("Authorization header format should be Bearer <token>")
	}

	return authHeaderParts[1], nil
}

func validateToken(token *jwt.Token) (bool, error) {
	if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
		log.Printf(cfmt.Swarning("[WARNING] got unexpected signing method"))
		return false, fmt.Errorf("got unexpected signing method: %s", token.Header["alg"])
	}
	// Verify scope
	if !token.Valid {
		log.Print(cfmt.Swarning("[WARNING] token is invalid"))
		// c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"success": false, "error": "token is invalid"})
		return false, errors.New("token is invalid")
	}

	return true, nil
}

func validationKey(token *jwt.Token) (interface{}, error) {
	return []byte(os.Getenv("MYSTIC_CASE_SECRET_KEY")), nil
}

// AuthMiddleware checks that request has corresponding authorization
// and populates it with user info, otherwise retun 401 error
func AuthMiddleware() func(*gin.Context) {
	return func(c *gin.Context) {
		token, err := extractFromHeader(c)
		if err != nil {
			log.Printf(cfmt.Swarning("[WARNING] can't extract token from header"))
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"success": false, "error": err.Error()})
			return
		}

		if token == "" {
			log.Printf(cfmt.Swarning("[WARNING] authorization token not found"))
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"success": false, "error": "authorization token not found"})
			return
		}

		parsedToken, err := jwt.Parse(token, validationKey)
		if err != nil {
			log.Printf(cfmt.Swarningf("[WARNING] failed to parse token: %s", err.Error()))
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"success": false, "error": err.Error()})
			return
		}

		if ok, err := validateToken(parsedToken); !ok {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"success": false, "error": err.Error()})
			return
		}

		log.Printf(cfmt.Sinfof("[INFO] parsed token: %v", parsedToken))
		c.Set("access_token", parsedToken)

		c.Next()
	}
}

// UserSessionMiddleware enriches context with user id extracted
// from the session cookie.
