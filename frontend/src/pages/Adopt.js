import React, { useEffect, useState } from 'react';
import axios from "axios"
import { Button, Container, Grid} from '@mui/material/';
import AdoptionCard from '../components/adoptionCard';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const sampleData = {
    "id" : 1,
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

const sampleData2 = {
    "id" : 2,
    "name" : "Doggo",
    "description" : "Good boy",
    "type": "Dog",
    "breed": "Shiba",
    "dispositions" :{
        "Good with other animals" : true,
        "Good with other children" : true,
        "Animal must be leashed at all times" : false,
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
    const [dataID, setDataID] = useState(sampleData["id"])
    const [disableButtons, setDisableButtons] = useState(false)
    
    useEffect(() => {
        try {
            async function fetchAnimal() {
                const res = await axios.get("") // replace with server url
                setAnimal(res.data)
                setDataID(res.data["id"])
            }
            fetchAnimal();
        } catch (err) {
            console.log(err);
        }
    }, []);

    function handleClick(fetchID) {
        console.log(fetchID); // test
        // disable buttons
        setDisableButtons(prevState => !prevState)
        console.log("disable");
        try {
            async function fetchNewAnimal(fetchID) {
                const res = await axios.post("", [fetchID]) // replace with server url
                setAnimal(res.data)
                setDataID(res.data["id"])
            }
            fetchNewAnimal(fetchID);
        } catch (err) {
            console.log(err);
        }

        setAnimal(sampleData2) // delete only used for testing
        //setDataID(sampleData2["id"]) // delete only used for testing
        console.log("new data");
        console.log("enable");
        // enable button
        setDisableButtons(prevState => !prevState)

    } 

    return (
        <>
            <Container>
                <Grid container justifyContent="space-around" sx={{marginTop: 6}}>
                    <Grid item xs={8} md={6} lg={8}>
                        {animal && <AdoptionCard data={animal}/>}
                    </Grid>
                </Grid>
                <Grid container justifyContent="center" sx={{marginTop: 1}}>
                    <Grid item xs={2} md={2} lg={2}>
                        <Button sx={buttonStyle} disabled={disableButtons} onClick={() => handleClick(dataID - 1)}>
                            <ChevronLeftIcon sx={{color: "white"}}/>
                        </Button>
                    </Grid>
                    <Grid item xs={2} md={1} lg={1}>
                    </Grid>
                    <Grid item xs={2} md={1} lg={1}>
                        <Button sx={buttonStyle} disabled={disableButtons} onClick={() => handleClick(dataID + 1)}>
                            <ChevronRightIcon sx={{color: "white"}}/>
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}