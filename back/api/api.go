package api

import (
	"github.com/go-playground/locales/en"
	ut "github.com/go-playground/universal-translator"
	"github.com/go-playground/validator/v10"
)

var (
	validate *validator.Validate
	uni      *ut.UniversalTranslator
)

func init() {
	en := en.New()
	uni = ut.New(en, en)
	validate = validator.New()
}
