package models

import (
	"log"
	"time"

	"github.com/adam-hanna/sessions/user"
	"github.com/gofrs/uuid"
	"github.com/mingrammer/cfmt"
	"gorm.io/datatypes"
	"gorm.io/gorm"
)

type TokenType int8

const (
	AccessToken TokenType = iota
	RefreshToken
)

type TokenData struct {
	AccessToken  string    `json:"access_token"`
	RefreshToken string    `json:"refresh_token"`
	AccessUUID   uuid.UUID `json:"access_uuid"`
	RefreshUUID  uuid.UUID `json:"refresh_uuid"`
	AtExpires    int64     `json:"at_expires"`
	RtExpires    int64     `json:"rt_expires"`
}

type Session struct {
	ID        uuid.UUID `gorm:"primaryKey"`
	User      User      `gorm:"-"`
	UserID    uuid.UUID
	Active    bool
	ExpiresAt int64
	JSON      datatypes.JSON
	Tokens    []Token
}

func NewSessionFromUserSession(userSession *user.Session) *Session {
	return &Session{
		ID:        uuid.FromStringOrNil(userSession.ID),
		UserID:    uuid.FromStringOrNil(userSession.UserID),
		ExpiresAt: userSession.ExpiresAt.Unix(),
		Active:    true,
		JSON:      []byte(userSession.JSON),
	}
}

func GetSession(sessionID string) (*Session, error) {
	var storedSession Session
	err := DB.Preload("Tokens").Find(&storedSession, "id = ?", sessionID).Error
	if err != nil {
		log.Print(cfmt.Infof("[INFO] no session %s found", sessionID))
		return nil, err
	}

	return &storedSession, nil
}

// func (s *Session) AfterFind(tx *gorm.DB) error {
// 	var tokenData TokenData
// 	err := json.Unmarshal(s.JSON, &tokenData)
// 	if err != nil {
// 		log.Print(cfmt.Swarningf("[WARNING] can't parse token json: %s", err.Error()))
// 		return err
// 	}

// 	err = DB.First(&s.AccessToken, "id = ?", tokenData.AccessUUID).Error
// 	if err != nil {
// 		log.Print(cfmt.Swarningf("[WARNING] can't find access token %s: %s", tokenData.AccessUUID.String(), err.Error()))
// 	}

// 	err = DB.First(&s.RefreshToken, "id = ?", tokenData.RefreshUUID).Error
// 	if err != nil {
// 		log.Print(cfmt.Swarningf("[WARNING] can't find refresh token %s: %s", tokenData.RefreshUUID.String(), err.Error()))
// 	}

// 	return nil
// }

func (s *Session) Invalidate(justSession bool) error {
	if !justSession {
		log.Print(cfmt.Sinfof("[INFO] there are %d associated tokens with session %s", len(s.Tokens), s.ID.String()))
		for idx := range s.Tokens {
			s.Tokens[idx].Active = false
		}
		// err := s.AccessToken.Invalidate()
		// if err != nil {
		// 	return err
		// }

		// err = s.RefreshToken.Invalidate()
		// if err != nil {
		// 	return err
		// }
	}

	s.Active = false
	// err := DB.Model(&s).Update("active", false).Error
	err := DB.Session(&gorm.Session{FullSaveAssociations: true}).Save(s).Error
	if err != nil {
		log.Print(cfmt.Swarningf("[WARNING] can't invalidate session %s", s.ID.String()))
		return err
	}

	return nil
}

func (s *Session) Lite() *user.Session {
	return &user.Session{
		ID:        s.ID.String(),
		UserID:    s.UserID.String(),
		ExpiresAt: time.Unix(s.ExpiresAt, 0),
		JSON:      s.JSON.String(),
	}
}

type Token struct {
	ID              uuid.UUID `gorm:"primaryKey"`
	User            User
	UserID          uuid.UUID `gorm:"column:user_id"`
	Active          bool
	ExpiresAt       int64 `gorm:"column:expires_at"`
	Value           string
	Type            TokenType
	RefreshedFrom   *Token
	RefreshedFromID *uuid.UUID
	SessionID       uuid.UUID
}

// type AccessToken struct {
// 	Token `gorm:"embedded"`
// }

// type RefreshToken struct {
// 	Token `gorm:"embedded"`
// }

// func (at AccessToken) TableName() string {
// 	return "access_tokens"
// }

func (t Token) Invalidate() error {
	err := DB.Model(&t).Update("active", false).Error
	if err != nil {
		log.Print(cfmt.Swarningf("[WARNING] can't invalidate token %s %s", t.ID.String(), err.Error()))
		return err
	}
	log.Print(cfmt.Sinfof("[INFO] token %s is invalidated", t.ID.String()))
	return nil
}

// func (rt RefreshToken) TableName() string {
// 	return "refresh_tokens"
// }

// func (rt RefreshToken) Invalidate() error {
// 	err := DB.Model(&rt).Update("active", false).Error
// 	if err != nil {
// 		log.Print(cfmt.Swarningf("[WARNING] can't invalidate token %s", rt.ID.String()))
// 		return err
// 	}
// 	log.Print(cfmt.Sinfof("[INFO] refresh token %s is invalidated", rt.ID.String()))
// 	return nil
// }

func AccessTokens(tx *gorm.DB) *gorm.DB {
	return tx.Where("type = ?", AccessToken)
}

func RefreshTokens(tx *gorm.DB) *gorm.DB {
	return tx.Where("type = ?", RefreshToken)
}

func GetTokenByID(dest interface{}, id interface{}, scopes ...func(*gorm.DB) *gorm.DB) error {
	var tokenType string

	err := DB.Scopes(scopes...).Find(dest, "id = ?", id).Error
	if err != nil {
		log.Print(cfmt.Swarningf("[WARNING] can't retrieve %s token %s %s", tokenType, id, err.Error()))
		return err
	}

	return nil
}

func GetTokenByUserID(dest interface{}, userID interface{}, scopes ...func(*gorm.DB) *gorm.DB) error {
	var tokenType string

	err := DB.Scopes(scopes...).Find(dest, "user_id = ?", userID).Error
	if err != nil {
		log.Print(cfmt.Swarningf("[WARNING] can't retrieve %s token for user %s %s", tokenType, userID, err.Error()))
		return err
	}

	return nil
}
