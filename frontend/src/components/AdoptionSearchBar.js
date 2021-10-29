import React, {useState} from 'react';
import { Button, Checkbox, FormControl, Grid, InputLabel, ListItemText, MenuItem, OutlinedInput, TextField, Select } from '@mui/material/';
import { animalTypes, animalBreeds, dispositions } from '../components/ProfilePropertiesLists.js';

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: {lg: 325, md: 325, sm: 325, xs: 250},
    },
  },
};

export default function AdoptionSearchBar() {

    const [type, setType] = useState('')
    const [breed, setBreed] = useState('')
    const [disposition, setDisposition] = useState([])
    const [date, setDate] = useState('')


    const handleSubmit = (e) => {
        e.preventDefault()
        // change disposition to an object?
        let dispositionObject = {}
        dispositions.forEach((key) => {
            disposition.includes(key) ? dispositionObject[key] = true : dispositionObject[key] = false
        });

        console.log(dispositionObject);

        console.log({type, breed, disposition, date});
        // call a function on the adopt page, passing in these parameters? 
    }

    const handleDisposition = (event) => {
        const {
            target: { value },
          } = event;
          setDisposition(
            // On autofill we get a the stringified value.
            typeof value === 'string' ? value.split(',') : value,
          );
    }

    return (
        <>
            <Grid container justifyContent="center">
                    <Grid item>
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
                    </Grid>
                    <Grid item>
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
                    </Grid>
                    <Grid item>
                        <FormControl sx={{ m: 1, width: {lg: 325, md: 325, sm: 325, xs: 250}}}>
                            <InputLabel id="dispositionLabel">Disposition</InputLabel>
                            <Select
                            labelId="dispositionLabel"
                            id="disposition"
                            multiple
                            value={disposition}
                            onChange={handleDisposition}
                            input={<OutlinedInput label="Disposition" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                            >
                            {dispositions.map((item) => (
                                <MenuItem key={item} value={item}>
                                    <Checkbox checked={disposition.indexOf(item) > -1} />
                                    <ListItemText primary={item} />
                                </MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                    </Grid>
                        {/* <FormControl sx={selectStyle}>
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
                        </FormControl> */}
                    <Grid item>
                        <TextField
                            label="Date Created"
                            type="date"
                            sx={dateStyle}
                            InputLabelProps={{
                            shrink: true,
                            }}
                            onChange={(e) => setDate(e.target.value)}
                        />
                        <Button type="submit" color="primary" variant="contained" sx={buttonStyle} onClick={handleSubmit}>Search</Button>
                    </Grid>
            </Grid>
        </>
    );
}