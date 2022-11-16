package api

import (
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	// "github.com/adam-hanna/jwt-auth/jwt"

	"github.com/gin-gonic/gin"
	"github.com/gofrs/uuid"
	"github.com/golang-jwt/jwt"
	"github.com/mingrammer/cfmt"
	"github.com/mystic-case/back/models"
	"github.com/pkg/errors"
	"golang.org/x/crypto/bcrypt"
)

// SessionJSON structure to represent csrf session
type SessionJSON struct {
	CSRF string `json:"csrf"`
}

func generateKey() (string, error) {
	b := make([]byte, 16)
	if _, err := io.ReadFull(rand.Reader, b); err != nil {
		return "", err
	}
	return base64.URLEncoding.EncodeToString(b), nil
}

func hashPassword(password string) (hashedPassword string) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return errors.WithStack(err).Error()
	}
	hashedPassword = string(hash)
	return
}

func createPairOfTokensFromRefreshToken(user models.User, refreshToken models.Token) (tokens *models.TokensPair, err error) {
	tokens, err = generatePairOfTokens(user)
	if err != nil {
		return nil, err
	}

	tokens.AccessToken.RefreshedFromID = &refreshToken.ID
	tokens.RefreshToken.RefreshedFromID = &refreshToken.ID

	err = tokenStore.SaveUserTokens(tokens)
	if err != nil {
		log.Print(cfmt.Swarningf("[WARNING] can't store tokens %s", err.Error()))
		return nil, err
	}

	return tokens, nil
}

func createPairOfTokens(user models.User) (tokens *models.TokensPair, err error) {
	tokens, err = generatePairOfTokens(user)
	if err != nil {
		return nil, err
	}

	err = tokenStore.SaveUserTokens(tokens)
	if err != nil {
		log.Print(cfmt.Swarningf("[WARNING] can't store tokens %s", err.Error()))
		return nil, err
	}

	return tokens, nil
}

func generatePairOfTokens(user models.User) (tokens *models.TokensPair, err error) {
	// var userID uuid.UUID

	secret := os.Getenv("MYSTIC_CASE_SECRET_KEY")
	tokens = new(models.TokensPair)

	tokens.AccessToken.ID, _ = uuid.NewV4()
	tokens.AccessToken.ExpiresAt = time.Now().Add(time.Minute * 15).Unix()
	tokens.AccessToken.Type = models.AccessToken
	tokens.AccessToken.UserID = user.ID
	tokens.AccessToken.Active = true
	tokens.RefreshToken.ID, _ = uuid.NewV4()
	tokens.RefreshToken.ExpiresAt = time.Now().Add(time.Hour * 24 * 7).Unix()
	tokens.RefreshToken.Type = models.RefreshToken
	tokens.RefreshToken.UserID = user.ID
	tokens.RefreshToken.Active = true

	// Creating Access Token
	atClaims := jwt.MapClaims{}
	atClaims["authorized"] = true
	atClaims["sub"] = user.ID
	atClaims["name"] = fmt.Sprintf("%s %s", user.FirstName, user.LastName)
	atClaims["admin"] = user.IsAdmin
	atClaims["uuid"] = tokens.AccessToken.ID
	atClaims["exp"] = tokens.AccessToken.ExpiresAt
	atClaims["iss"] = "mystic-case.co.uk"
	at := jwt.NewWithClaims(jwt.SigningMethodHS256, atClaims)
	tokens.AccessToken.Value, err = at.SignedString([]byte(secret))
	if err != nil {
		return nil, err
	}

	// Creating Refresh Token
	rtClaims := jwt.MapClaims{}
	rtClaims["sub"] = user.ID
	rtClaims["refresh_uuid"] = tokens.RefreshToken.ID
	rtClaims["access_uuid"] = tokens.AccessToken.ID
	rtClaims["exp"] = tokens.RefreshToken.ExpiresAt
	rtClaims["iss"] = "mystic-case.co.uk"
	rt := jwt.NewWithClaims(jwt.SigningMethodHS256, rtClaims)
	tokens.RefreshToken.Value, err = rt.SignedString([]byte(secret))
	if err != nil {
		return nil, err
	}

	return tokens, nil
}

// tryLogin tries to login user, basically checks if the username exists in DB
// and password corresponds to this user
func tryLogin(u *models.User, password string) (bool, error) {
	if err := bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(password)); err != nil {
		// log.Printf("[WARNING] Password is incorrect: %s, expected: %s", password, u.Password)
		log.Print(cfmt.Swarningf("[WARNING] Passwords do not match: %s", err.Error()))
		// models.DB.AddError(validations.NewError(u, "Username", "Username and password don't match"))
		// return false, validations.NewError(u, "Username", "Username and password don't match")
		return false, errors.New("Username and password don't match")
	}

	return true, nil
}

// func checkSessionAndInvalidate(r *http.Request) error {
// 	session, err := sesh.GetUserSession(r)
// 	if err != nil {
// 		log.Print(cfmt.Sinfof("[INFO] Houston, we've got a problem with session %s", err.Error()))
// 		return err
// 	}

// 	if session != nil {
// 		userSession, err := models.GetSession(session.ID)
// 		err = userSession.Invalidate(false)
// 		if err != nil {
// 			log.Print(cfmt.Swarningf("[WARNING] can't invalidate session %s %s", userSession.ID, err.Error()))
// 			return err
// 		}
// 	}

// 	return nil
// }

// LoginTokenHandlerFunc is an alternative handler for Login action
// that creates an access/refresh tokens instead of CSRF
func LoginTokenHandlerFunc(c *gin.Context) {
	var (
		input struct {
			Login    string `json:"username"`
			Password string `json:"password"`
		}
		user models.User
		err  error
	)

	c.ShouldBind(&input)

	err = models.DB.Where("username = ?", input.Login).First(&user).Error
	if err != nil {
		log.Print(cfmt.Swarningf("[WARNING] Can't find user %s in system", input.Login))
		c.JSON(http.StatusUnauthorized, gin.H{"success": false, "error": "Username and password don't match"})
		return
	}

	if ok, errors := tryLogin(&user, input.Password); ok {
		token, err := createPairOfTokens(user)
		if err != nil {
			c.JSON(http.StatusUnprocessableEntity, gin.H{"success": false, "error": err.Error()})
			return
		}
		// tokenJSON, err := json.Marshal(token)
		if err != nil {
			c.JSON(http.StatusUnprocessableEntity, gin.H{"success": false, "error": err.Error()})
			return
		}

		// _, err = sesh.IssueUserSession(user.ID.String(), string(tokenJSON), c.Writer)
		if err != nil {
			log.Print(cfmt.Serror("[ERROR] Can't login user"))
			c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
			return
		}
		// c.SetSameSite(http.SameSiteNoneMode)
		// c.SetCookie("session", user.ID.String(), 3600*24, "/", os.Getenv("MYSTIC_CASE_DOMAIN"), false, true)
		c.JSON(http.StatusOK, gin.H{"success": true, "access_token": token.AccessToken.Value, "refresh_token": token.RefreshToken.Value})
	} else {
		c.JSON(http.StatusUnauthorized, gin.H{"success": false, "error": errors.Error()})
	}
}

// RegisterHandlerFunc handler to perform user registration.
// Get arguments from the request and tries to create new
// user in the DB. If something wrong happens then sends
// errors to the front.
func RegisterHandlerFunc(c *gin.Context) {
	var (
		input struct {
			Login    string `json:"username"`
			Password string `json:"password"`
			// Email    string `json:"email"`
		}
		user models.User
	)

	err := c.ShouldBind(&input)
	if err != nil {
		log.Print(cfmt.Serrorf("[ERROR] %s", err.Error()))
		c.JSON(http.StatusUnprocessableEntity, gin.H{"success": false, "error": err.Error()})
		return
	}

	user = models.User{
		Username: input.Login,
		Email:    input.Login,
		Password: input.Password,
	}

	result := models.DB.Create(&user).Error

	if result != nil {
		log.Print(cfmt.Swarningf("[WARNING] Incorrect input: %s", result.Error()))
		response := gin.H{}
		for _, err := range strings.Split(result.Error(), ",") {
			fieldWithMsg := strings.Split(err, ":")
			response[fieldWithMsg[0]] = fieldWithMsg[1] // .(validations.Error).Message
		}
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "errors": response})
	} else {
		c.JSON(http.StatusCreated, gin.H{"success": true})
	}
}

// TokenRefreshHandlerFunc is a handler to process POST requests
// for tokens refresh. It creates a new pair of tokens and invalidates
// current refresh token. In case invalidated token is sent
// invalidates all issued tokens
func TokenRefreshHandlerFunc(c *gin.Context) {
	var (
		input struct {
			RefreshToken string `json:"refresh_token"`
		}
		accessToken  models.Token
		refreshToken models.Token
		user         models.User
	)

	_ = c.ShouldBind(&input)

	parsedToken, err := parseToken(input.RefreshToken)

	refreshTokenID, _ := parsedToken.Claims.(jwt.MapClaims)["refresh_uuid"].(string)
	accessTokenID, _ := parsedToken.Claims.(jwt.MapClaims)["access_uuid"].(string)
	userID, _ := parsedToken.Claims.(jwt.MapClaims)["sub"].(string)
	models.GetTokenByID(&refreshToken, refreshTokenID, models.RefreshTokens)
	models.GetTokenByID(&accessToken, accessTokenID, models.AccessTokens)
	err = models.GetUserByID(&user, userID)

	if !refreshToken.Active {

		log.Print(cfmt.Swarningf("[WARNING] the token used %s has been already invalidated", refreshToken.ID))
		// invalidate all tokens
		user.InvalidateTokenTree(refreshTokenID)
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"success": false, "error": "incorrect refresh token"})
		return
	}

	accessToken.Invalidate()
	refreshToken.Invalidate()

	tokens, err := createPairOfTokensFromRefreshToken(user, refreshToken)
	if err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{"success": false, "error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"success": true, "access_token": tokens.AccessToken.Value, "refresh_token": tokens.RefreshToken.Value})
}

// TokenHealthHandlerFunc is an endpoint to check the state of the
// token. In case token is valid return successful response. If
// token is invalid then return 401 to initiate token refresh process
func TokenHealthHandlerFunc(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"success": true})
}

// WhoamiHandlerFunc tries to identify the user by session cookie or
// if available access_token. If it's not available, then issue new
// session only for the guest user. If session is expired and there's
// no access token, then invalidate current session and re-issue new one.
// If access_token is available, that means that user was logged in, so
// he should have refresh token as well, so we return 401 and let him
// go trhough refresh token process
func WhoamIHandlerFunc(c *gin.Context) {
	var user models.User
	if userID, exists := c.Get("user_id"); exists {
		err := models.GetUserByID(&user, userID.(string))
		if err != nil {
			log.Print(cfmt.Warning("[WARNING] user not found"))
			c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"success": false, "error": "user not found"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"success": true, "user": user})
	} else {
		log.Print(cfmt.Warning("[WARNING] user not found"))
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"success": false, "error": "can't get user from request"})
	}
}
