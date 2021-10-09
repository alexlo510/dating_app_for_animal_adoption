import React, {useState} from 'react';
import { Button, Container, Paper, TextField, Typography } from '@mui/material/';
import { Link } from "react-router-dom";

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

const loginLinkStyle = {
    textDecoration: "none",
    color: "blue",
}

export default function SignUp() {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(firstName, lastName, username, email, password);
    }

    return (
        <>
            <Container maxWidth="sm">
                <Paper elevation={3} sx={paperStyle}>
                    <Typography variant="h6">Sign Up</Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField 
                            onChange={(e) => setFirstName(e.target.value)}
                            variant="standard" name="firstName" required fullWidth label="First Name" sx={textFieldStyle}
                        />
                        <TextField 
                            onChange={(e) => setLastName(e.target.value)}
                            variant="standard" name="lastName" required fullWidth label="Last Name" sx={textFieldStyle}
                        />
                        <TextField
                            onChange={(e) => setUsername(e.target.value)}
                            variant="standard" name="username" required fullWidth label="Username" sx={textFieldStyle}
                        />
                        <TextField
                            onChange={(e) => setEmail(e.target.value)}
                            variant="standard" name="email" type="email" required fullWidth label="Email" sx={textFieldStyle}
                        />
                        <TextField
                            onChange={(e) => setPassword(e.target.value)}
                            variant="standard" name="password" type="password" required fullWidth label="Password" sx={textFieldStyle}
                        />
                        <Button type="submit" color="primary" variant="contained" fullWidth sx={buttonStyle}>Submit</Button>
                    </form>
                    <Typography variant="caption">Already have an account? 
                        <Link to="/login" style={loginLinkStyle}> Login</Link>
                    </Typography>
                </Paper>
            </Container>
        </>
    );
}