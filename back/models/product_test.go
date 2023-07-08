package models_test

import (
	"errors"
	"log"

	"github.com/gofrs/uuid"
	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
	"gorm.io/gorm"

	uut "github.com/mystic-case/back/models"
)

var _ = Describe("Product", func() {
	It("Creates a product record with correct required parameters", func() {
		uut.DB.Transaction(func(tx *gorm.DB) error {
			var testProduct = uut.Product{
				Name:         "Test name #1",
				Slug:         "test-name-1",
				Title:        "This is title",
				Description:  "Some description",
				IsFeatured:   true,
				IsBestseller: false,
				IsNew:        false,
			}

			err := tx.Create(&testProduct).Error
			if err != nil {
				log.Printf("[WARNING] Failed to create product record %s", err.Error())
			}
			Expect(err).NotTo(HaveOccurred())

			return errors.New("Abort transaction")
		})
	})

	It("Creates a product record and price records", func() {
		var product uut.Product

		uut.DB.Transaction(func(tx *gorm.DB) error {
			var (
				testProduct = uut.Product{
					Name:         "Test name #1",
					Slug:         "test-name-1",
					Title:        "This is title",
					Description:  "Some description",
					IsFeatured:   true,
					IsBestseller: false,
					IsNew:        false,
					Prices: []uut.Price{{
						Type:     uut.OneTime,
						Amount:   1,
						Currency: "GBP",
					}},
				}
			)

			err := tx.Create(&testProduct).Error
			if err != nil {
				log.Printf("[WARNING] Failed to create product record %s", err.Error())
			}
			Expect(err).NotTo(HaveOccurred())

			return err
		})

		// Check that price record was actually created
		err := uut.DB.Preload("Prices").First(&product).Error
		if err != nil {
			log.Printf("record doesn't exist %s", err.Error())
			Fail("Product wasn't created")
		}

		Expect(product.Prices[0].ID).NotTo(Equal(uuid.NullUUID{}.UUID))

		// Clean after the test
		uut.DB.Delete(&product)
	})

	Describe("Checking some negative cases", func() {
		It("fails creating product record if price wasn't created", func() {
			var (
				testProduct = uut.Product{
					Name:         "Test name #1",
					Slug:         "test-name-1",
					Title:        "This is title",
					Description:  "Some description",
					IsFeatured:   true,
					IsBestseller: false,
					IsNew:        false,
					Prices: []uut.Price{{
						Type:     uut.OneTime,
						Amount:   0,
						Currency: "GBP",
					}},
				}
				product uut.Product
			)

			err := uut.DB.Create(&testProduct).Error
			if err != nil {
				log.Printf("[WARNING] Failed to create product record %s", err.Error())
			}
			Expect(err).To(HaveOccurred())
			Expect(err).To(Equal(errors.New("price:price must be greater than 0")))

			// Check that Product record was not created
			uut.DB.Where("slug = ?", "test-name-1").Find(&product)
			Expect(product.ID).To(Equal(uuid.NullUUID{}.UUID))
		})

		It("fails when trying to create product without required fields", func() {
			var (
				testProduct = uut.Product{
					IsFeatured: true,
				}
			)

			err := uut.DB.Create(&testProduct).Error
			if err != nil {
				log.Printf("[WARNING] Failed to create product record %s", err.Error())
			}
			Expect(err).To(HaveOccurred())
			Expect(err).To(Equal(errors.New("Name:Name is a required field")))
		})
	})
})
