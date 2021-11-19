import { Button, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from '@mui/material/';
import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';


const EditableRow = ({
    formData,
    handleChange,
    handleCancelClick,
}) => {
    const fileInput = React.useRef(null);

    const handleReplaceImageButtonClick = event => {
        fileInput.current.click();
    };

    return (
        <TableRow>
            <TableCell>
                <input
                    required
                    type="text"
                    placeholder="Enter a title..."
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                ></input>
            </TableCell>
            <TableCell>
                <input
                    required
                    type="text"
                    placeholder="Enter content..."
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                ></input>
            </TableCell>
            <TableCell>
                <input
                    disabled  // added disabled
                    required
                    type="text"
                    placeholder=""
                    name="news_url"
                    value={formData.news_url}
                    onChange={handleChange}
                ></input>
            </TableCell>
            <TableCell>
                <label htmlFor="replace_image">
                    <input
                        style={{ display: 'none' }}
                        ref={fileInput}
                        id="replace_image"
                        name="file"
                        type="file"
                        accept="image/*"
                        onChange={handleChange}
                    />
                    <button
                        type="button"
                        onClick={handleReplaceImageButtonClick}>
                        Replace Image
                    </button>
                    {formData.file && <span>{formData.file.name}</span>}
                </label>
            </TableCell>
            <TableCell>
                <button type="submit">Save</button>
                <button type="button" onClick={handleCancelClick}>Cancel</button>
            </TableCell>
        </TableRow >
    );
};

export default EditableRow;
