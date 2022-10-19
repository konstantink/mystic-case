package models

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"reflect"
	"strings"
	"time"

	"github.com/go-playground/locales/en"
	ut "github.com/go-playground/universal-translator"
	v "github.com/go-playground/validator/v10"
	en_translations "github.com/go-playground/validator/v10/translations/en"
	"github.com/gofrs/uuid"
	"github.com/kelseyhightower/envconfig"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"

	// import eveything to migrate DB
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"

	"gorm.io/driver/postgres"
	// import everything from postgres dialect
	_ "gorm.io/driver/postgres"
)

// DB is a connection to your database to be used
// throughout your application.
var DB *gorm.DB

// // validate global variable for model struct validations
// var validate = validator.New()

var (
	validator *v.Validate
	uni       *ut.UniversalTranslator
	trans     ut.Translator
	found     bool
)

func init() {
	en := en.New()
	uni = ut.New(en, en)

	trans, found = uni.GetTranslator("en")
	if !found {
		log.Printf("[WARNING] can't find translator")
	}

	validator = v.New()
	en_translations.RegisterDefaultTranslations(validator, trans)

	validator.RegisterValidation("unique", func(fl v.FieldLevel) bool {
		var row struct {
			Exists bool
		}
		p := fl.Parent()
		log.Print(p.Type())
		// t := p.FieldByName(fl.FieldName())
		// DB.Where(fmt.Sprintf("%s = ?", "email"), fl.Field().String()).Error
		DB.Raw("SELECT EXISTS (?) as exists", DB.Table("users").Select("id").Where("email = ?", fl.Field().String())).Scan(&row)
		log.Printf("===> %s %v", fl.Field().String(), row.Exists)
		return !row.Exists
	})

	validator.RegisterTranslation("email", trans, func(ut ut.Translator) error {
		return ut.Add("email", "Provide correct email address", true) // see universal-translator for details
	}, func(ut ut.Translator, fe v.FieldError) string {
		t, _ := ut.T("email", fe.Field())

		return t
	})

	validator.RegisterTagNameFunc(func(fld reflect.StructField) string {
		name := strings.SplitN(fld.Tag.Get("json"), ",", 2)[0]
		if name == "-" {
			return ""
		}
		return name
	})
}

// EnvConfig configuration for the environment that can be set for the DB
type EnvConfig struct {
	Env string
}

func init() {
	var (
		dbName    string
		dsn       string
		err       error
		envConfig EnvConfig
	)
	err = envconfig.Process("mysticcase", &envConfig)
	if envConfig.Env == "test" {
		dbName = "mysticcase_test"
	} else {
		dbName = "mysticcase_dev"
	}

	dsn = fmt.Sprintf("host=%s port=%d user=%s dbname=%s password=%s sslmode=disable",
		"127.0.0.1", 5432, "mysticcase", dbName, "pass321")
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.New(
			log.New(os.Stdout, "\r\n", log.LstdFlags),
			logger.Config{
				SlowThreshold:             time.Millisecond * 100,
				LogLevel:                  logger.Info,
				IgnoreRecordNotFoundError: false,
				Colorful:                  true,
			},
		),
	})
	// "postgres", fmt.Sprintf("host=%s port=%d user=%s dbname=%s password=%s sslmode=disable",
	// "127.0.0.1", 5432, "mysticcase", dbName, "pass321"))

	if err != nil {
		log.Fatal(err)
	}

	// DB.LogMode(true)
	// validations.RegisterCallbacks(DB)
	// pop.Debug = env == "development"
	migrateDB()
}

func migrateDB() {
	// m, err := migrate.New("file://migrations", DB.)
}

// BaseModel base struct for all models that just uses UUID primary key
type BaseModel struct {
	ID        uuid.UUID    `gorm:"type:uuid;primary_key" json:"id"`
	CreatedAt time.Time    `json:"created_at"`
	UpdatedAt time.Time    `json:"updated_at"`
	DeletedAt sql.NullTime `json:"deleted_at"`
}

// BeforeCreate use this hook to auto-generate new PK
func (o *BaseModel) BeforeCreate(tx *gorm.DB) error {
	// idField, _ := scope.FieldByName("ID")
	// log.Print(cfmt.Sinfo("[DEBUG] BaseModel BeforeCreate"))
	if o.ID == uuid.Nil {
		uuid, err := uuid.NewV4()
		if err != nil {
			log.Printf("[ERROR] couldn't generate uuid for PK: %s", err.Error())
			return err
		}

		o.ID = uuid
		// err = scope.SetColumn("ID", uuid)
		// if err != nil {
		// 	log.Printf("[ERROR] couldn't set uuid value for PK: %s", err.Error())
		// 	return err
		// }
	}

	return nil
}

// WithoutDeleted function to limit query to get only records that
// do not have deleted_at set to certain value
func WithoutDeleted(q *gorm.DB) *gorm.DB {
	return q.Where("deleted_at IS NULL")
}

// Personalised function to limit query to personal to current user data
func Personalised(userID interface{}) func(q *gorm.DB) *gorm.DB {
	return func(q *gorm.DB) *gorm.DB {
		switch reflect.TypeOf(userID).Kind() {
		case reflect.String:
			return q.Where("user_id = ?", userID)
		case reflect.Interface:
			return q.Where("user_id = ?", userID.(string))
		}
		return q
	}
}

// IValidator
type IValidator interface {
	Validate() (ModelErrors, bool)
}

// Validate function to initiate validation of the passed model
// object. Function returns a dictionary of errors and field names
func Validate(object IValidator) (ModelErrors, bool) {
	errors, valid := object.Validate()
	return errors, valid
}
