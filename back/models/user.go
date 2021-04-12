package models

import (
	"fmt"
	"log"

	"github.com/go-playground/validator/v10"
	"github.com/gofrs/uuid"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

// User struct to represent a user in the system
type User struct {
	BaseModel
	// ID        uuid.UUID `gorm:"type:uuid;primary_key"`
	Username  string `gorm:"type:varchar(32)" json:"username"`
	FirstName string `gorm:"type:varchar(24)" json:"firstName"`
	LastName  string `gorm:"type:varchar(24)" json:"lastName"`
	Email     string `gorm:"type:varchar(32)" json:"email" validate:"email"` // valid:"email~Provide correct email address"
	Password  string
	IsAdmin   bool `gorm:"type:boolean" json:"isAdmin"`
	// Products  Products `json:"-"`
}

func (u User) String() string {
	return fmt.Sprintf("<User: %s %s>", u.ID, u.Username)
}

// BeforeCreate hook is used to create a random uuid for ID
func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
	err = u.Validate(tx).Error
	if tx.Error != nil {
		// log.Printf("[ERROR] %s", err.Error())
		return
	}

	uuid, err := uuid.NewV4()
	if err != nil {
		log.Printf("[ERROR] couldn't generate uuid for PK: %s", err.Error())
		return
	}
	u.ID = uuid
	// err = scope.SetColumn("ID", uuid)

	// hash, err := bcrypt.GenerateFromPassword([]byte(password.Field.String()), bcrypt.DefaultCost)
	hash, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
	if err != nil {
		// return errors.WithStack(err)
		return
	}
	// err = scope.SetColumn("Password", string(hash))
	u.Password = string(hash)

	if u.Username == "" {
		// err = scope.SetColumn("Username", email.Field.String())
		u.Username = u.Email
	}

	return
}

// Validate checks that pass parameters have correct format and that the
// User object can be safely created
func (u User) Validate(tx *gorm.DB) *gorm.DB {
	var row struct {
		Exists bool
	}

	// ok, err := govalidator.ValidateStruct(u)
	err := validate.Struct(u)
	if err != nil {
		errs := err.(validator.ValidationErrors)
		for _, e := range errs {
			log.Printf("[WARNING] Validate: %s", e.Translate(trans))
			tx.AddError(fmt.Errorf("%s:%s", e.Field(), e.Translate(trans)))
		}
		// log.Printf("[ERROR] %s", err.Error())
	}
	// db.Raw("SELECT EXISTS ? AS exists", db.Table("users").Select("id").Where("email = ?", u.Email).Where("deleted_at IS NULL").SubQuery()).Scan(&row)
	tx.Raw("SELECT EXISTS (?) as exists", tx.Table("users").Select("id").Where("email = ?", u.Email)).Scan(&row)
	if row.Exists {
		tx.AddError(fmt.Errorf("%s:Email %q is already registered", "__all__", u.Email))
		// log.Printf("[WARNING] error: %s", fmt.Sprintf("Email %q is already registered", u.Email))
	}

	return tx
}
