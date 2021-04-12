package models

import "github.com/gofrs/uuid"

// Interval object represents the frequency of the payments to he
// charged from the Customer.
type Interval struct {
	BaseModel

	Recurring string `gorm:"type:varchar(10)"`
}

// Price object to associate with the product. For history purposes
// new Price object is created once the price of the product is
// changed.
type Price struct {
	BaseModel

	Amount     float32
	Currency   string `gorm:"type:varchar(3)"`
	Interval   Interval
	IntervalID uuid.UUID
}
