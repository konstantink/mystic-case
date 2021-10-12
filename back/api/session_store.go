package api

import (
	"encoding/json"
	"log"
	"time"

	"github.com/adam-hanna/sessions/user"
	"github.com/gofrs/uuid"
	"github.com/mingrammer/cfmt"
	"github.com/mystic-case/back/models"
)

type SessionStore struct{}

func (ss *SessionStore) SaveUserSession(userSession *user.Session) error {
	var tokenData models.TokenData
	err := json.Unmarshal([]byte(userSession.JSON), &tokenData)
	if err != nil {
		log.Print(cfmt.Swarningf("[WARNING] can't extract token data %s", err.Error()))
		return err
	}

	accessToken := models.AccessToken{
		Token: models.Token{
			ID:        tokenData.AccessUUID,
			UserID:    uuid.FromStringOrNil(userSession.UserID),
			Active:    true,
			ExpiresAt: tokenData.AtExpires,
			Token:     tokenData.AccessToken,
		},
	}

	refreshToken := models.RefreshToken{
		Token: models.Token{
			ID:        tokenData.RefreshUUID,
			UserID:    uuid.FromStringOrNil(userSession.UserID),
			Active:    true,
			ExpiresAt: tokenData.RtExpires,
			Token:     tokenData.RefreshToken,
		},
	}

	session := models.Session{
		ID:             uuid.FromStringOrNil(userSession.ID),
		UserID:         uuid.FromStringOrNil(userSession.UserID),
		ExpiresAt:      userSession.ExpiresAt.Unix(),
		Active:         true,
		JSON:           []byte(userSession.JSON),
		AccessTokenID:  accessToken.ID,
		RefreshTokenID: refreshToken.ID,
	}

	err = models.DB.Create(&accessToken).Error
	if err != nil {
		log.Print(cfmt.Swarningf("[WARNING] can't store access token %s", err.Error()))
		return err
	}

	err = models.DB.Create(&refreshToken).Error
	if err != nil {
		log.Print(cfmt.Swarningf("[WARNING] can't store access token %s", err.Error()))
		return err
	}

	err = models.DB.Create(&session).Error
	if err != nil {
		log.Print(cfmt.Swarningf("[WARNING] can't store access token %s", err.Error()))
		return err
	}

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

	err := models.DB.First(&userSession, "id = ?", sessionID, "active = 1").Error
	if err != nil {
		log.Print(cfmt.Swarningf("[WARNING] can't find session %s", sessionID))
		return nil, err
	}

	if userSession.ExpiresAt < time.Now().Unix() {
		log.Print(cfmt.Sinfof("[INFO] session %s is expired", sessionID))
		userSession.Invalidate(true)
		return nil, nil
	}

	return userSession.Lite(), nil
}
