import React, { useEffect, useState } from 'react';
import Axios from "axios"
import { Checkbox, Container, FormGroup, FormControlLabel, Typography } from '@mui/material/';
import { useUserContext } from '../components/UserContext.js';
import SelectInput from '@mui/material/Select/SelectInput';

const titleStyle = {
    textDecoration: 'underline',
}

const contentStyle = {
    marginTop: '5%',
    marginBottom: '5%'
}

export default function UserProfile() {
    const { user, setUser } = useUserContext()
    const [ adoptedAnimals, setAdoptedAnimals] = useState(null)
    const [ emailNotificationChecked, setEmailNotificationChecked ] = useState(user ? user.email_notifications : JSON.parse(sessionStorage.getItem('user')).email_notifications)
    const [ disableCheckbox, setDisableCheckbox ] = useState(false)
    
    useEffect(() => {

    }, []);

    const handleEmailPreferenceChange = async (event) => {
        setDisableCheckbox(prevState => !prevState)
        console.log("CHECK VALUE:", event.target.checked); // remove later 
        setEmailNotificationChecked(event.target.checked);
        // send value to the backend to update
        try {
            const config = {
                headers: { Authorization: `Bearer ${user.accesstoken}` }
            };
            const payload = {email_notifications : event.target.checked}
            const res = await Axios.patch(`https://pet-shelter-api.uw.r.appspot.com/users/${user.id}/settings`, payload, config)
            setUser( {...user, email_notifications : res.data.email_notifications} )
            sessionStorage.setItem('user', JSON.stringify({...user, email_notifications: res.data.email_notifications}))
            setEmailNotificationChecked(res.data.email_notifications)
        } catch (err) {
            console.log(err);
            setDisableCheckbox(prevState => !prevState)
        }
        setDisableCheckbox(prevState => !prevState)
    };

    return (
        <>
            <Container sx={contentStyle}>
                <Typography variant="h6" sx={titleStyle} component="div">Profile:</Typography>
                {user && <Typography variant="body2" component="div">ID: {user.owner_id || ""}</Typography>}
                {user && <Typography variant="body2" component="div">Name: {user.user_alias || ""}</Typography>}
            </Container>
            <Container sx={contentStyle}>
                <Typography variant="h6" sx={titleStyle} component="div">Adopted Animals:</Typography>
                {!adoptedAnimals && <Typography variant="body2" component="div">None</Typography>}
                {adoptedAnimals && <Typography variant="body2" component="div">{adoptedAnimals || ""}</Typography>}
            </Container>
            <Container sx={contentStyle}>
                <Typography variant="h6" sx={titleStyle} component="div">Email Preference</Typography>
                <FormGroup>
                    <FormControlLabel 
                    label="Subscribe to Email Notifications"
                    control={<Checkbox disabled={disableCheckbox} checked={emailNotificationChecked} onChange={handleEmailPreferenceChange}/>}  
                    />
                </FormGroup>
            </Container>
        </>
    );
}