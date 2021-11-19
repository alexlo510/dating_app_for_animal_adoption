import React, { useEffect, useState, Fragment } from 'react';
import Axios from "axios"
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { nanoid } from "nanoid";
import NewsReadRow from '../components/NewsReadRow';
import NewsEditRow from '../components/NewsEditRow';
import { useUserContext } from '../components/UserContext.js';
import FileUploadComponent from '../components/FileUploadComponent';


export default function Admin() {
    const [articles, setArticles] = useState([])
    const [editArticleId, setEditArticleId] = useState(null);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [addFormData, setAddFormData] = useState({
        title: "",
        content: "",
        news_url: "",
        file: "",
    });
    const [editFormData, setEditFormData] = useState({
        title: "",
        content: "",
        news_url: "",
        file: "",
    });
    const { user } = useUserContext();
    const config = {
        headers: { Authorization: `Bearer ${user.accesstoken}` }
    };

    useEffect(() => {
        try {
            fetchArticles();
        } catch (err) {
            console.log(err);
        }
    }, []);

    async function fetchArticles() {
        const res = await Axios.get("https://pet-shelter-api.uw.r.appspot.com/news")
        console.log(res.data); // remove after testing
        setArticles(res.data)
    }

    const handleAddFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...addFormData };
        newFormData[fieldName] = fieldValue;

        setAddFormData(newFormData);
    };

    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    };

    async function handleAddFormSubmit(event) {
        event.preventDefault();

        // 1st call for uploading image and getting img_url
        try {
            const payload = addFormData.file;
            const url = await Axios.post(`https://pet-shelter-api.uw.r.appspot.com/upload`, payload, config)
            console.log(url);
            addFormData.news_url = url;
        } catch (err) {
            console.log("Failed to POST: ", err);
        }

        const newArticle = {
            id: nanoid(),
            title: addFormData.title,
            content: addFormData.content,
            news_url: addFormData.news_url,
        };
        console.log(newArticle); // remove later
        // 2nd call for posting the data
        try {
            const payload = newArticle
            const res = await Axios.post(`https://pet-shelter-api.uw.r.appspot.com/news/`, payload, config)
            console.log(res);
        } catch (err) {
            console.log("Failed to POST: ", err);
        }
        try {
            fetchArticles();
        } catch (err) {
            console.log(err);
        }
    };

    async function handleEditFormSubmit(event) {
        event.preventDefault();

        // 1st call for uploading image and getting img_url
        try {
            const payload = editFormData.file;
            console.log(editFormData.file);
            const url = await Axios.post(`https://pet-shelter-api.uw.r.appspot.com/upload`, payload, config)
            console.log(url);
            editFormData.news_url = url;
        } catch (err) {
            console.log("Failed to upload img: ", err);
        }

        const editedArticle = {
            title: editFormData.title,
            content: editFormData.content,
            news_url: editFormData.news_url,
        };
        const newArticles = [...articles];
        const index = articles.findIndex((article) => article.id === editArticleId);
        console.log("Editting", editArticleId); // remove after testing

        // 2nd call for editting the data
        try {
            const payload = editedArticle
            const res = await Axios.patch(`https://pet-shelter-api.uw.r.appspot.com/news/${editArticleId}`, payload, config)
            console.log(res);

            newArticles[index] = editedArticle;
            setArticles(newArticles);
            setEditArticleId(null);

        } catch (err) {
            console.log("Failed to PATCH: ", err);
        }
    };

    const handleEditClick = (event, article) => {
        event.preventDefault();
        setEditArticleId(article.id);

        const formValues = {
            id: article.id,
            title: article.title,
            content: article.content,
            news_url: article.news_url,
        };
        console.log(formValues);
        setEditFormData(formValues);
    };

    const handleCancelClick = () => {
        setEditArticleId(null);
    };

    async function handleDeleteClick(articleId) {
        console.log("Deleting", articleId); // remove after testing

        const newArticles = [...articles];
        const index = articles.findIndex((article) => article.id === articleId);

        try {
            const res = await Axios.delete(`https://pet-shelter-api.uw.r.appspot.com/news/${articleId}`)
            console.log(res);

            newArticles.splice(index, 1);
            setArticles(newArticles);

        } catch (err) {
            console.log("Failed to DELETE: ", err);
        }
    }

    const handleChangePage = (_event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        console.log(rowsPerPage);
    };

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - articles.length) : 0;

    return (
        <>
            <br />
            <Container>
                <form onSubmit={handleEditFormSubmit}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Title</TableCell>
                                    <TableCell align="left">Content</TableCell>
                                    <TableCell align="left">File/URL</TableCell>
                                    <TableCell align="right" />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(rowsPerPage > 0
                                    ? articles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : articles
                                ).map((article) => (
                                    <Fragment>
                                        {editArticleId === article.id ? (
                                            <NewsEditRow
                                                formData={editFormData}
                                                handleChange={handleEditFormChange}
                                                handleCancelClick={handleCancelClick}
                                            />
                                        ) : (
                                            <NewsReadRow
                                                article={article}
                                                handleEditClick={handleEditClick}
                                                handleDeleteClick={handleDeleteClick}
                                            />
                                        )}
                                    </Fragment>
                                ))}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 53 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={articles.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableContainer>
                </form>
                <br />
                <h2>Add an Article</h2>
                <form onSubmit={handleAddFormSubmit}>
                    <input
                        required
                        type="text"
                        name="title"
                        placeholder="Enter a title..."
                        onChange={handleAddFormChange}
                    />
                    <input
                        required
                        type="text"
                        name="content"
                        placeholder="Enter content..."
                        onChange={handleAddFormChange}
                    />
                    <input
                        //required
                        type="file"
                        name="file"
                        accept="image/*"
                        onChange={e => {
                            const file = e.target.files[0]
                            setAddFormData({ ...addFormData, file: file })
                        }}
                    />
                    <Button type="submit" color="primary" variant="contained">Add</Button>
                </form>
            </Container>
        </>
    );
}
