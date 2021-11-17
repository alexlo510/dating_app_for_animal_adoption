import React, { useEffect, useState } from 'react';
import Axios from "axios"
import { Button, CircularProgress, Container, Grid, Typography } from '@mui/material/';
import AdoptionCard from '../components/AdoptionCard';
import AlertMessage from '../components/AlertMessage';
import AdoptionSearchBar from '../components/AdoptionSearchBar';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useUserContext } from '../components/UserContext.js';

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
    const [searchFilter, setSearchFilter] = useState(false)
    const [typeFilter, setTypeFilter] = useState("")
    const [breedFilter, setBreedFilter] = useState("")
    const [dispositionFilter, setDispositionFilter] = useState([])
    const [dateFilter, setDateFilter] = useState("")
    const { user } = useUserContext();
    
    useEffect(() => {
        try {
            async function fetchAnimal() {
                const res = await Axios.get("https://pet-shelter-api.uw.r.appspot.com/pets")
                // sort list by date
                res.data.sort((a, b) => (a.date_created > b.date_created) ? 1 : (a.date_created === b.date_created) ? (a.id > b.id ? 1 : -1) : -1 )
                console.log(res.data); // remove after testing
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
                const res = await Axios.get("https://pet-shelter-api.uw.r.appspot.com/pets")
                // sort list by date
                res.data.sort((a, b) => (a.date_created > b.date_created) ? 1 : (a.date_created === b.date_created) ? (a.id > b.id ? 1 : -1) : -1 )
                
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

    async function handleAdoptClick(animalID) {
        console.log("Adopting", animalID); // remove after testing
        try {
            const payload = {availability : "Pending", adoptedby : `${user.owner_id}`}
            const config = {
                headers: { Authorization: `Bearer ${user.accesstoken}` }
            };
            console.log("config:", config);
            const res = await Axios.patch(`https://pet-shelter-api.uw.r.appspot.com/pets/${animalID}`, payload, config)
            console.log(res);
            setAdoptSuccess(true);
            setAnimal({...animal, "availability":"Pending"}) // switch to just set res data? 

            // also pass in the user who adopted the pet. 
            
        } catch (err) {
            setAdoptFail(true);
        }
    }

    async function handleSearch(type, breed, disposition, date) {
        console.log(type, breed, disposition, date);
        try {
            // axios to server
            // const payload = {type: type, breed: breed, disposition: disposition, date: date}
            // const res = await Axios.post("testing", payload)
            setSearchFilter(true)
            setTypeFilter(type)
            setBreedFilter(breed)
            setDispositionFilter(disposition)
            setDateFilter(date)
        } catch (err) {
            console.log(err);
        }
    }

    // might not need this if insert the searchFilter prop in handleClick instead. 
    async function handleFilterClick(fetchID) {
        console.log("filter click"); // remove later
        setDisableButtons(prevState => !prevState) // disable buttons        
        try {
            async function fetchFilterNewAnimal(fetchID) {
                //const res = await Axios.get("https://pet-shelter-api.uw.r.appspot.com/pets")
                // sort list by date
                //res.data.sort((a, b) => (a.date_created > b.date_created) ? 1 : (a.date_created === b.date_created) ? (a.id > b.id ? 1 : -1) : -1 )
                
                //setData(res.data)

                if (fetchID >= data.length) {
                    fetchID = 0
                }
                if (fetchID === -1) {
                    fetchID = data.length - 1
                }
                
                //setAnimal(data[fetchID])
                //setIndex(fetchID)
                setAdoptSuccess(false)
                setAdoptFail(false)
            }
            //await fetchFilterNewAnimal(fetchID);
            setDisableButtons(prevState => !prevState) // enable button
        } catch (err) {
            console.log(err);
            setDisableButtons(prevState => !prevState) // enable button
        }
    }

    return (
        <>
            <Container>
                <AdoptionSearchBar handleSearch={handleSearch} />
                {searchFilter && <Typography>Filter By: {typeFilter && <span>{typeFilter}.</span>} {breedFilter && <span>{breedFilter}.</span>} {dispositionFilter && dispositionFilter.map((disposition) => (<span>{disposition}. </span>))} {dateFilter && <span>{dateFilter}.</span>}</Typography>}
                {searchFilter && <Button color="primary" variant="contained" onClick={() => window.location.reload()}>Clear Filters</Button>}
                <Grid container justifyContent="space-around" sx={{marginTop: 2}}>
                    <Grid item>
                        {!animal && <div style={{display: 'flex', justifyContent: 'center'}}><CircularProgress/></div>}
                        {animal && <AdoptionCard {...animal} handleAdoptClick={handleAdoptClick}/>}
                    </Grid>
                </Grid>
                <Grid container justifyContent="center" sx={{marginTop: 1}}>
                    <Grid item sx={{marginRight: 2}}>
                        {animal && <Button sx={buttonStyle} disabled={disableButtons} onClick={() => searchFilter ? handleFilterClick(index-1) : handleClick(index - 1)}>
                            <ChevronLeftIcon sx={{color: "white"}}/>
                        </Button>}
                    </Grid>
                    <Grid item sx={{marginLeft: 2}}>
                        {animal && <Button sx={buttonStyle} disabled={disableButtons} onClick={() => searchFilter ? handleFilterClick(index + 1) : handleClick(index + 1)}>
                            <ChevronRightIcon sx={{color: "white"}}/>
                        </Button>}
                    </Grid>
                </Grid>
                { adoptSuccess ? <AlertMessage message="Adopt Sucessful" severity="success" reset={setAdoptSuccess}/> : null}
                { adoptFail ? <AlertMessage message="Adopt Fail" severity="error" reset={setAdoptFail}/> : null}
            </Container>
        </>
    );
}