import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { login } from '../../../api/auth';
import { validateLogin } from '../../../utils/validation/validation';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                fwzfrds
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

// account
// username: 'kminchelle',
// password: '0lelplR',

const Login = () => {

    const [loginData, setLoginData] = useState({})
    const [loading, setLoading] = useState(false)
    const [formErrors, setFormErrors] = useState(null)
    const navigate = useNavigate()

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        if (name === 'username') {
            setLoginData({ ...loginData, username: value })
        } else if (name === 'password') {
            setLoginData({ ...loginData, password: value })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        let errorDataForms = {}

        errorDataForms = validateLogin(loginData)
        if (Object.keys(errorDataForms).length > 0) {
            setFormErrors(errorDataForms)
            swal({
                title: "error",
                text: 'Error while adding data, please check the form',
                icon: "error",
                timer: 2000
            });
            setLoading(false)
            return
        }

        try {
            const data = JSON.stringify(loginData)
            const response = await login(data)
            const token = response.data.token

            localStorage.setItem('authToken', token)

            swal({
                title: "Success",
                text: `Login success!`,
                icon: "success",
                timer: 2000
            });

            setLoading(false)

            navigate('/')
        } catch (error) {
            console.error(error)
            swal({
                title: "error",
                text: 'Error while loggin in',
                icon: "error",
                timer: 2000
            });
            setLoading(false)
        }

    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Username"
                            name="username"
                            autoFocus
                            onChange={(e) => handleChange(e)}
                            error={formErrors && formErrors.username ? true : false}
                            helperText={formErrors && formErrors.username ? formErrors.username : ''}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e) => handleChange(e)}
                            error={formErrors && formErrors.password ? true : false}
                            helperText={formErrors && formErrors.password ? formErrors.password : ''}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={loading ? true : false}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}

export default Login