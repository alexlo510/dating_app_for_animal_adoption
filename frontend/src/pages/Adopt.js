import React, { useEffect, useState } from 'react';
import { Button, Container, Grid} from '@mui/material/';
import AdoptionCard from '../components/adoptionCard';

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
                        <Button>Left</Button>
                    </Grid>
                    <Grid item xs={2} md={1} lg={1}>
                    </Grid>
                    <Grid item xs={2} md={1} lg={1}>
                        <Button>Right</Button>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}