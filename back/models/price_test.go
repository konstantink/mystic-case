package models_test

import (
	"errors"
	"log"

	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
	"gorm.io/gorm"

	uut "github.com/mystic-case/back/models"
)

var _ = FDescribe("Price", func() {
	var (
		testUser    uut.User
		testProduct uut.Product
	)

	_ = BeforeEach(func() {
		testUser, _ = CreateTestUser()
		testProduct, _ = CreateTestProduct(testUser.ID)
	})

	_ = AfterEach(func() {
		uut.DB.Delete(&testUser)
	})

	It("Throws and error when price type is recurring, but no interval provided", func() {
		price := uut.Price{
			Type:          uut.Recurring,
			Amount:        100,
			AmountDecimal: "100",
			Currency:      "GBP",
			Active:        true,
			Default:       true,
			// User:          testUser,
			UserID: testUser.ID,
		}

		errors, valid := uut.Validate(price)
		if !valid {
			for idx := range errors {
				log.Print(errors[idx])
			}
			Expect(len(errors)).To(Equal(1))
			Expect(errors["Type"]).To(Equal("Billing period should be provided for Recurring prices"))
		}
	})

	It("Creates a Price object in database", func() {
		uut.DB.Transaction(func(tx *gorm.DB) error {
			price := uut.Price{
				Type:          uut.OneTime,
				Amount:        100,
				AmountDecimal: "100",
				Currency:      "GBP",
				Active:        true,
				Default:       true,
				UserID:        testUser.ID,
				ProductID:     testProduct.ID,
			}
			err := uut.CreatePrice(tx, &price)
			Expect(price.ID).NotTo(BeZero())
			Expect(err).To(BeNil())
			return errors.New("Abort transaction")
		})
	})

	It("For Recurring type it creates interval objects too", func() {
		var (
			checkInterval uut.Interval
			testInterval  = uut.Interval{
				Recurring: uut.Monthly,
				Count:     2,
			}
			price = uut.Price{
				Type:          uut.Recurring,
				Amount:        100,
				AmountDecimal: "100",
				Currency:      "GBP",
				Active:        true,
				Default:       true,
				Interval:      &testInterval,
				UserID:        testUser.ID,
				ProductID:     testProduct.ID,
			}
		)

		uut.DB.Transaction(func(tx *gorm.DB) error {
			err := uut.CreatePrice(tx, &price)
			Expect(price.ID).NotTo(BeZero())

			tx.Model(uut.Interval{}).First(&checkInterval, "price_id = ?", price.ID)

			Expect(checkInterval.ID).NotTo(BeZero())
			Expect(err).To(BeNil())

			return errors.New("Abort transaction")
		})

	})
})
