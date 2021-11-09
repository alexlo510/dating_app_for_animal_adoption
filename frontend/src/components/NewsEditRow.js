import { Button, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from '@mui/material/';
import React from 'react';


const EditableRow = ({
    formData,
    handleChange,
    handleCancelClick,
    handleReplaceImage
}) => {
    const fileInput = React.useRef(null);

    const handleReplaceImageButtonClick = event => {
        fileInput.current.click();
    };

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
                    disabled  // added disabled
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
                <label htmlFor="replace_image">
                    <input
                        style={{ display: 'none' }}
                        ref={fileInput}
                        id="replace_image"
                        name="replace_image"
                        type="file"
                        accept="image/*"
                        onChange={e => {
                            const file = e.target.files[0]
                            if (file != null) {
                                handleReplaceImage(file, formData.id)
                            }
                        }}
                    />
                    <button type="button" onClick={handleReplaceImageButtonClick}>
                        Replace Image
                    </button>
                </label>
                <button type="button" onClick={handleCancelClick}>Cancel</button>
            </td>
        </tr>
    );
};

export default EditableRow;
