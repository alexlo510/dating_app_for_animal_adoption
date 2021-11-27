import React from "react";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const ReadOnlyRow = ({ animal, handleEditClick, handleDeleteClick }) => {
    return (
        <TableRow key={animal.name}>
            <TableCell style={{ width: 200 }}>
                {animal.name}
            </TableCell>
            <TableCell style={{ width: 200 }}>
                {animal.type}
            </TableCell>
            <TableCell style={{ width: 200 }}>
                {animal.breed}
            </TableCell>
            <TableCell style={{ width: 200 }}>
                {animal.description}
            </TableCell>
            <TableCell style={{ width: 400 }}>
                {animal.disposition.join('\r\n')}
            </TableCell>
            <TableCell style={{ width: 200 }}>
                {animal.availability}
            </TableCell>
            <TableCell style={{ width: 200 }}>
                {animal.adoptedby}
            </TableCell>
            <TableCell>
                <button type="button" onClick={(event) => handleEditClick(event, animal)}>Edit</button>
            </TableCell>
            <TableCell>
                <button type="button" onClick={() => handleDeleteClick(animal.id)}>Delete</button>
            </TableCell>
        </TableRow >
    );
};

export default ReadOnlyRow;