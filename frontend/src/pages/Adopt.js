import React, { useEffect, useState } from 'react';
import { Button, Container, Grid} from '@mui/material/';
import AdoptionCard from '../components/adoptionCard';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const sampleData = {
    "name" : "Catto",
    "description" : "chonky boy",
    "type": "Cat",
    "breed": "Tabby",
    "dispositions" :{
        "Good with other animals" : false,
        "Good with other children" : false,
        "Animal must be leashed at all times" : true,
    },
    "availability": "Available",
}

const buttonStyle = {
    backgroundColor: "#2196F3",
    "&:hover": {
        backgroundColor: "teal"
    },
    ripple: {
        color: "white",
    }
}

export default function Adopt() {
    const [animal, setAnimal] = useState(sampleData)

    return (
        <>
            <Container>
                <Grid container justifyContent="space-around" sx={{marginTop: 6}}>
                    <Grid item xs={8} md={6} lg={8}>
                        <AdoptionCard data={sampleData}/>
                    </Grid>
                </Grid>
                <Grid container justifyContent="center" sx={{marginTop: 1}}>
                    <Grid item xs={2} md={2} lg={2}>
                        <Button sx={buttonStyle}>
                            <ChevronLeftIcon sx={{color: "white"}}/>
                        </Button>
                    </Grid>
                    <Grid item xs={2} md={1} lg={1}>
                    </Grid>
                    <Grid item xs={2} md={1} lg={1}>
                        <Button sx={buttonStyle}>
                            <ChevronRightIcon sx={{color: "white"}}/>
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}