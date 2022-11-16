package models

import (
	"fmt"
	"log"
	"strings"

	v "github.com/go-playground/validator/v10"
	"github.com/gofrs/uuid"
	"github.com/mingrammer/cfmt"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

// ModelErrors map of errors that is returned as response
type ModelErrors map[string]interface{}

// Product model that represents goods for the sale
// It has basic fields like name and description. Also
// there is a reference to the Reciepe model that describe
// what parts does the product consist of
type Product struct {
	BaseModel

	Name         string     `validate:"required" json:"name"`
	Slug         string     `validate:"required" json:"slug"`
	Description  string     `json:"description" gorm:"type:text"`
	Title        string     `json:"title"`
	Difficulty   *int8      `json:"difficulty"`
	IsFeatured   bool       `json:"isFeatured"`
	IsNew        bool       `json:"isNew"`
	IsBestseller bool       `json:"isBestseller"`
	IsPublished  bool       `json:"isPublished"`
	Prices       Prices     `json:"prices,omitempty"`
	Images       []Image    `json:"images,omitempty" gorm:"many2many:products_images"`
	SKU          NullString `json:"sku"`
	Variations   Variations `json:"variations,omitempty"`
	UserID       uuid.UUID  `json:"-"`
	User         User       `json:"-"`
}

func (p Product) String() string {
	return fmt.Sprintf("<Product: n=%s; t=%s; if=%t, ib=%t, in=%t, ip=%t, p=%s>",
		p.Name, p.Title, p.IsFeatured, p.IsBestseller, p.IsNew, p.IsPublished, p.Prices)
}

// CreateNewProduct is reponsible to create all related objects like Price,
// Variantions, etc. If there are any errors while creating any of the
// dependencies then return all errors to revert the transaction
func CreateProduct(tx *gorm.DB, newProduct *Product) (ModelErrors, error) {
	var (
		err    error
		errors = ModelErrors{}
	)
	// Because all dependent objects need ProductID then first we're trying
	// to create Product object
	err = tx.Omit(clause.Associations).Create(newProduct).Error
	if err != nil {
		log.Print(cfmt.Errorf("[ERROR] failed to create product: %s", err))
		for _, _err := range strings.Split(err.Error(), ";") {
			nameError := strings.Split(_err, ":")
			errors[nameError[0]] = nameError[1]
		}
	}

	// Check if we have some prices passed in the new product object
	if len(newProduct.Prices) > 0 {
		for idx := range newProduct.Prices {
			newProduct.Prices[idx].ProductID = newProduct.ID
			newProduct.Prices[idx].UserID = newProduct.UserID
		}

		err = tx.Omit(clause.Associations).Create(newProduct.Prices).Error
		if err != nil {
			log.Print(cfmt.Errorf("[ERROR] failed to create prices: %s", err.Error()))
		}
	}

	// Check if we have any variations for the product
	if len(newProduct.Variations) > 0 {
		for idx := range newProduct.Variations {
			newProduct.Variations[idx].ProductID = newProduct.ID
		}

		err = tx.Omit(clause.Associations).Create(newProduct.Variations).Error
		if err != nil {
			log.Print(cfmt.Errorf("[ERROR] failed to create variations: %s", err.Error()))
		}
	}
	if err != nil {
		log.Print(cfmt.Errorf("[ERROR] failed to create product: %s", err.Error()))
	}

	return errors, err
}

// GetProductByID to fetch Product from DB by the product ID
// for the specific user
func GetProductByID[T string | uuid.UUID](dest any, productID, userID T) error {
	err := DB.First(&dest, "id = ?", productID).Where("used_id = ?", userID).Error
	if err != nil {
		log.Print(cfmt.Swarningf("[WARNING] can't find product %s", productID))
		return err
	}

	return nil
}

// Validate to check that Product object has required fields set
// correctly. Because all associations are created separately and
// checked separately the whole Product object should not be created
// in the DB if any of the associations failed. That's why we
// have to check them here as well.
func (p Product) Validate() (errors ModelErrors, valid bool) {
	// Check the Product struct
	errors = make(ModelErrors)
	valid = true

	err := validator.Struct(p)
	if err != nil {
		valid = false
		errs := err.(v.ValidationErrors)
		for _, e := range errs {
			log.Print(cfmt.Swarningf("[WARNING] validate: %s", e.Translate(trans)))
			errors[e.Field()] = e.Translate(trans)
		}
		// log.Print(cfmt.Serrorf("[ERROR] %s", tx.Error.Error()))
	}

	if len(p.Prices) > 0 {
		priceErrors, valid := p.Prices.Validate()
		if !valid {
			errors["prices"] = priceErrors
		}
	}

	if len(p.Variations) > 0 {
		variationErrors, valid := p.Variations.Validate()
		if !valid {
			errors["variations"] = variationErrors
		}
	}

	return
}

func (p *Product) BeforeCreate(tx *gorm.DB) (err error) {
	// log.Print(cfmt.Sinfof("[DEBUG] validating product"))
	err = p.BaseModel.BeforeCreate(tx)
	if err != nil {
		log.Print(cfmt.Serrorf("[ERROR] can't create product %s", err.Error()))
		return
	}

	return
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

	SKU       string
	Price     int64
	ProductID uuid.UUID
}

type Variations []Variation

func (variant Variation) Validate() (errors ModelErrors, valid bool) {
	err := validator.Struct(variant)
	valid = true
	if err != nil {
		valid = false
		errs := err.(v.ValidationErrors)
		for _, e := range errs {
			log.Print(cfmt.Swarningf("[WARNING] Variant validate: %s", e.Translate(trans)))
			errors[e.Field()] = e.Translate(trans)
		}
		log.Print(cfmt.Serrorf("[ERROR] %s", err.Error()))
	}
	return
}

func (variations Variations) Validate() (errors []ModelErrors, valid bool) {
	valid = true
	for _, variant := range variations {
		variantErrors, variantValid := variant.Validate()
		if !variantValid {
			valid = false
			errors = append(errors, variantErrors)
		}
	}
	return
}
