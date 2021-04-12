package models

import (
	"database/sql"

	"github.com/gofrs/uuid"
)

// Product model that represents goods for the sale
// It has basic fields like name and description. Also
// there is a reference to the Reciepe model that describe
// what parts does the product consist of
type Product struct {
	BaseModel

	Name        string
	Description string `gorm:"type:text"`
	Price       Price
	PriceID     uuid.UUID
	SKU         sql.NullString
	Variations  []Variation
}

// Choice represents various characteristics that product
// has and between what customer can choose
type Choice struct {
	BaseModel

	Name        string
	DisplayName string
}

// ChoiceValue is the possible values for the choice
// of the product
type ChoiceValue struct {
	BaseModel

	Choice   Choice
	ChoiceID uuid.UUID
	Value    string
}

// Variation is the combination of all choices and values
// to assign SKU for all possible options
type Variation struct {
	BaseModel

	SKU   string
	Price int64
}
