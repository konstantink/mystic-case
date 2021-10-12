package api_test

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/http/httptest"
	"strings"

	"github.com/adam-hanna/sessions/auth"
	"github.com/gin-gonic/gin"
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
		models.DB.Where("username = ?", "new_test@email.com").Delete(&models.User{})
		models.DB.Where("username = ?", "test@email.com").Delete(&models.User{})
		models.DB.Where("username = ?", "test_username").Delete(&models.User{})
	})

	Context("New user registration", func() {
		It("Registers a new user once all params are correct", func() {
			testUser := map[string]interface{}{
				//Something to do for later"username":   "test_username",
				"username":   "new_test@email.com",
				"first_name": "test_firstName",
				"last_name":  "test_lastName",
				"email":      "new_test@email.com",
				"password":   "test_password",
				"isAdmin":    true,
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
			Expect(response).To(Equal(map[string]interface{}{"success": false, "errors": map[string]interface{}{"email": "Provide correct email address"}}))
		})

		Context("Assuming that email is already registered in the system", func() {
			_ = BeforeEach(func() {
				testUser := models.User{
					// Username:  "test_username",
					Username:  "test@email.com",
					FirstName: "test_firstName",
					LastName:  "test_lastName",
					Email:     "test@email.com",
					Password:  "test_password",
					IsAdmin:   false,
				}

				err := models.DB.Create(&testUser).Error
				if err != nil && err.Error() != "__all__:Email \"test@email.com\" is already registered" {
					log.Fatalf("Can't create test user required for the test %s", err.Error())
				}
			})

			It("Returns an error that provided email is already used", func() {
				var response map[string]interface{}
				testUser := map[string]interface{}{
					// "userName":  "test_username",
					"username":  "test@email.com",
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
					"success": false,
					"errors": map[string]interface{}{
						"__all__": fmt.Sprintf("Email %q is already registered", "test@email.com"),
					},
				}))
			})
		})
	})

	Context("Logging in user to the system", func() {
		_ = BeforeEach(func() {
			testUser := models.User{
				// Username:  "test_username",
				Username:  "test@email.com",
				FirstName: "test_firstName",
				LastName:  "test_lastName",
				Email:     "test@email.com",
				Password:  "test_password",
				IsAdmin:   false,
			}

			err := models.DB.Create(&testUser).Error
			if err != nil && err.Error() != "__all__:Email \"test@email.com\" is already registered" {
				log.Fatalf("Can't create test user required for the test %s", err.Error())
			}
		})

		It("Logs in the user if username and password are correct", func() {
			var (
				storedSession models.Session
				testUser      models.User
			)

			testInputData := map[string]string{
				"username": "test@email.com",
				"password": "test_password",
			}
			authService, _ := auth.New(
				auth.Options{
					Key: []byte("secret_session"),
				},
			)

			w = httptest.NewRecorder()
			payload, _ := json.Marshal(testInputData)

			request := httptest.NewRequest("POST", "/u/signin", strings.NewReader(string(payload)))
			request.Header.Add("Content-Type", "application/json")

			Router.ServeHTTP(w, request)

			Expect(w.Code).To(Equal(http.StatusOK))
			// Check that correct session ID has been passed to the cookies
			err := models.DB.First(&testUser, "username = ?", "test@email.com").Error
			if err != nil {
				log.Fatal(err)
			}
			err = models.DB.First(&storedSession, "user_id = ?", testUser.ID).Error
			if err != nil {
				log.Fatal(err)
			}
			cookies := w.Result().Cookies()
			Expect(len(cookies)).To(Equal(1))
			cookieSessionID, _ := authService.VerifyAndDecode(cookies[0].Value)
			Expect(cookieSessionID).To(Equal(storedSession.ID.String()))
		})

		It("Returns 401 error in case username/password is incorrect", func() {
			var (
				response gin.H
			)
			testInputData := map[string]string{
				"username": "test@email.com",
				"password": "testpassword",
			}

			w = httptest.NewRecorder()
			payload, _ := json.Marshal(testInputData)

			request := httptest.NewRequest("POST", "/u/signin", strings.NewReader(string(payload)))
			request.Header.Add("Content-Type", "application/json")

			Router.ServeHTTP(w, request)

			Expect(w.Code).To(Equal(http.StatusUnauthorized))

			_ = json.Unmarshal(w.Body.Bytes(), &response)
			Expect(response).To(Equal(
				gin.H{
					"success": false,
					"error":   "Username and password don't match",
				},
			))
		})

		When("When user is already logged in", func() {
			var cookies []*http.Cookie

			_ = BeforeEach(func() {
				testInputData := map[string]string{
					"username": "test@email.com",
					"password": "test_password",
				}

				w = httptest.NewRecorder()
				payload, _ := json.Marshal(testInputData)

				request := httptest.NewRequest("POST", "/u/signin", strings.NewReader(string(payload)))
				request.Header.Add("Content-Type", "application/json")

				Router.ServeHTTP(w, request)
				cookies = w.Result().Cookies()
			})

			It("If user logs in and cookie is available, then previous one should be invalidated", func() {
				testInputData := map[string]string{
					"username": "test@email.com",
					"password": "test_password",
				}
				authService, _ := auth.New(
					auth.Options{
						Key: []byte("secret_session"),
					},
				)

				w = httptest.NewRecorder()
				payload, _ := json.Marshal(testInputData)

				request := httptest.NewRequest("POST", "/u/signin", strings.NewReader(string(payload)))
				request.Header.Add("Content-Type", "application/json")
				request.AddCookie(cookies[0])

				Router.ServeHTTP(w, request)

				Expect(w.Code).To(Equal(http.StatusOK))

				// Check that new cookie is different from previous
				// log.Printf("1st: %s", cookies[0].Value)
				// log.Printf("2nd: %s", w.Result().Cookies()[0].Value)
				Expect(w.Result().Cookies()[0].Value).NotTo(Equal(cookies[0].Value))

				// Check that previous session is set to active = false in DB
				var session models.Session
				sessionID, _ := authService.VerifyAndDecode(cookies[0].Value)
				models.DB.Find(&session, "id = ?", sessionID)
				Expect(session.Active).To(BeFalse())

				// Check that new session is set to active = true in DB
				var newSession models.Session
				newSessionID, _ := authService.VerifyAndDecode(w.Result().Cookies()[0].Value)
				models.DB.Find(&newSession, "id = ?", newSessionID)
				Expect(newSession.Active).To(BeTrue())
			})
		})
	})
})
