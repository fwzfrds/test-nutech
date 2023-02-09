import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import StoreIcon from '@mui/icons-material/Store';
import swal from 'sweetalert';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        swal({
            title: "Warning",
            text: `Are you sure want to logout?`,
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then(async (isOkay) => {
            if (isOkay) {
                try {
                    localStorage.removeItem('authToken')
                    swal({
                        title: "Succes",
                        text: "Logout Successful!",
                        icon: "success",
                        timer: 2000
                    })
                    navigate('login')
                } catch (error) {
                    swal({
                        title: "Error",
                        text: `Error while logging out!`,
                        icon: "error",
                        timer: 2000
                    });
                }
            }
        })
    }

    return (
        <AppBar position="fixed">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <StoreIcon />
                </IconButton>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1 }}
                >
                    NuShop
                </Typography>
                <Button
                    color="inherit"
                    onClick={() => handleLogout()}
                >
                    <LogoutIcon />
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar