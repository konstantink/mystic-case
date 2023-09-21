package models

type Image struct {
	BaseModel

	Name          string `json:"name"`
	ThumbnailPath string `json:"thumbnail"`
	URLPath       string `json:"url"`
	StorePath     string `json:"-"`
}

// Validate to follow the IValidator interface
func (im Image) Validate() (errors ModelErrors, valid bool) {
	valid = true
	return
}
