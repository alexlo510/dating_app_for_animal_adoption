import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material/';

export default function NewsCard(props) {
    const{ id, title, content, date_created , news_url} = props

    return (
        <Card sx={{}}>
            {news_url !== "" ? <CardMedia component="img" image={news_url} sx={{objectFit: "scale-down", maxHeight:300}}/> : null}
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">{title || ""}</Typography>
                <Typography variant="body2" color="text.secondary" component="div">Type: {date_created || ""}</Typography>
                <Typography variant="body2" color="text.secondary" component="div">
                    {content || ""}
                </Typography>
            </CardContent>              
        </Card>
    );
}
