import React from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Checkbox, Typography } from '@mui/material/';

export default function AdoptionCard(props) {
    const{ name, description, type, breed, dispositions, availability } = props.data
    
    return (
        <Card sx={{}}>
            <CardMedia component="img" alt="" height="" image=""/>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">{name}</Typography>
                <Typography variant="body2" color="text.secondary" component="div">Type: {type}</Typography>
                <Typography variant="body2" color="text.secondary" component="div">Breed: {breed}</Typography>
                <Typography variant="body2" color="text.secondary" component="div">Disposition:
                {Object.entries(dispositions).map(([key,value]) =>
                    (value ? 
                        (<Typography variant="body2" color="text.secondary" component="div">{key} <Checkbox size="small" disabled checked /></Typography>) : 
                        (<Typography variant="body2" color="text.secondary" component="div">{key} <Checkbox size="small" disabled/></Typography>)
                    )
                )}
                </Typography>
                <Typography gutterBottom variant="body2" color="text.secondary" component="div">Availability: {availability}</Typography>
                <Typography variant="body2" color="text.secondary" component="div">
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Adopt</Button>
            </CardActions>               
        </Card>
    );
}