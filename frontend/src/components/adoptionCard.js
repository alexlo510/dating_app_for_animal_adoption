import React from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material/';

export default function AdoptionCard(props) {
    const{ name, description, type, breed, disposition, availability } = props.data
    console.log(props)
    return (
        <Card sx={{}}>
            <CardMedia component="img" alt="" height="" image=""/>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">{name}</Typography>
                <Typography variant="body2" color="text.secondary">Type: {type}</Typography>
                <Typography variant="body2" color="text.secondary">Breed: {breed}</Typography>
                <Typography variant="body2" color="text.secondary">Disposition:</Typography>
                <Typography gutterBottom variant="body2" color="text.secondary">Availability: {availability}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Adopt</Button>
            </CardActions>               
        </Card>
    );
}