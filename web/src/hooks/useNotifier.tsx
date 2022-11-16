import * as React from "react";

import {
    CloseReason,
    OptionsObject,
    SnackbarKey,
    SnackbarMessage,
    useSnackbar,
    VariantType
} from "notistack";

enum NotifierActionType {
    PushNotification = "@@notifier/PUSH_NOTIFICATION",
    CloseNotification = "@@notifier/CLOSE_NOTIFICATION"
}

type NotifierPushAction = {
    type: NotifierActionType.PushNotification;
    notification: Notification;
};

type NotifierCloseAction = {
    type: NotifierActionType.CloseNotification;
    key?: SnackbarKey;
}

type NotifierAction = NotifierPushAction | NotifierCloseAction;

type Notification = {
    message: SnackbarMessage;
    dismissed?: boolean;
    options: OptionsObject;
};

type NotifierState = {
    notifications: Array<Notification>;
};

type NotifierReducer = (state: NotifierState, action: NotifierAction) => NotifierState;

export const useNotifier = () => {
    const { closeSnackbar, enqueueSnackbar } = useSnackbar();
    const reducer = (state: NotifierState, action: NotifierAction) => {
        switch (action.type) {
            case NotifierActionType.PushNotification:
                return {
                    ...state,
                    notifications: [
                        ...state.notifications, 
                        action.notification
                    ]
                }
            case NotifierActionType.CloseNotification:
                return {
                    ...state,
                    notifications: state.notifications.map(item => item.options.key === action.key ? { ...item, dismissed: true } : item),
                }
            default:
                return state;
        }
    }
    const initialState: NotifierState = {
        notifications: [],
    };
    const [state, dispatch] = React.useReducer<NotifierReducer>(reducer, initialState);

    const sendNotification = (variant: VariantType) => (message: string) =>
        dispatch({
            type: NotifierActionType.PushNotification,
            notification: {
                message,
                options: {
                    key: `${new Date().toISOString()}-${Math.round(Math.random()*1000000)}`,
                    variant: variant,
                    preventDuplicate: true,
                    anchorOrigin: { horizontal: "left", vertical: "bottom" },
                }
            }
        });

    const success = sendNotification("success");
    const warn = sendNotification("warning");
    const error = sendNotification("error");
    const info = sendNotification("info");

    React.useEffect(() => {
        state.notifications.forEach(({ message, options, dismissed=false }) => {
            if (dismissed) {
                closeSnackbar(options.key);
                return
            }
            enqueueSnackbar(message, {
                ...options,
                onClose: (e: React.SyntheticEvent<any> | null, reason: CloseReason, key?: SnackbarKey) => {
                    if (options.onClose) {
                        options.onClose(e, reason, key);
                    }
                },
                onExited: (e: HTMLElement, key: SnackbarKey) => {
                    dispatch({
                        type: NotifierActionType.CloseNotification,
                        key: key
                    });
                }
            });
        });
    }, [state.notifications]);

    return { info, success, warn, error }
}