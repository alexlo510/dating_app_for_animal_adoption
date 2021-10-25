import React, {useState} from 'react';
import { Button, Container, Paper, TextField, Typography } from '@mui/material/';
import { Link } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';
import {FcGoogle} from 'react-icons/fc';

const paperStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 6,
    paddingTop: 2,
    paddingX: 4,
    paddingBottom: 2,
};

const textFieldStyle = {
    marginBottom: 2,
}

const buttonStyle = {
    marginTop: 2,
}

const signUpLinkStyle = {
    textDecoration: "none",
    color: "blue",
}

const googleButtonStyle = {
    marginTop: 1, 
    backgroundColor: "white", 
    color: "gray",
    "&:hover": {
        background: "none",
      }
}

export default function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(username, password);
    }

    const responseGoogleSuccess = (response) => {
        console.log("Success", response);
    }

    const responseGoogleFailure = (response) => {
        console.log("Failure", response);
    }

    return (
        <>
            <Container maxWidth="sm">
                <Paper elevation={3} sx={paperStyle}>
                    <Typography variant="h6">Login</Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            onChange={(e) => setUsername(e.target.value)}
                            variant="standard" name="username" required fullWidth label="Username" sx={textFieldStyle}
                        />
                        <TextField
                            onChange={(e) => setPassword(e.target.value)}
                            variant="standard" name="password" type="password" required fullWidth label="Password" sx={textFieldStyle}
                        />
                        <Button type="submit" color="primary" variant="contained" fullWidth sx={buttonStyle}>Login</Button>
                        <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        render={renderProps => (
                            <Button variant="contained" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} sx={googleButtonStyle} startIcon={<FcGoogle/>}>Login with Google</Button>
                        )}
                        onSuccess={responseGoogleSuccess}
                        onFailure={responseGoogleFailure}
                        cookiePolicy={'single_host_origin'}
                        />
                    </form>
                    <Typography variant="caption">Need an account? 
                        <Link to="/signUp" style={signUpLinkStyle}> Sign Up</Link>
                    </Typography>
                </Paper>
            </Container>
        </>
    );
}