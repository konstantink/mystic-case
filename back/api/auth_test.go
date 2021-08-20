package api_test

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http/httptest"
	"strings"

	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"

	"github.com/mystic-case/back/models"
)

var _ = Describe("Checking that authentication works", func() {
	var (
		w *httptest.ResponseRecorder
		// server *ghttp.Server
	)

	AfterEach(func() {
		models.DB.Where("username = ?", "test_username").Delete(&models.User{})
	})

	Context("New user registration", func() {
		It("Registers a new user once all params are correct", func() {
			testUser := map[string]interface{}{
				"userName":  "test_username",
				"firstName": "test_firstName",
				"lastName":  "test_lastName",
				"email":     "test@email.com",
				"password":  "test_password",
				"isAdmin":   true,
			}
			w = httptest.NewRecorder()
			payload, _ := json.Marshal(testUser)

			request := httptest.NewRequest("POST", "/u/signup", strings.NewReader(string(payload)))
			request.Header.Add("Content-Type", "application/json")

			Router.ServeHTTP(w, request)

			Expect(w.Code).To(Equal(201))
		})

		It("Returns an error if provided email is incorrect", func() {
			var response map[string]interface{}
			testUser := map[string]interface{}{
				"userName":  "test_username",
				"firstName": "test_firstName",
				"lastName":  "test_lastName",
				"email":     "test_email.com",
				"password":  "test_password",
				"isAdmin":   true,
			}
			w = httptest.NewRecorder()
			payload, _ := json.Marshal(testUser)

			request := httptest.NewRequest("POST", "/u/signup", strings.NewReader(string(payload)))
			request.Header.Add("Content-Type", "application/json")

			Router.ServeHTTP(w, request)

			Expect(w.Code).To(Equal(400))
			_ = json.Unmarshal(w.Body.Bytes(), &response)
			Expect(response).To(Equal(map[string]interface{}{"status": "fail", "errors": map[string]interface{}{"email": "Provide correct email address"}}))
		})

		Context("Assuming that email is already registered in the system", func() {
			_ = BeforeEach(func() {
				testUser := models.User{
					Username:  "test_username",
					FirstName: "test_firstName",
					LastName:  "test_lastName",
					Email:     "test@email.com",
					Password:  "test_password",
					IsAdmin:   false,
				}

				err := models.DB.Create(&testUser).Error
				if err != nil {
					log.Fatalf("Can't create test user required for the test %s", err.Error())
				}
			})

			It("Returns an error that provided email is already used", func() {
				var response map[string]interface{}
				testUser := map[string]interface{}{
					"userName":  "test_username",
					"firstName": "test_firstName",
					"lastName":  "test_lastName",
					"email":     "test@email.com",
					"password":  "test_password",
					"isAdmin":   true,
				}
				w = httptest.NewRecorder()
				payload, _ := json.Marshal(testUser)

				request := httptest.NewRequest("POST", "/u/signup", strings.NewReader(string(payload)))
				request.Header.Add("Content-Type", "application/json")

				Router.ServeHTTP(w, request)

				Expect(w.Code).To(Equal(400))
				_ = json.Unmarshal(w.Body.Bytes(), &response)
				Expect(response).To(Equal(map[string]interface{}{
					"status": "fail",
					"errors": map[string]interface{}{
						"__all__": fmt.Sprintf("Email %q is already registered", "test@email.com"),
					},
				}))
			})
		})
	})
})
