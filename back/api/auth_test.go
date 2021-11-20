package api_test

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/http/httptest"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/mingrammer/cfmt"
	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"

	"github.com/mystic-case/back/models"
)

func CreateTestUser() (models.User, error) {
	var (
		result struct {
			Exists bool
		}
		testUser = models.User{
			// Username:  "test_username",
			Username:  "test@email.com",
			FirstName: "test_firstName",
			LastName:  "test_lastName",
			Email:     "test@email.com",
			Password:  "test_password",
			IsAdmin:   false,
		}
	)

	models.DB.Raw("SELECT EXISTS (?) AS exists", models.DB.Model(&testUser).Select("id").Where("username = ?", testUser.Email)).Scan(&result)
	if result.Exists {
		err := models.DB.First(&testUser).Error
		if err != nil {
			log.Print(cfmt.Swarningf("===> %s", err.Error()))
		}
	} else {
		err := models.DB.Create(&testUser).Error
		if err != nil {
			log.Fatalf("Can't create test user required for the test %s", err.Error())
			return models.User{}, err
		}
	}

	return testUser, nil
}

var _ = Describe("checking auth api", func() {
	var (
		w *httptest.ResponseRecorder
		// server *ghttp.Server
	)

	AfterEach(func() {
		models.DB.Where("username = ?", "new_test@email.com").Delete(&models.User{})
		models.DB.Where("username = ?", "test@email.com").Delete(&models.User{})
		models.DB.Where("username = ?", "test_username").Delete(&models.User{})
	})

	Describe("checking authentication ", func() {
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
					CreateTestUser()
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
				CreateTestUser()
			})

			It("Logs in the user if username and password are correct", func() {
				var (
					testUser     models.User
					accessToken  models.Token
					refreshToken models.Token
					tokensPair   struct {
						AccessToken  string `json:"access_token"`
						RefreshToken string `json:"refresh_token"`
					}
				)

				testInputData := map[string]string{
					"username": "test@email.com",
					"password": "test_password",
				}

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

				_ = json.Unmarshal(w.Body.Bytes(), &tokensPair)

				// Compare the returned tokens equal to the ones that were issued
				models.GetTokenByUserID(&accessToken, testUser.ID, models.AccessTokens)
				models.GetTokenByUserID(&refreshToken, testUser.ID, models.RefreshTokens)

				Expect(accessToken.Value).To(Equal(tokensPair.AccessToken))
				Expect(refreshToken.Value).To(Equal(tokensPair.RefreshToken))
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
				// var cookies []*http.Cookie
				var (
					firstPair, secondPair struct {
						AccessToken  string `json:"access_token"`
						RefreshToken string `json:"refresh_token"`
					}
				)

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
					_ = json.Unmarshal(w.Body.Bytes(), &firstPair)
					// cookies = w.Result().Cookies()
				})

				It("Every time user loggs in we create a new pair of tokens", func() {
					testInputData := map[string]string{
						"username": "test@email.com",
						"password": "test_password",
					}

					w = httptest.NewRecorder()
					payload, _ := json.Marshal(testInputData)

					request := httptest.NewRequest("POST", "/u/signin", strings.NewReader(string(payload)))
					request.Header.Add("Content-Type", "application/json")

					Router.ServeHTTP(w, request)

					Expect(w.Code).To(Equal(http.StatusOK))

					_ = json.Unmarshal(w.Body.Bytes(), &secondPair)

					Expect(secondPair.AccessToken).NotTo(Equal(firstPair.AccessToken))
					Expect(secondPair.RefreshToken).NotTo(Equal(firstPair.RefreshToken))
				})
			})
		})
	})

	Describe("checking tokens", func() {
		var testUser models.User

		BeforeEach(func() {
			var err error
			testUser, err = CreateTestUser()

			if err != nil {
				log.Print(cfmt.Swarningf("===> %s", err.Error()))
			}
			// log.Printf("%v", testUser)
		})

		It("tokens are returned in case of successful sign in", func() {
			var (
				storedAccessToken  models.Token
				storedRefreshToken models.Token

				testInputData = map[string]string{
					"username": "test@email.com",
					"password": "test_password",
				}
			)

			w = httptest.NewRecorder()
			payload, _ := json.Marshal(testInputData)

			request := httptest.NewRequest("POST", "/u/signin", strings.NewReader(string(payload)))
			request.Header.Add("Content-Type", "application/json")

			Router.ServeHTTP(w, request)

			Expect(w.Code).To(Equal(http.StatusOK))

			var result gin.H
			err := json.Unmarshal(w.Body.Bytes(), &result)

			Expect(result["success"]).To(BeTrue())

			// Check that access and refresh token were issued and get them
			err = models.GetTokenByUserID(&storedAccessToken, testUser.ID, models.AccessTokens)
			if err != nil {
				Fail(err.Error())
			}
			Expect(result["access_token"]).To(Equal(storedAccessToken.Value))
			Expect(storedAccessToken.Active).To(BeTrue())

			err = models.GetTokenByUserID(&storedRefreshToken, testUser.ID, models.RefreshTokens)
			if err != nil {
				Fail(err.Error())
			}
			Expect(result["refresh_token"]).To(Equal(storedRefreshToken.Value))
			Expect(storedRefreshToken.Active).To(BeTrue())
		})

		When("refresh_token request is sent", func() {
			var (
				// sessionCookie      http.Cookie
				storedAccessToken  models.Token
				storedRefreshToken models.Token
			)

			BeforeEach(func() {
				var result gin.H

				testUser, _ := CreateTestUser()

				w = httptest.NewRecorder()
				// Log in to create a pair of tokens
				loginPayload, _ := json.Marshal(map[string]string{
					"username": "test@email.com",
					"password": "test_password",
				})

				loginRequest := httptest.NewRequest("POST", "/u/signin", strings.NewReader(string(loginPayload)))
				loginRequest.Header.Add("Content-Type", "application/json")

				Router.ServeHTTP(w, loginRequest)

				// sessionCookie = *w.Result().Cookies()[0]
				_ = json.Unmarshal(w.Body.Bytes(), &result)

				models.GetTokenByUserID(&storedAccessToken, testUser.ID, models.AccessTokens)
				models.GetTokenByUserID(&storedRefreshToken, testUser.ID, models.RefreshTokens)

				// models.DB.Model(&models.Token{}).Where("value = ?", result["access_token"]).Scan(&storedAccessToken)
				// models.DB.Model(&models.Token{}).Where("value = ?", result["refresh_token"]).Scan(&storedRefreshToken)
			})

			It("creates a new pair of access and refresh tokens and invalidates previous", func() {
				var (
					result        gin.H
					testInputData = map[string]string{
						"refresh_token": storedRefreshToken.Value,
					}
				)

				Expect(storedAccessToken.Active).To(BeTrue())
				Expect(storedRefreshToken.Active).To(BeTrue())

				w := httptest.NewRecorder()
				payload, _ := json.Marshal(testInputData)

				request := httptest.NewRequest("POST", "/u/token/refresh", strings.NewReader(string(payload)))
				request.Header.Add("Content-Type", "application/json")
				// request.AddCookie(&sessionCookie)

				Router.ServeHTTP(w, request)
				_ = json.Unmarshal(w.Body.Bytes(), &result)

				Expect(w.Code).To(Equal(http.StatusOK))
				Expect(result["success"].(bool)).To(BeTrue())

				models.DB.First(&storedAccessToken, "id = ?", storedAccessToken.ID)
				models.DB.First(&storedRefreshToken, "id = ?", storedRefreshToken.ID)

				Expect(storedAccessToken.Active).To(BeFalse())
				Expect(storedRefreshToken.Active).To(BeFalse())

				models.DB.Scopes(models.AccessTokens).Model(&models.Token{}).Where("value = ?", result["access_token"]).Scan(&storedAccessToken)
				models.DB.Scopes(models.RefreshTokens).Model(&models.Token{}).Where("value = ?", result["refresh_token"]).Scan(&storedRefreshToken)

				Expect(storedAccessToken.Active).To(BeTrue())
				Expect(storedRefreshToken.Active).To(BeTrue())
			})

			It("returns 401 and invalidates currently active tokens if invalidated token is sent", func() {
				var (
					testInputData = map[string]string{
						"refresh_token": storedRefreshToken.Value,
					}
				)

				w := httptest.NewRecorder()
				payload, _ := json.Marshal(testInputData)

				request := httptest.NewRequest("POST", "/u/token/refresh", strings.NewReader(string(payload)))
				request.Header.Add("Content-Type", "application/json")
				// request.AddCookie(&sessionCookie)

				Router.ServeHTTP(w, request)

				// First we expect the proper refresh and 200 should be returned
				Expect(w.Code).To(Equal(http.StatusOK))

				// Send request with invalidated token and should receive 401
				w = httptest.NewRecorder()
				request = httptest.NewRequest("POST", "/u/token/refresh", strings.NewReader(string(payload)))
				request.Header.Add("Content-Type", "application/json")
				// request.AddCookie(&sessionCookie)
				Router.ServeHTTP(w, request)

				Expect(w.Code).To(Equal(http.StatusUnauthorized))

				// Check there are no active tokens for current user
				var numRows int
				models.DB.Model(&models.Token{}).Select("COUNT(id)").Where("user_id = ?", testUser.ID).Where("active = true").Scan(&numRows)
				Expect(numRows).To(BeZero())
			})
		})
	})
})
