package models

import (
	"fmt"
	"log"

	ut "github.com/go-playground/universal-translator"
	v "github.com/go-playground/validator/v10"
	"github.com/gofrs/uuid"
	"github.com/mingrammer/cfmt"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

func init() {
	validator.RegisterStructValidation(PriceTypeIntervalValidation, Price{})
	validator.RegisterTranslation("typeandinterval", trans, func(ut ut.Translator) error {
		return ut.Add("typeandinterval", "Billing period should be provided for Recurring prices", true)
	}, func(ut ut.Translator, fe v.FieldError) string {
		t, _ := ut.T("typeandinterval", fe.Field())

		return t
	})
}

// PriceType enum for different type of price: One time or Recurring
type PriceType int

// IntervalType enum for different payment periods
type IntervalType string

const (
	OneTime PriceType = iota
	Recurring
)

const (
	Daily   IntervalType = "day"
	Weekly               = "week"
	Monthly              = "month"
	Yearly               = "year"
	Custom               = "custom"
)

// Interval object represents the frequency of the payments to he
// charged from the Customer.
type Interval struct {
	BaseModel

	DisplayRecurring IntervalType `json:"displayInterval" gorm:"type:varchar(10);column:display_recurring"`
	Recurring        IntervalType `json:"interval" gorm:"type:varchar(10)"`
	// Count - is the frequncy of payments, e.g. Recurring=month and
	// Count=3 means that payment should happen every 3 months
	Count   int8      `json:"intervalCount"`
	PriceID uuid.UUID `json:"-" validate:"-"`
}

func (i Interval) String() string {
	return fmt.Sprintf("<Interval: id=%s, r=%s, c=%d, p=%s>", i.ID.String(), i.Recurring, i.Count, i.PriceID.String())
}

func (i *Interval) BeforeCreate(tx *gorm.DB) (err error) {
	err = i.BaseModel.BeforeCreate(tx)
	if err != nil {
		log.Print(cfmt.Serrorf("[ERROR] failed to create price record %s", err.Error()))
		return
	}

	return
}

// Price object to associate with the product. For history purposes
// new Price object is created once the price of the product is
// changed.
type Price struct {
	BaseModel

	Type          PriceType `json:"type" validate:"required"`
	Amount        int       `json:"price" validate:"gt=0"`
	AmountDecimal string    `json:"-" gorm:"->;type:VARCHAR GENERATED ALWAYS AS ( amount::VARCHAR ) STORED;default:(-);"`
	Currency      string    `json:"currency" gorm:"type:varchar(3)"`
	Active        bool      `json:"active" gorm:"default:true"`
	Default       bool      `json:"default" gorm:"default:false;column:is_default"`
	Interval      *Interval `json:"interval" gorm:"constraint:OnDelete:CASCADE;"`
	Product       Product   `json:"-" validate:"-"`
	ProductID     uuid.UUID `json:"-"`
	User          User      `json:"-" validate:"-"`
	UserID        uuid.UUID `json:"-"`
	// IntervalID uuid.UUID
}

type Prices []Price

func (p Price) String() string {
	return fmt.Sprintf("<Price: id=%s, a=%d, c=%s, p=%s, i=%s>", p.ID.String(), p.Amount, p.Currency,
		p.ProductID.String(), p.Interval.ID.String())
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

// PriceTypeIntervalValidation custom validation function to
// check that for Recurring type Interval is provided
func PriceTypeIntervalValidation(sl v.StructLevel) {
	price := sl.Current().Interface().(Price)

	if price.Type == Recurring && price.Interval == nil {
		sl.ReportError(price.Type, "Type", "Type", "typeandinterval", "")
	}
}

// CreateInterval creates Interval object for corresponding
// Price object
func CreateInterval(tx *gorm.DB, priceID uuid.UUID, interval *Interval) error {
	interval.PriceID = priceID
	return tx.Create(interval).Error
}

// CreatePrice creates price object and corresponding Interval
// objects if recurring price is created
func CreatePrice(tx *gorm.DB, price *Price) error {
	err := tx.Omit(clause.Associations).Create(price).Error
	if err != nil {
		log.Print(cfmt.Serrorf("[ERROR] can't create Price object %s", err.Error()))
		return err
	}

	if price.Type == Recurring {
		err = CreateInterval(tx, price.ID, price.Interval)
		if err != nil {
			log.Print(cfmt.Serrorf("[ERROR] can't create Interval object %s", err.Error()))
			return err
		}
	}

	return nil
}

// UpdatePrice to update existing price object in the database
func UpdatePrice(changes Price) error {
	return nil
}

// GetPriceByID to retrieve price object from database by ID
func GetPriceByID[T string | uuid.UUID](dest *Price, priceID T) error {
	return DB.Model(dest).First(dest, "id = ?", priceID).Error
	// if err != nil {
	// 	log.Print(cfmt.Swarningf("[WARNING] can't find product %s", productID))
	// 	return err
	// }
	// return nil
}
