import React from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material/';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';

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
    const{ name, description, type, breed, dispositions, availability } = props

    function handleAdoptClick(data) {
        console.log("adopt", data);
        // ?? move this to the adopt page??? 
        // pass data to db to change availability and note down which user adopted 
        // refresh page? move to different page? or change availability in db, then the page somehow rerenders?
    } 
    
    return (
        <Card sx={{}}>
            <CardMedia component="img" alt="" height="" image=""/>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">{name}</Typography>
                <Typography variant="body2" color="text.secondary" component="div">Type: {type}</Typography>
                <Typography variant="body2" color="text.secondary" component="div">Breed: {breed}</Typography>
                <Typography variant="body2" color="text.secondary" component="div">Disposition: </Typography>
                {Object.entries(dispositions).map(([key, value], index) => 
                    <Typography key={index} variant="body2" color="text.secondary" component="div">{key}
                        {value ? <CheckBoxOutlinedIcon fontSize="small"/> : <CheckBoxOutlineBlankOutlinedIcon fontSize="small"/>}</Typography>)}
                <Typography gutterBottom variant="body2" color="text.secondary" component="div">Availability: {availability}</Typography>
                <Typography variant="body2" color="text.secondary" component="div">
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                {availability.toLowerCase() === "available" ?
                <Button size="small" sx={buttonStyle} onClick={() => handleAdoptClick(props.data)}>
                    <Typography variant="body1" color="white">Adopt</Typography>
                </Button>
                : <div></div>}
            </CardActions>               
        </Card>
    );
}
