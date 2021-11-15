import React from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material/';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import { useUserContext } from './UserContext.js';
import { dispositions } from '../components/ProfilePropertiesLists.js';

const buttonStyle = {
    backgroundColor: "teal", 
    textTransform: "none",
    "&:hover": {
        backgroundColor: "teal"
    },
    ripple: {
        color: "white",
    }
}


export default function AdoptionCard(props) {
    const{ name, description, type, breed, disposition, availability, id, picture_url, handleAdoptClick} = props
    const { user } = useUserContext();

    console.log(disposition);
  
    return (
        <Card sx={{}}>
            {picture_url !== "" ? <CardMedia component="img" image={picture_url} sx={{objectFit: "scale-down", maxHeight:300}}/> : null}
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">{name || ""}</Typography>
                <Typography variant="body2" color="text.secondary" component="div">Type: {type || ""}</Typography>
                <Typography variant="body2" color="text.secondary" component="div">Breed: {breed || ""}</Typography>
                <Typography variant="body2" color="text.secondary" component="div">Disposition:
                {disposition.constructor === Array ? 
                    dispositions.map(
                        (item, index) => disposition.includes(item) ? 
                        <Typography key={index} variant="body2" color="text.secondary" component="div">{item}<CheckBoxOutlinedIcon fontSize="small"/></Typography>
                        : <Typography key={index} variant="body2" color="text.secondary" component="div">{item}<CheckBoxOutlineBlankOutlinedIcon fontSize="small"/></Typography>
                    ) 
                : null}
                {disposition.constructor === Map ? (
                        Object.entries(disposition).map(([key, value], index) => 
                            <Typography key={index} variant="body2" color="text.secondary" component="div">{key}
                                {value ? <CheckBoxOutlinedIcon fontSize="small"/> : <CheckBoxOutlineBlankOutlinedIcon fontSize="small"/>}</Typography>)
                        ) : disposition.constructor !== Array ? <div> {disposition || ""}</div> : null}
                </Typography>
                <Typography gutterBottom variant="body2" color="text.secondary" component="div">Availability: {availability || ""}</Typography>
                <Typography variant="body2" color="text.secondary" component="div">
                    {description || ""}
                </Typography>
            </CardContent>
            <CardActions>
                {availability ? ((availability.toLowerCase() === "available" && user) ?
                <Button size="small" sx={buttonStyle} onClick={() => handleAdoptClick(id)}>
                    <Typography variant="body1" color="white">Adopt</Typography>
                </Button>
                : <div></div>) : null}
            </CardActions>               
        </Card>
    );
}
