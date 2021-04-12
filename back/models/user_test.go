package models_test

import (
	"errors"
	"fmt"

	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
	"gorm.io/gorm"

	uut "github.com/mystic-case/back/models"
)

var _ = Describe("User", func() {
	It("creates a user object with correct arguments", func() {
		uut.DB.Transaction(func(tx *gorm.DB) error {
			var (
				row struct {
					Exists bool
				}
			)

			err := tx.Create(&uut.User{
				Username:  "Username",
				FirstName: "FirstName",
				LastName:  "LastName",
				Email:     "user@email.com",
				Password:  "Password",
			}).Error

			if err != nil {
				Fail(err.Error())
			}

			// tx.Where("username = 'Username'").Find(&result)
			tx.Raw("SELECT EXISTS (?) as exists", tx.Table("users").Select("id").Where("username = 'Username'")).Scan(&row)

			Expect(row.Exists).To(BeTrue())

			return errors.New("Abort transaction")
			// return nil
		})
	})

	It("throws an error when invalid email is provided", func() {
		uut.DB.Transaction(func(tx *gorm.DB) error {
			var (
				testUser = uut.User{
					Email: "incorrect_email.com",
				}
				expectedError = "Provide correct email address"
			)

			err := uut.DB.Create(&testUser).Error
			if err != nil {
				Expect(err.Error()).To(BeIdenticalTo(expectedError))
			} else {
				Fail(fmt.Sprintf("Expected error %s", expectedError))
			}

			return errors.New("Abort transaction")
		})
	})

	Context("assuming email already exists in DB", func() {
		var OriginalUser uut.User

		BeforeEach(func() {
			uut.DB.FirstOrCreate(&OriginalUser, uut.User{
				Username:  "test_duplicate",
				FirstName: "FirstName",
				LastName:  "LastName",
				Email:     "user_duplicate@email.com",
				Password:  "Password",
			})
		})

		It("throws an error when trying to register it once again", func() {
			var (
				duplicateUser = uut.User{
					Username:  "test_duplicate",
					FirstName: "FirstName",
					LastName:  "LastName",
					Email:     "user_duplicate@email.com",
					Password:  "Password",
				}
				expectedError = "Email \"user_duplicate@email.com\" is already registered"
			)

			err := uut.DB.Create(&duplicateUser).Error

			Expect(err.Error()).To(BeIdenticalTo(expectedError))
		})

		AfterEach(func() {
			uut.DB.Unscoped().Delete(&OriginalUser)
		})
	})
})
