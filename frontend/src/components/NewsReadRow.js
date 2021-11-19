import React from "react";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const ReadOnlyRow = ({ article, handleEditClick, handleDeleteClick }) => {
    return (
        <TableRow key={article.name}>
            <TableCell>
                {article.title}
            </TableCell>
            <TableCell style={{ width: 160 }}>
                {article.content}
            </TableCell>
            <TableCell style={{ width: 160 }}>
                {article.news_url}
            </TableCell>
            <TableCell>
                <button type="button" onClick={(event) => handleEditClick(event, article)}>Edit</button>
            </TableCell>
            <TableCell>
                <button type="button" onClick={() => handleDeleteClick(article.id)}>Delete</button>
            </TableCell>
        </TableRow >
    );
};

export default ReadOnlyRow;
