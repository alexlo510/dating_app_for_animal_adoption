import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Container, Typography } from '@mui/material/';
import AdoptionCard from '../components/adoptionCard';

const sampleData = {
    "name" : "Catto",
    "description" : "chonky boy",
    "type": "Cat",
    "breed": "Tabby",
    "disposition" : [],
    "availability": "Available",
}


export default function Adopt() {
    const [animal, setAnimal] = useState(sampleData)

    return (
        <>
            <Container>
                <Grid container justifyContent="space-around" sx={{marginTop: 8}}>
                    <Grid item xs={8} md={6} lg={8}>
                        <AdoptionCard data={sampleData}/>
                    </Grid>
                </Grid>
                <Grid container justifyContent="center" sx={{marginTop: 1}}>
                    <Grid item xs={2} md={1.5} lg={1.5}>
                        <Button>Left</Button>
                    </Grid>
                    <Grid item xs={2} md={1.5} lg={1.5}>
                        <Button>Right</Button>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

/*
<Container>
                <Grid container>
                    <Grid item>
                        <AdoptionCard data={sampleData}/>
                    </Grid>
                </Grid>
            </Container>
*/