import React, {useState} from 'react';
import { Button, FormControl, Grid, InputLabel, MenuItem, TextField, Select, Typography } from '@mui/material/';

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
    minWidth: 125,}

export default function AdoptionSearchBar() {

    const [type, setType] = useState('')
    const [breed, setBreed] = useState('')
    const [disposition, setDisposition] = useState('')


    function handleSubmit(){

    }

    return (
        <>
            <Grid container justifyContent="center">
                <Grid item sx={{display:"flex"}}>
                    <form onSubmit={handleSubmit}>
                        <TextField 
                            onChange={(e) => setType(e.target.value)}
                            variant="standard" name="type" label="Type" sx={textFieldStyle}
                        />
                        <TextField 
                            onChange={(e) => setBreed(e.target.value)}
                            variant="standard" name="breed" label="Breed" sx={textFieldStyle}
                        />
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
                        <Button type="submit" color="primary" variant="contained" sx={buttonStyle}>Search</Button>
                    </form>
                </Grid>
            </Grid>
        </>
    );
}