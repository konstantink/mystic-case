import * as React from "react";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { ArrowRight } from "@mysticcase/icons/Arrows";

import styles from "@styles/ui/common/notificationform.module.scss";

export const NotificationForm = () => (
    <Box component="div">
        <Typography component="span" variant="body1" className={styles["mc-notificationform-text"]}>
            Subscribe to get latest news about&nbsp;
            <Typography variant="body2" className={styles["mc-notificationform-text-yellow"]} display="inline">
                our boxes
            </Typography>
        </Typography>
        <form method="submit">
            <TextField
                className={styles["mc-notificationform-text-input"]}
                fullWidth
                placeholder="Enter your email address"
                margin="normal"
                type="text"
                // value=""
                variant="standard"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                title="submit"
                                onClick={() => {} /* eslint-disable-line */}
                            >
                                <ArrowRight fill="#FFFFFF" height={22} width={40} fontSize="inherit" />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </form>
    </Box>
);

export default NotificationForm;
