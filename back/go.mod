module github.com/mystic-case/back

replace github.com/mystic-case/back/models => ./models

replace github.com/mystic-case/back/api => ./api

go 1.14

require (
	github.com/adam-hanna/sessions v0.0.6
	github.com/asaskevich/govalidator v0.0.0-20200819183940-29e1ff8eb0bb
	github.com/gin-contrib/cors v1.3.1
	github.com/gin-gonic/gin v1.6.3
	github.com/go-playground/locales v0.13.0
	github.com/go-playground/universal-translator v0.17.0
	github.com/go-playground/validator/v10 v10.2.0
	github.com/gofrs/uuid v3.3.0+incompatible
	github.com/golang-migrate/migrate/v4 v4.14.1
	github.com/kelseyhightower/envconfig v1.4.0
	github.com/onsi/ginkgo v1.12.0
	github.com/onsi/gomega v1.9.0
	github.com/pkg/errors v0.9.1
	github.com/qor/qor v0.0.0-20200729071734-d587cffbbb93 // indirect
	github.com/qor/validations v0.0.0-20171228122639-f364bca61b46
	golang.org/x/crypto v0.0.0-20200709230013-948cd5f35899
	gopkg.in/yaml.v2 v2.3.0 // indirect
	gorm.io/driver/postgres v1.0.8
	gorm.io/gorm v1.21.2
)
