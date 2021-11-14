import { Button, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from '@mui/material/';
import React from 'react';


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
                    placeholder="Enter a title..."
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                ></input>
            </td>
            <td>
                <input
                    required
                    type="text"
                    placeholder="Enter content..."
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                ></input>
            </td>
            <td>
                <input
                    required
                    type="text"
                    placeholder="Enter a URL..."
                    name="news_url"
                    value={formData.news_url}
                    onChange={handleChange}
                ></input>
            </td>
            <td>
                <button type="submit">Save</button>
                <button type="button" onClick={handleCancelClick}>Cancel</button>
            </td>
        </tr>
    );
};

export default EditableRow;
