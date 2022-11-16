package models

import (
	"fmt"
	"log"

	v "github.com/go-playground/validator/v10"
	"github.com/gofrs/uuid"
	"github.com/mingrammer/cfmt"
	"gorm.io/gorm"
)

// PriceType enum for different type of price: One time or Recurring
type PriceType int

const (
	OneTime PriceType = iota
	Recurring
)

// Interval object represents the frequency of the payments to he
// charged from the Customer.
type Interval struct {
	BaseModel

	Recurring string `gorm:"type:varchar(10)"`
	// Count - is the frequncy of payments, e.g. Recurring=month and
	// Count=3 means that payment should happen every 3 months
	Count   int8
	PriceID uuid.UUID
}

// Price object to associate with the product. For history purposes
// new Price object is created once the price of the product is
// changed.
type Price struct {
	BaseModel

	Type          PriceType `json:"type" validate:"required"`
	Amount        int       `json:"price" validate:"gt=0"`
	AmountDecimal string    `json:"-" gorm:"->;type:GENERATED ALWAYS AS (CAST( amount as VARCHAR ));default:(-);"`
	Currency      string    `json:"currency" gorm:"type:varchar(3)"`
	Active        bool      `json:"active" gorm:"default:true"`
	Interval      Interval  `json:"-" gorm:"constraint:OnDelete:SET NULL;"`
	ProductID     uuid.UUID `json:"-" gorm:"constraint:OnDelete:DELETE;"`
	UserID        uuid.UUID `json:"-"`
	User          User      `json:"-"`
	// IntervalID uuid.UUID
}

type Prices []Price

func (p Price) String() string {
	return fmt.Sprintf("<Price: a=%d, c=%s, p=%s>", p.Amount, p.Currency, p.ProductID.String())
}

func (p *Price) BeforeCreate(tx *gorm.DB) (err error) {
	err = p.BaseModel.BeforeCreate(tx)
	if err != nil {
		log.Print(cfmt.Serrorf("[ERROR] failed to create price record %s", err.Error()))
		return
	}

	// err = p.Validate(tx).Error
	// if err != nil {
	// 	log.Print(cfmt.Serrorf("[ERROR] failed to create price record %s", err.Error()))
	// 	return
	// }

	return
}

func (p Price) Validate() (errors ModelErrors, valid bool) {
	err := validator.Struct(p)
	valid = true
	if err != nil {
		errors = make(ModelErrors)
		valid = false
		errs := err.(v.ValidationErrors)
		for _, e := range errs {
			log.Print(cfmt.Swarningf("[WARNING] Price validate: %s", e.Translate(trans)))
			errors[e.Field()] = e.Translate(trans)
		}
		log.Print(cfmt.Serrorf("[ERROR] %s", err.Error()))
	}
	return
}

func (prices Prices) Validate() (errors []ModelErrors, valid bool) {
	valid = true
	for _, price := range prices {
		priceErrors, priceValid := price.Validate()
		if !priceValid {
			valid = false
			errors = append(errors, priceErrors)
		}
	}
	return
}

// CreatePrice function to create price object and corresponding Interval
// objects if recurring price is created
func CreatePrice(tx *gorm.DB, amount int, currency string, priceType PriceType) (*Price, error) {
	var price = Price{
		Amount:   amount,
		Currency: currency,
		Type:     priceType,
	}

	if priceType == Recurring {
		// TODO: Here we'll be creating Interval object and assign it to Price
	}

	err := tx.Create(&price).Error
	if err != nil {
		log.Print(cfmt.Serrorf("[ERROR] can't create Price object %s", err.Error()))
		return nil, err
	}

	return &price, nil
}
