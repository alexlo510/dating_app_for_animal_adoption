import { Box, Typography } from '@mui/material/';
import LatestNews from '../components/LatestNews';

const backgroundStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/cat_dog.jpg)`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
}

const newsContainerStyle = {
    marginTop: 2,
}

const wordStyle = {
    fontSize: {lg: 100, md: 50, sm: 50, xs: 50},
    fontFamily: "Marker Felt",
    color: "Teal",
    textAlign: "center",
}

export default function Home() {
    return (
        <>
            <div style={backgroundStyle}>
                <Box>
                    <Typography variant="h1" sx={wordStyle}>Welcome to Pinder</Typography>
                </Box>
            </div>
            <Box sx={newsContainerStyle}>
                <Typography variant="h1" sx={wordStyle}>Latest News</Typography>
                <LatestNews/>
            </Box>
        </>
    );
}