module github.com/mystic-case/back

replace github.com/mystic-case/back/models => ./models

replace github.com/mystic-case/back/api => ./api

go 1.14

require (
	github.com/adam-hanna/jwt-auth/jwt v0.0.0-20210801230358-648d06fb0092
	github.com/adam-hanna/sessions v0.0.6
	github.com/gin-contrib/cors v1.3.1
	github.com/gin-gonic/gin v1.6.3
	github.com/go-playground/locales v0.14.0
	github.com/go-playground/universal-translator v0.18.0
	github.com/go-playground/validator/v10 v10.10.0
	github.com/gofrs/uuid v3.3.0+incompatible
	github.com/golang-jwt/jwt v3.2.2+incompatible
	github.com/golang-migrate/migrate/v4 v4.14.1
	github.com/h2non/bimg v1.1.9 // indirect
	github.com/kelseyhightower/envconfig v1.4.0
	github.com/logrusorgru/aurora v2.0.3+incompatible // indirect
	github.com/mingrammer/cfmt v1.1.0
	github.com/onsi/ginkgo v1.12.0
	github.com/onsi/gomega v1.9.0
	github.com/pkg/errors v0.9.1
	golang.org/x/crypto v0.0.0-20210817164053-32db794688a5
	gopkg.in/yaml.v2 v2.3.0 // indirect
	gorm.io/datatypes v1.0.2
	gorm.io/driver/postgres v1.1.0
	gorm.io/gorm v1.21.15
)
