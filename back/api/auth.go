package api

import (
	"crypto/rand"
	"encoding/base64"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	// "github.com/adam-hanna/jwt-auth/jwt"
	"github.com/adam-hanna/sessions"
	"github.com/adam-hanna/sessions/user"
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

func createToken(uID uuid.UUID) (token *models.TokenData, err error) {
	secret := os.Getenv("MYSTIC_CASE_SECRET_KEY")
	// claims := jwt.ClaimsType{}
	// claims.CustomClaims = make(gin.H)
	// claims.CustomClaims["userid"] = uID
	// claims.CustomClaims["authorized"] = true

	// err := restrictedRoute.IssueNewTokens(c.Writer, &claims)
	// if err != nil {
	// 	log.Printf("[WARNING] failed to issue tokens %s", err.Error())
	// 	return err
	// }
	token = &models.TokenData{}
	token.AccessUUID, _ = uuid.NewV4()
	token.AtExpires = time.Now().Add(time.Minute * 15).Unix()
	token.RefreshUUID, _ = uuid.NewV4()
	token.RtExpires = time.Now().Add(time.Hour * 24 * 7).Unix()

	// Creating Access Token
	atClaims := jwt.MapClaims{}
	atClaims["authorized"] = true
	atClaims["userid"] = uID
	atClaims["access_uuid"] = token.AccessUUID
	atClaims["exp"] = token.AtExpires
	at := jwt.NewWithClaims(jwt.SigningMethodHS256, atClaims)
	token.AccessToken, err = at.SignedString([]byte(secret))
	if err != nil {
		return nil, err
	}

	// Creating Refresh Token
	rtClaims := jwt.MapClaims{}
	rtClaims["userid"] = uID
	rtClaims["refresh_uuid"] = token.RefreshUUID
	rtClaims["exp"] = token.RtExpires
	rt := jwt.NewWithClaims(jwt.SigningMethodHS256, rtClaims)
	token.RefreshToken, err = rt.SignedString([]byte(secret))
	if err != nil {
		return nil, err
	}

	return token, nil
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

func issueSession(c *gin.Context, sesh *sessions.Service, u *models.User) (*user.Session, error) {
	csrf, err := generateKey()

	if err != nil {
		log.Fatal("Something happened during csrf generation")
		return nil, err
	}

	csrfJSON := SessionJSON{CSRF: csrf}

	JSONBytes, err := json.Marshal(csrfJSON)
	if err != nil {
		log.Fatalf("Couldn't marshal csrf structure: %s", err)
		return nil, err
	}

	session, err := sesh.IssueUserSession(u.ID.String(), string(JSONBytes[:]), c.Writer)
	if err != nil {
		log.Fatalf("Couldn't issue session: %s", err)
		return nil, err
	}

	log.Printf("Issued session id: %s; user id: %s", session.ID, session.UserID)
	log.Printf("Issued csrf: %s", csrf)
	// c.SetCookie("csrf", csrf, 3600, "/", "localhost", false, false) // TODO: should depend on the environment
	return session, nil
}

func checkSessionAndInvalidate(r *http.Request) error {
	session, err := sesh.GetUserSession(r)
	if err != nil {
		log.Print(cfmt.Sinfof("[INFO] Houston, we've got a problem with session %s", err.Error()))
	}

	if session != nil {
		userSession, err := models.GetSession(session.ID)
		err = userSession.Invalidate(false)
		if err != nil {
			log.Print(cfmt.Swarningf("[WARNING] can't invalidate session %s %s", userSession.ID, err.Error()))
			return err
		}
	}

	return nil
}

// LoginTokenHandlerFunc is an alternative handler for Login action
// that creates an access/refresh tokens instead of CSRF
func LoginTokenHandlerFunc(c *gin.Context) {
	var (
		input struct {
			Login    string `json:"username"`
			Password string `json:"password"`
		}
		user models.User
	)

	err := checkSessionAndInvalidate(c.Request)
	if err != nil {
		log.Print(cfmt.Serrorf("[ERROR] can't invalidate session"))
	}

	c.ShouldBind(&input)

	err = models.DB.Where("username = ?", input.Login).First(&user).Error
	if err != nil {
		log.Printf("[WARNING] Can't find user %s in system", input.Login)
		c.JSON(http.StatusUnauthorized, gin.H{"success": false, "error": "Username and password don't match"})
		return
	}

	if ok, errors := tryLogin(&user, input.Password); ok {
		token, err := createToken(user.ID)
		if err != nil {
			c.JSON(http.StatusUnprocessableEntity, gin.H{"success": false, "error": err.Error()})
			return
		}
		tokenJSON, err := json.Marshal(token)
		if err != nil {
			c.JSON(http.StatusUnprocessableEntity, gin.H{"success": false, "error": err.Error()})
			return
		}

		_, err = sesh.IssueUserSession(user.ID.String(), string(tokenJSON), c.Writer)
		if err != nil {
			log.Printf("[ERROR] Can't login user")
			c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
			return
		}
		// c.SetSameSite(http.SameSiteNoneMode)
		// c.SetCookie("session", user.ID.String(), 3600*24, "/", os.Getenv("MYSTIC_CASE_DOMAIN"), false, true)
		c.JSON(http.StatusOK, gin.H{"success": true, "access_token": token.AccessToken, "refresh_token": token.RefreshToken})
	} else {
		c.JSON(http.StatusUnauthorized, gin.H{"success": false, "error": errors.Error()})
	}
}

// LoginHandlerFunc handler for the Login/Signin action
func LoginHandlerFunc(c *gin.Context) {
	var (
		input struct {
			Login    string `json:"username"`
			Password string `json:"password"`
		}
		user       models.User
		sesh       *sessions.Service
		tmpCookies SessionJSON
		tmp, _     = c.Get("sessionManager")
	)

	sesh = tmp.(*sessions.Service)

	c.ShouldBind(&input)

	err := models.DB.Where("username = ?", input.Login).First(&user).Error
	if err != nil {
		log.Printf("[WARNING] Can't find user %s in system", input.Login)
		c.JSON(http.StatusUnauthorized, map[string]string{"Username": "Username and password don't match"})
	}

	if ok, errors := tryLogin(&user, input.Password); ok {
		session, err := issueSession(c, sesh, &user)
		if err != nil {
			log.Printf("[ERROR] Can't login user")
			c.JSON(http.StatusInternalServerError, err)
		}

		// log.Printf("Issued session id: %s", sesh.)
		err = json.Unmarshal([]byte(session.JSON), &tmpCookies)
		if err != nil {
			log.Printf("[ERROR] Couldn't unmarshal issued cookies: %s", err)
			c.JSON(http.StatusInternalServerError, err)
		}

		c.SetCookie("csrf", tmpCookies.CSRF, 3600*24, "/", os.Getenv("MYSTIC_CASE_DOMAIN"), true, true)
		// c.SetCookie("csrf", csrf, 3600, "/", "localhost", false, false)
		// log.Printf(c.GetHeader("Set-Cookie"))
		c.JSON(http.StatusOK, map[string]bool{"success": true})
	} else {
		c.JSON(http.StatusUnauthorized, errors.Error())
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
		log.Printf("[ERROR] %s", err.Error())
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
		log.Printf("[WARNING] Incorrect input: %s", result.Error())
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
	var input struct {
		RefreshToken string `json:"refreshToken"`
	}

	userSession, err := sesh.GetUserSession(c.Request)
	if err != nil {
		log.Print(cfmt.Swarningf("[WARNING] can't extract session from request %s", err.Error()))
	}

	if userSession == nil {
		log.Print(cfmt.Swarning("[WARNING] invalid session"))
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"success": false, "error": errors.New("invalid session")})
		return
	}

	session := models.NewSessionFromUserSession(userSession)
	session.Invalidate(false)

	_ = c.ShouldBind(&input)

	inputToken, err := jwt.Parse(input.RefreshToken, validationKey)
	if err != nil {
		log.Print(cfmt.Swarningf("[WARNING] can't parse refresh token %s: %s", input.RefreshToken, err.Error()))
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"success": false, "error": err.Error()})
		return
	}

	if ok, err := validateToken(inputToken); !ok {
		log.Print(cfmt.Swarningf("[WARNING] refresh token is invalid: %s", err.Error()))
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"success": false, "error": err.Error()})
		return
	}

	userID, _ := uuid.FromString(inputToken.Claims.(jwt.MapClaims)["userid"].(string))
	token, err := createToken(userID)
	if err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{"success": false, "error": err.Error()})
		return
	}
	tokenJSON, err := json.Marshal(token)
	if err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{"success": false, "error": err.Error()})
		return
	}

	_, err = sesh.IssueUserSession(userID.String(), string(tokenJSON), c.Writer)
	if err != nil {
		log.Printf("[ERROR] Can't login user")
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err})
		return
	}

	c.JSON(http.StatusOK, gin.H{"success": true, "access_token": token.AccessToken, "refresh_token": token.RefreshToken})
}
