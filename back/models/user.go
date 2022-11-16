package models

import (
	"fmt"
	"log"

	v "github.com/go-playground/validator/v10"
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
	Tokens    []Token
	// Sessions  []Session
	// Products  Products `json:"-"`
}

func (u User) String() string {
	return fmt.Sprintf("<User: id:%s username:%s>", u.ID, u.Username)
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
	err := validator.Struct(u)
	if err != nil {
		errs := err.(v.ValidationErrors)
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

func (u User) InvalidateTokenTree(refreshTokenID interface{}) error {
	// 	for sessionIndex := range u.Sessions {
	// 		for tokenIndex := range u.Sessions[sessionIndex].Tokens {
	// 			u.Sessions[sessionIndex].Tokens[tokenIndex].Active = false
	// 		}
	// 		u.Sessions[sessionIndex].Active = false
	// 	}

	// for tokenIdx := range u.Tokens {
	// 	u.Tokens[tokenIdx].Active = false
	// }

	// 	// err := DB.Session(&gorm.Session{FullSaveAssociations: true}).Updates(&u).Error
	var (
		tokens        []Token
		nextRefreshID uuid.UUID
	)

	log.Print(cfmt.Sinfof("[INFO] Invalidating tokens tree for user %s", u.ID.String()))

	err := DB.Where("user_id = ?", u.ID).Where("refreshed_from_id = ?", refreshTokenID).Find(&tokens).Error
	if err != nil {
		log.Print(cfmt.Swarningf("[WARNING] problems with getting tokens refreshed from %s", refreshTokenID.(string)))
		return err
	}

	// No tokens found then we break this loop
	if len(tokens) == 0 {
		log.Print(cfmt.Sinfof("[INFO] no tokens to invalidate"))
		return nil
	}

	// If we get here that means that we have some tokens that were
	// created from the given one and we have to invalidate them
	DB.Transaction(func(tx *gorm.DB) (err error) {
		err = nil
		for idx := range tokens {
			if tokens[idx].Active {
				err = tokens[idx].Invalidate()
				// err = DB.Model(&tokens[idx]).Update("active", false).Error
			}
			if tokens[idx].Type == RefreshToken {
				nextRefreshID = tokens[idx].ID
			}
		}

		return
	})

	return u.InvalidateTokenTree(nextRefreshID)
	// err := DB.Session(&gorm.Session{FullSaveAssociations: true}).Model(&u).Updates(
	// 	User{
	// 		Tokens: []Token{
	// 			{
	// 				Active: false,
	// 			},
	// 		},
	// 	}).Error
	// if err != nil {
	// 	log.Print(cfmt.Swarningf("[WARNING] can't invalidate everything %s", err.Error()))
	// 	return err
	// }

	// return nil
}

// GetUserByID looks up in the database record with
// corresponding id and if exists stores the result
// to the first argument
func GetUserByID[T string | uuid.UUID](dest *User, id T) error {
	// err := DB.Preload("Tokens", "active = ?", true).First(&dest, "id = ?", id).Error
	err := DB.First(&dest, "id = ?", id).Error
	if err != nil {
		log.Print(cfmt.Swarningf("[WARNING] can't find user %s", id))
		return err
	}

	return nil
}
