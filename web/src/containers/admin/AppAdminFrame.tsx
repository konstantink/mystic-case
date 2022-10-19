import * as React from "react";

import Box from "@mui/material/Box";
import CssBaseline from '@mui/material/CssBaseline';
import Divider from "@mui/material/Divider";
import Toolbar from '@mui/material/Toolbar';
import { SnackbarProvider } from "notistack";

import SideBar from "../../components/admin/SideBar";

const AppAdminFrame = ({ children }: React.PropsWithChildren<{}>) => {
    return (
        <Box sx={{display: "flex"}}>
            <CssBaseline />
            <SideBar>
                <Box className="main-container" component="main" sx={{flexGrow: 1}}>
                    <Toolbar style={{ display: "block" }}/>
                    <Divider />
                    <SnackbarProvider>
                        {children}
                    </SnackbarProvider>
                </Box>
                {/* {children} */}
            </SideBar>
            {/* <Toolbar>Welcome to admin view</Toolbar> */}
        </Box>
    );
};

export default AppAdminFrame;