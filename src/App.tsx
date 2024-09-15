import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {RouterProvider} from "react-router-dom";
import {router} from "./router";
import {ThemeProvider} from "@mui/material/styles";
import {theme} from "./theme";
import {CssBaseline} from "@mui/material";
import {AuthProvider} from "./contexts/AuthProvider";
import store from "./redux/store"
function App() {
    return (
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <AuthProvider>
                        <RouterProvider router={router}/>
                    </AuthProvider>
                </LocalizationProvider>
            </ThemeProvider>
    );
}

export default App;
