package api

import (
	"crypto/rand"
	"encoding/base64"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"strings"

	"github.com/adam-hanna/sessions"
	"github.com/adam-hanna/sessions/user"
	"github.com/gin-gonic/gin"
	"github.com/gofrs/uuid"
	"github.com/mystic-case/back/models"
	"github.com/pkg/errors"
	"github.com/qor/validations"
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

// tryLogin tries to login user, basically checks if the username exists in DA
// and password corresponds to this user
func tryLogin(u *models.User, password string) (bool, error) {
	// var errors = validate.NewErrors()
	// var hashedPassword = hashPassword(password)

	if models.DB.Where("username = ?", u.Username).Find(u); u.ID == uuid.Nil {
		models.DB.AddError(validations.NewError(u, "Password", "Password is incorrect"))
		// errors.Add("Username", "Username and password don't match")
		return false, validations.NewError(u, "Password", "Password is incorrect")
	} else if err := bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(password)); err != nil {
		log.Printf("[WARNING] Password is incorrect: %s, expected: %s", password, u.Password)
		models.DB.AddError(validations.NewError(u, "Username", "Username and password don't match"))
		return false, validations.NewError(u, "Username", "Username and password don't match")
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

		c.SetCookie("csrf", tmpCookies.CSRF, 3600*24, "/", "", false, false)
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
	var user models.User

	err := c.ShouldBind(&user)
	if err != nil {
		log.Printf("[ERROR] %s", err.Error())
	}

	result := models.DB.Create(&user).Error
	// if err != nil {
	// 	log.Printf("[WARNING] %s", err)
	// 	c.JSON(http.StatusInternalServerError, map[string]error{"error": err})
	// 	return
	// }

	if result != nil {
		log.Printf("[WARNING] Incorrect input: %s", result.Error())
		response := gin.H{}
		for _, err := range strings.Split(result.Error(), ",") {
			fieldWithMsg := strings.Split(err, ":")
			response[fieldWithMsg[0]] = fieldWithMsg[1] // .(validations.Error).Message
		}
		c.JSON(http.StatusBadRequest, gin.H{"status": "fail", "errors": response})
	} else {
		c.JSON(http.StatusCreated, gin.H{"status": "success"})
	}
}
