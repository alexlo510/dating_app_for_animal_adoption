import React, { useEffect, useState } from 'react';
import axios from "axios"
import { Button, Container, Grid } from '@mui/material/';
import AdoptionCard from '../components/AdoptionCard';
import AlertMessage from '../components/AlertMessage';
import AdoptionSearchBar from '../components/AdoptionSearchBar';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const sampleData = [{
    "id" : 1,
    "name" : "Catto",
    "description" : "chonky boy",
    "type": "Cat",
    "breed": "Tabby",
    "disposition" :{
        "Good with other animals" : false,
        "Good with other children" : false,
        "Animal must be leashed at all times" : true,
    },
    "availability": "Available",
},
{
    "id" : 2,
    "name" : "Doggo",
    "description" : "Good boy",
    "type": "Dog",
    "breed": "Shiba",
    "disposition" :{
        "Good with other animals" : true,
        "Good with other children" : true,
        "Animal must be leashed at all times" : false,
    },
    "availability": "available",
},
{
    "id" : 3,
    "name" : "Mousie",
    "description" : "cheese head",
    "type": "mouse",
    "breed": "field mouse",
    "disposition" :{
        "Good with other animals" : true,
        "Good with other children" : true,
        "Animal must be leashed at all times" : false,
    },
    "availability": "available",
}
]

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
    const [data, setData] = useState([])
    const [animal, setAnimal] = useState("")
    const [index, setIndex] = useState("")
    const [disableButtons, setDisableButtons] = useState(false)
    const [adoptSuccess, setAdoptSuccess] = useState(false)
    const [adoptFail, setAdoptFail] = useState(false)
    
    useEffect(() => {
        try {
            async function fetchAnimal() {
                const res = await axios.get("https://pet-shelter-api.uw.r.appspot.com/pets")
                console.log(res.data);
                setData(res.data)
                setAnimal(res.data[res.data.length - 1]) // set to the latest animal
                setIndex(res.data.length - 1) // set the index of the animal 
            }
            fetchAnimal();
        } catch (err) {
            console.log(err);
        }
    }, []);

    async function handleClick(fetchID) {
        setDisableButtons(prevState => !prevState) // disable buttons        
        try {
            async function fetchNewAnimal(fetchID) {
                const res = await axios.get("https://pet-shelter-api.uw.r.appspot.com/pets")
                setData(res.data)

                if (fetchID >= data.length) {
                    fetchID = 0
                }
                if (fetchID === -1) {
                    fetchID = data.length - 1
                }
                
                setAnimal(data[fetchID])
                setIndex(fetchID)
                setAdoptSuccess(false)
                setAdoptFail(false)
            }
            await fetchNewAnimal(fetchID);
            setDisableButtons(prevState => !prevState) // enable button
        } catch (err) {
            console.log(err);
            setDisableButtons(prevState => !prevState) // enable button
        }
    }

    function handleAdoptClick(animalID) {
        console.log("Adopting", animalID);
        //setAdoptSuccess(true);
        setAdoptFail(true);

        // send post request to server so server can change availability to unavail 
        // fetch updated data for the animal. display alert that says adopted? refresh page?
    }

    return (
        <>
            <Container>
                <AdoptionSearchBar/>
                <Grid container justifyContent="space-around" sx={{marginTop: 2}}>
                    <Grid item xs={8} md={6} lg={8}>
                        {animal && <AdoptionCard {...animal} handleAdoptClick={handleAdoptClick}/>}
                    </Grid>
                </Grid>
                <Grid container justifyContent="center" sx={{marginTop: 1}}>
                    <Grid item xs={2} md={2} lg={2}>
                        <Button sx={buttonStyle} disabled={disableButtons} onClick={() => handleClick(index - 1)}>
                            <ChevronLeftIcon sx={{color: "white"}}/>
                        </Button>
                    </Grid>
                    <Grid item xs={2} md={1} lg={1}>
                    </Grid>
                    <Grid item xs={2} md={1} lg={1}>
                        <Button sx={buttonStyle} disabled={disableButtons} onClick={() => handleClick(index + 1)}>
                            <ChevronRightIcon sx={{color: "white"}}/>
                        </Button>
                    </Grid>
                </Grid>
                { adoptSuccess ? <AlertMessage message="Adopt Sucessful" severity="success" reset={setAdoptSuccess}/> : null}
                { adoptFail ? <AlertMessage message="Adopt Fail" severity="error" reset={setAdoptFail}/> : null}
            </Container>
        </>
    );
}