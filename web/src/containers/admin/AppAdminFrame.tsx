import * as React from "react";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import { SnackbarProvider } from "notistack";

import SideBar from "../../components/admin/SideBar";
import NotAuthorized from "../../components/admin/util/NotAuthorized";
import { useAuth } from "../../hooks/useAuth";

const AppAdminFrame = ({ children }: React.PropsWithChildren) => {
    const { user } = useAuth();
    console.log("User", user);

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <SideBar>
                <Box className="main-container" component="main" sx={{ flexGrow: 1 }}>
                    <Toolbar style={{ display: "block" }}/>
                    <Divider />
                    <SnackbarProvider>
                        {user.username
                            ? children
                            : (<NotAuthorized />)}
                    </SnackbarProvider>
                </Box>
                {/* {children} */}
            </SideBar>
            {/* <Toolbar>Welcome to admin view</Toolbar> */}
        </Box>
    );
};

export default AppAdminFrame;
