import { Button, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from '@mui/material/';
import React from 'react';
import { animalBreeds, animalTypes, availability, dispositions } from '../components/ProfilePropertiesLists.js';


const selectStyle = {
    marginRight: 2,
    marginTop: 1,
    minWidth: 125,
    maxWidth: 125,
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 325,
        },
    },
};

const EditableRow = ({
    formData,
    handleChange,
    handleCancelClick,
}) => {
    return (
        <tr>
            <td>
                <input
                    required
                    type="text"
                    placeholder="Enter a name..."
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                ></input>
            </td>
            <td>
                <FormControl sx={selectStyle}>
                    <InputLabel id="selectLabel">Type</InputLabel>
                    <Select
                        required
                        name="type"
                        labelId="selectLabel"
                        value={formData.type}
                        label="Type"
                        variant="standard"
                        onChange={handleChange}
                    >
                        <MenuItem value=""><span>None</span></MenuItem>
                        {animalTypes.map((animalType) => (
                            <MenuItem value={animalType}>{animalType}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </td>
            <td>
                <FormControl sx={selectStyle}>
                    <InputLabel id="selectLabel">Breed</InputLabel>
                    <Select
                        required
                        name="breed"
                        labelId="selectLabel"
                        value={formData.breed}
                        label="Type"
                        variant="standard"
                        onChange={handleChange}
                    >
                        <MenuItem value=""><span>None</span></MenuItem>
                        {animalBreeds.map((animalBreed) => (
                            <MenuItem value={animalBreed}>{animalBreed}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </td>
            <td>
                <input
                    //required
                    type="text"
                    placeholder="Enter a description..."
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                ></input>
            </td>
            <td>
                <FormControl sx={{ m: 1, width: 325 }}>
                    <InputLabel id="dispositionLabel">Disposition</InputLabel>
                    <Select
                        //required
                        name="disposition"
                        labelId="dispositionLabel"
                        id="disposition"
                        multiple
                        value={formData.disposition}
                        onChange={handleChange}
                        input={<OutlinedInput label="Disposition" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                    >
                        {dispositions.map((item) => (
                            <MenuItem key={item} value={item}>
                                <Checkbox checked={formData.disposition.indexOf(item) > -1} />
                                <ListItemText primary={item} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </td>
            <td>
                <FormControl sx={selectStyle}>
                    <InputLabel id="selectLabel">Availability</InputLabel>
                    <Select
                        required
                        name="availability"
                        labelId="selectLabel"
                        value={formData.availability}
                        label="Type"
                        variant="standard"
                        onChange={handleChange}
                    >
                        <MenuItem value=""><span>None</span></MenuItem>
                        {availability.map((availability) => (
                            <MenuItem value={availability}>{availability}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </td>
            <td>
                <button type="submit">Save</button>
                <button type="button" onClick={handleCancelClick}>Cancel</button>
            </td>
        </tr>
    );
};

export default EditableRow;
