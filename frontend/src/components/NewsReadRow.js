import React from "react";

const ReadOnlyRow = ({ article, handleEditClick, handleDeleteClick }) => {
    return (
        <tr>
            <td>{article.title}</td>
            <td>{article.content}</td>
            <td>{article.news_url}</td>
            <td>
                <button
                    type="button"
                    onClick={(event) => handleEditClick(event, article)}
                >
                    Edit
        </button>
                <button type="button" onClick={() => handleDeleteClick(article.id)}>
                    Delete
        </button>
            </td>
        </tr>
    );
};

export default ReadOnlyRow;
