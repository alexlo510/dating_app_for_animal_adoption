import React from "react";

const ReadOnlyRow = ({ animal, handleEditClick, handleDeleteClick }) => {
    return (
        <tr>
            <td>{animal.name}</td>
            <td>{animal.type}</td>
            <td>{animal.breed}</td>
            <td>{animal.availability}</td>
            <td>{animal.Description}</td>
            <td>{animal.Disposition}</td>
            <td>
                <button
                    type="button"
                    onClick={(event) => handleEditClick(event, animal)}
                >
                    Edit
        </button>
                <button type="button" onClick={() => handleDeleteClick(animal.id)}>
                    Delete
        </button>
            </td>
        </tr>
    );
};

export default ReadOnlyRow;
