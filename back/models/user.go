package models

import (
	"fmt"
	"log"

	"github.com/go-playground/validator/v10"
	"github.com/gofrs/uuid"
	"github.com/mingrammer/cfmt"

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
	Sessions  []Session
	// Products  Products `json:"-"`
}

func (u User) String() string {
	return fmt.Sprintf("<User: %s %s>", u.ID, u.Username)
}

// BeforeCreate hook is used to create a random uuid for ID
func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
	err = u.Validate(tx).Error
	if err != nil {
		return
	}

	uuid, err := uuid.NewV4()
	if err != nil {
		log.Printf("[ERROR] couldn't generate uuid for PK: %s", err.Error())
		return
	}
	u.ID = uuid

	hash, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
	if err != nil {
		return
	}
	u.Password = string(hash)

	if u.Username == "" {
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
			log.Print(cfmt.Swarningf("[WARNING] Validate: %s", e.Translate(trans)))
			tx.AddError(fmt.Errorf("%s:%s", e.Field(), e.Translate(trans)))
		}
		log.Print(cfmt.Serrorf("[ERROR] %s", err.Error()))
		return tx
	}
	// db.Raw("SELECT EXISTS ? AS exists", db.Table("users").Select("id").Where("email = ?", u.Email).Where("deleted_at IS NULL").SubQuery()).Scan(&row)
	tx.Raw("SELECT EXISTS (?) as exists", tx.Table("users").Select("id").Where("username = ?", u.Username)).Scan(&row)
	if row.Exists {
		tx.AddError(fmt.Errorf("%s:Email %q is already registered", "__all__", u.Email))
		// log.Printf("[WARNING] error: %s", fmt.Sprintf("Email %q is already registered", u.Email))
	}

	return tx
}

func (u User) InvalidateSessionsAndTokens() error {
	for sessionIndex := range u.Sessions {
		for tokenIndex := range u.Sessions[sessionIndex].Tokens {
			u.Sessions[sessionIndex].Tokens[tokenIndex].Active = false
		}
		u.Sessions[sessionIndex].Active = false
	}

	// err := DB.Session(&gorm.Session{FullSaveAssociations: true}).Updates(&u).Error
	err := DB.Session(&gorm.Session{FullSaveAssociations: true}).Model(&u).Updates(
		User{
			Sessions: []Session{
				{
					Active: false,
					Tokens: []Token{
						{
							Active: false,
						},
					},
				},
			},
		}).Error
	if err != nil {
		log.Print(cfmt.Swarningf("[WARNING] can't invalidate everything %s", err.Error()))
		return err
	}

	return nil
}

// GetUserByID looks up in the database record with
// corresponding id and if exists stores the result
// to the first argument
func GetUserByID(dest *User, id interface{}) error {
	err := DB.Preload("Sessions").Preload("Sessions.Tokens").First(&dest, "id = ?", id).Error
	if err != nil {
		log.Print(cfmt.Swarningf("[WARNING] can't find user %s", id))
		return err
	}

	return nil
}
