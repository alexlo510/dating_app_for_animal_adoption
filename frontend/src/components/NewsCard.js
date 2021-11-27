import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material/';

export default function NewsCard(props) {
    const{ id, title, content, date_created , news_url} = props

    return (
        <Card sx={{minHeight: 345}}>
            {news_url !== "" ? <CardMedia component="img" image={news_url} sx={{objectFit: "scale-down", width:300, minHeight: 230}}/> : null}
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">{title || ""}</Typography>
                <Typography variant="body2" color="text.secondary" component="div">Date: {date_created || ""}</Typography>
                <Typography variant="body2" color="text.secondary" component="div" sx={{maxWidth:300, maxHeight: 600}}>
                    {content || ""}
                </Typography>
            </CardContent>              
        </Card>
    );
}
