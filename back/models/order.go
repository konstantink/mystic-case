package models

import "github.com/gofrs/uuid"

// OrderItem is what is included into the order. This could be the certain
// version of Product, Discount, Delivery, VAT, etc.
// The field Type should be one of the following
// values: sku, discount, tax, shiping
// type OrderItem struct {
// 	BaseModel

// 	Type     string
// 	ItemID   uuid.UUID
// 	Currency string
// 	Amount   int64
// 	Quantity int32
// }

// Order is basically a snapshot of the customer's basket that
// we need to charge him for.
type Order struct {
	BaseModel

	User   User
	UserID uuid.UUID

	Items []Product
}
