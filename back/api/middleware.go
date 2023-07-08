package api

import (
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gofrs/uuid"
	"github.com/golang-jwt/jwt"
	"github.com/mingrammer/cfmt"
	"github.com/mystic-case/back/models"
)

type basicInfo struct {
	IP        string
	Referer   string
	UserAgent string
}

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

func extractFromCookie(c *gin.Context) (string, error) {
	return c.Cookie("mc_uid")
}

func extractBasicInfo(c *gin.Context) basicInfo {
	return basicInfo{
		IP:        c.GetHeader("Host"),
		Referer:   c.GetHeader("Referer"),
		UserAgent: c.GetHeader("User-Agent"),
	}
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

func parseToken(tokenValue string) (*jwt.Token, error) {
	parser := new(jwt.Parser)
	parser.ValidMethods = []string{jwt.SigningMethodHS256.Name}
	parsedToken, err := parser.Parse(tokenValue, validationKey)

	// if err != nil {
	// 	log.Printf(cfmt.Swarningf("[WARNING] failed to parse token: %s", err.Error()))
	// 	return nil, err
	// }
	return parsedToken, err
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

		parsedToken, err := parseToken(token)
		if err != nil {
			if err.Error() == "Token is expired" {
				if tokenID, ok := parsedToken.Claims.(jwt.MapClaims)["uuid"]; ok {
					var accessToken models.Token
					models.GetTokenByID(&accessToken, tokenID, models.AccessTokens)
					accessToken.Invalidate()
				}
			}
			log.Printf(cfmt.Swarningf("[WARNING] failed to parse token: %s", err.Error()))
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"success": false, "error": err.Error()})
			return
		}

		c.Set("access_token", parsedToken)
		c.Set("user_id", parsedToken.Claims.(jwt.MapClaims)["sub"].(string))

		c.Next()
	}
}

func UserMiddleware() func(*gin.Context) {
	return func(c *gin.Context) {
		sessionID, err := extractFromCookie(c)
		if err != nil {
			info := extractBasicInfo(c)
			log.Print(cfmt.Sinfof("[INFO] new user access: ip:%s referer:%s user-agent:%s", info.IP, info.Referer, info.UserAgent))
		}

		c.Set("mc_uid", sessionID)

		c.Next()

		// if err != nil {
		log.Print(cfmt.Sinfo("[INFO] setting cookie"))
		session, _ := uuid.NewV4()
		c.SetSameSite(http.SameSiteLaxMode)
		c.SetCookie("mc_uid", session.String(), int(time.Hour*24*7), "/", "mysticcase.io", false, false)
		// }
	}
}

// UserSessionMiddleware enriches context with user id extracted
// from the session cookie.
