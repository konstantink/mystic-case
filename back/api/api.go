package api

import (
	"log"
	"os"
	"time"

	"github.com/adam-hanna/jwt-auth/jwt"
	"github.com/adam-hanna/sessions"
	"github.com/adam-hanna/sessions/auth"
	"github.com/adam-hanna/sessions/transport"
	"github.com/go-playground/locales/en"
	ut "github.com/go-playground/universal-translator"
	"github.com/go-playground/validator/v10"
	"github.com/mingrammer/cfmt"
)

var (
	validate        *validator.Validate
	uni             *ut.UniversalTranslator
	sesh            *sessions.Service
	restrictedRoute jwt.Auth = jwt.Auth{}

	// Logger *zap.SugaredLogger
)

func init() {
	// Logger := zap.NewDevelopment()

	en := en.New()
	uni = ut.New(en, en)
	validate = validator.New()

	checkEnv()

	// seshStore := store.New(store.Options{})
	seshStore := &SessionStore{}
	seshAuth, err := auth.New(auth.Options{
		Key: []byte(os.Getenv("MYSTIC_CASE_SESSION_KEY")),
	})

	if err != nil {
		log.Fatal(cfmt.Serrorf("[ERROR] env variable is not set up: %s", err.Error()))
	}

	seshTran := transport.New(transport.Options{
		HTTPOnly: true,
		Secure:   false, // Should depend on environment: prod or dev
	})

	sesh = sessions.New(seshStore, seshAuth, seshTran, sessions.Options{ExpirationDuration: 24 * time.Hour})

	// newRouteError := jwt.New(&restrictedRoute, jwt.Options{
	// 	SigningMethodString:   "HS256",
	// 	HMACKey:               []byte(os.Getenv("MYSTIC_CASE_SECRET_KEY")),
	// 	BearerTokens:          true,
	// 	RefreshTokenValidTime: 7 * 24 * time.Hour,
	// 	AuthTokenValidTime:    15 * time.Minute,
	// 	Debug:                 true,
	// 	IsDevEnv:              true,
	// })

	// if newRouteError != nil {
	// 	log.Print(cfmt.Serrorf("[ERROR] can't create restrict route %s", newRouteError.Error()))
	// }
}

func checkEnv() {
	if _, exist := os.LookupEnv("MYSTIC_CASE_SESSION_KEY"); !exist {
		os.Setenv("MYSTIC_CASE_SESSION_KEY", "secret_session")
	}
	if _, exist := os.LookupEnv("MYSTIC_CASE_SECRET_KEY"); !exist {

		os.Setenv("MYSTIC_CASE_SECRET_KEY", "secret_key")
	}
	if _, exist := os.LookupEnv("MYSTIC_CASE_DOMAIN"); !exist {
		os.Setenv("MYSTIC_CASE_DOMAIN", "mysticcase.io")
	}
}
