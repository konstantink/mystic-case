package api_test

import (
	"net/http/httptest"

	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
)

var _ = Describe("Test products api", func() {
	It("checks that featured products list returns something", func() {
		w := httptest.NewRecorder()
		request := httptest.NewRequest("GET", "/products/featured", nil)
		request.Header.Add("Content-Type", "application/json")
		Router.ServeHTTP(w, request)

		Expect(w.Code).To(Equal(200))
	})
})
