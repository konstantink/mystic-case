package models_test

import (
	"log"
	"testing"

	"github.com/gofrs/uuid"
	"github.com/mingrammer/cfmt"
	uut "github.com/mystic-case/back/models"
	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
)

func TestModels(t *testing.T) {
	RegisterFailHandler(Fail)
	RunSpecs(t, "Models Suite")
}

func CreateTestUser() (uut.User, error) {
	var (
		result struct {
			Exists bool
		}
		testUser = uut.User{
			// Username:  "test_username",
			Username:  "test@email.com",
			FirstName: "test_firstName",
			LastName:  "test_lastName",
			Email:     "test@email.com",
			Password:  "test_password",
			IsAdmin:   false,
		}
	)

	uut.DB.Raw("SELECT EXISTS (?) AS exists", uut.DB.Model(&testUser).Select("id").Where("username = ?", testUser.Email)).Scan(&result)
	if result.Exists {
		err := uut.DB.First(&testUser, "username = ?", testUser.Email).Error
		if err != nil {
			log.Print(cfmt.Swarningf("===> %s", err.Error()))
		}
	} else {
		err := uut.DB.Create(&testUser).Error
		if err != nil {
			log.Fatalf("Can't create test user required for the test %s", err.Error())
			return uut.User{}, err
		}
	}

	return testUser, nil
}

func CreateTestProduct(userID uuid.UUID) (uut.Product, error) {
	var (
		result struct {
			Exists bool
		}
		testProduct = uut.Product{
			Name:         "test_product",
			Slug:         "test-product",
			Description:  "test_description",
			Title:        "test_title",
			Difficulty:   nil,
			IsFeatured:   false,
			IsNew:        false,
			IsBestseller: false,
			IsPublished:  false,
			UserID:       userID,
		}
	)

	uut.DB.Raw("SELECT EXISTS (?) AS exists", uut.DB.Model(&testProduct).Select("id").Where("name = ?", testProduct.Name)).Scan(&result)
	if result.Exists {
		err := uut.DB.First(&testProduct, "name = ?", testProduct.Name).Error
		if err != nil {
			log.Print(cfmt.Swarningf("===> %s", err.Error()))
		}
	} else {
		err := uut.DB.Create(&testProduct).Error
		if err != nil {
			log.Fatalf("Can't create test user required for the test %s", err.Error())
			return uut.Product{}, err
		}
	}

	return testProduct, nil
}
