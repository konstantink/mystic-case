package api_test

import (
	"bytes"
	"encoding/json"
	"net/http"
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

	var _ = FDescribe("test product POST api", func() {
		It("doesn't create a product object and returns errors in case arguments are missing", func() {
			var (
				testProduct = map[string]interface{}{
					"name":         "",
					"title":        "",
					"description":  "",
					"prices":       []map[string]interface{}{},
					"difficulty":   0,
					"isFeatured":   false,
					"isNew":        false,
					"isBestseller": false,
					"images":       []map[string]interface{}{},
					"hasVariants":  false,
					"variants":     []map[string]interface{}{},
				}
				payload, _ = json.Marshal(testProduct)
				request    = httptest.NewRequest("POST", "/products/product", bytes.NewReader(payload))
				w          = httptest.NewRecorder()
			)

			request.Header.Add("Content-Type", "application/json")

			Router.ServeHTTP(w, request)

			Expect(w.Code).To(Equal(http.StatusBadRequest))
		})
	})
})
