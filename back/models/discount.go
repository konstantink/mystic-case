package models

// PromotionCode is a wrapper above the Discount that can
// be shared with customers. Promotion code should be applied
// during checkout. Different types of PromotionCode could be
// - the one that can be applied with other Discounts or
// the one that should be used alone
type PromotionCode struct {
}
