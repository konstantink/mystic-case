package api

import (
	"encoding/json"
	"log"
	"time"

	"github.com/adam-hanna/sessions/user"
	"github.com/gofrs/uuid"
	"github.com/mingrammer/cfmt"
	"github.com/mystic-case/back/models"
	"github.com/pkg/errors"
	"gorm.io/gorm"
)

type SessionStore struct{}

func (ss *SessionStore) SaveUserSession(userSession *user.Session) error {
	var tokenData models.TokenData
	err := json.Unmarshal([]byte(userSession.JSON), &tokenData)
	if err != nil {
		log.Print(cfmt.Swarningf("[WARNING] can't extract token data %s", err.Error()))
		return err
	}

	session := models.Session{
		ID:        uuid.FromStringOrNil(userSession.ID),
		UserID:    uuid.FromStringOrNil(userSession.UserID),
		ExpiresAt: userSession.ExpiresAt.Unix(),
		Active:    true,
		JSON:      []byte(userSession.JSON),
		Tokens: []models.Token{
			{
				ID:              tokenData.AccessUUID,
				UserID:          uuid.FromStringOrNil(userSession.UserID),
				Active:          true,
				ExpiresAt:       tokenData.AtExpires,
				Value:           tokenData.AccessToken,
				Type:            models.AccessToken,
				RefreshedFromID: nil,
			},
			{
				ID:              tokenData.RefreshUUID,
				UserID:          uuid.FromStringOrNil(userSession.UserID),
				Active:          true,
				ExpiresAt:       tokenData.RtExpires,
				Value:           tokenData.RefreshToken,
				Type:            models.RefreshToken,
				RefreshedFromID: nil,
			},
		},
	}

	tx := models.DB.Begin()
	err = tx.Session(&gorm.Session{FullSaveAssociations: true}).Create(&session).Error
	if err != nil {
		tx.Rollback()
		log.Print(cfmt.Swarningf("[WARNING] can't store access token %s", err.Error()))
		return err
	}
	tx.Commit()

	return nil
}

func (ss *SessionStore) DeleteUserSession(sessionID string) error {
	var userSession models.Session

	err := models.DB.First(&userSession, sessionID).Error
	if err != nil {
		log.Print(cfmt.Swarningf("[WARNING] can't find session %s", sessionID))
		return err
	}

	err = userSession.Invalidate(false)
	if err != nil {
		log.Print(cfmt.Swarningf("[WARNING] can't invalidate session %s", sessionID))
		return err
	}

	return nil
}

func (ss *SessionStore) FetchValidUserSession(sessionID string) (*user.Session, error) {
	var userSession models.Session

	err := models.DB.First(&userSession, "id = ?", sessionID, "active = true").Error
	if err != nil {
		log.Print(cfmt.Swarningf("[WARNING] can't find session %s", sessionID))
		return nil, err
	}

	if userSession.ExpiresAt < time.Now().Unix() {
		log.Print(cfmt.Sinfof("[INFO] session %s is expired", sessionID))
		userSession.Invalidate(false)
		return nil, errors.New("session is expired")
	}

	return userSession.Lite(), nil
}
