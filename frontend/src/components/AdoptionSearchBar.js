import React, {useState} from 'react';
import { Button, FormControl, Grid, InputLabel, MenuItem, TextField, Select } from '@mui/material/';
import { animalTypes, animalBreeds, disposition } from '../components/ProfilePropertiesLists.js';

const textFieldStyle = {
    marginRight: 2,
    marginTop: 1,
}

const buttonStyle = {
    marginTop: 2,
}

const selectStyle = {
    marginRight: 2,
    marginTop: 1,
    minWidth: 125,
    maxWidth: 125,
}

const dateStyle = {
    width: 180,
    marginTop: 1,
    marginRight: 2,
}

export default function AdoptionSearchBar() {

    const [type, setType] = useState('')
    const [breed, setBreed] = useState('')
    const [disposition, setDisposition] = useState('')
    const [date, setDate] = useState('')


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(type, breed, disposition, date);
        // call a function on the adopt page, passing in these parameters? 
    }

    return (
        <>
            <Grid container justifyContent="center">
                <Grid item sx={{display:"flex"}}>
                    <form onSubmit={handleSubmit}>
                        <FormControl sx={selectStyle}>
                            <InputLabel id="selectLabel">Type</InputLabel>
                            <Select
                                labelId= "selectLabel"
                                value={type}
                                label="Type"
                                variant="standard"
                                onChange={(e) => setType(e.target.value)}
                            >
                                <MenuItem value=""><span>None</span></MenuItem>
                                {animalTypes.map((animalType) => (
                                <MenuItem value={animalType}>{animalType}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={selectStyle}>
                            <InputLabel id="selectLabel">Breed</InputLabel>
                            <Select
                                labelId= "selectLabel"
                                value={breed}
                                label="Type"
                                variant="standard"
                                onChange={(e) => setBreed(e.target.value)}
                            >
                                <MenuItem value=""><span>None</span></MenuItem>
                                {animalBreeds.map((animalBreed) => (
                                <MenuItem value={animalBreed}>{animalBreed}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={selectStyle}>
                            <InputLabel id="selectLabel">Disposition</InputLabel>
                            <Select
                                labelId= "selectLabel"
                                value={disposition}
                                label="Disposition"
                                variant="standard"
                                onChange={(e) => setDisposition(e.target.value)}
                            >
                                <MenuItem value=""><span>None</span></MenuItem>
                                <MenuItem value={"Good with other animals"}>Good with other Animals</MenuItem>
                                <MenuItem value={"Good with children"}>Good with Children</MenuItem>
                                <MenuItem value={"Animals must be leashed at all times"}>Animals Must Be Leashed at All Times</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Date Created"
                            type="date"
                            sx={dateStyle}
                            InputLabelProps={{
                            shrink: true,
                            }}
                            onChange={(e) => setDate(e.target.value)}
                        />
                        <Button type="submit" color="primary" variant="contained" sx={buttonStyle}>Search</Button>
                    </form>
                </Grid>
            </Grid>
        </>
    );
}