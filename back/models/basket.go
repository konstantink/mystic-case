package models

import "github.com/gofrs/uuid"

// Basket object - is a basket. This is a place where customers
// add products they choose. All dicounts are applied to the
// Basket object, even if Products have Discounts - Sub-total
// is calculated including Products discounts and Discounts
// that can be applied to the Basket at checkout - Coupons
type Basket struct {
	BaseModel

	User   User
	UserID uuid.UUID

	PromotionCode   PromotionCode
	PromotionCodeID uuid.UUID
}
