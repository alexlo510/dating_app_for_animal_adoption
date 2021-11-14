import React, { useEffect, useState, Fragment } from 'react';
import Axios from "axios"
import { nanoid } from "nanoid";
import { Container } from '@mui/material/';
import NewsReadRow from '../components/NewsReadRow';
import NewsEditRow from '../components/NewsEditRow';


export default function Admin() {
    const [articles, setArticles] = useState([])
    const [editArticleId, setEditArticleId] = useState(null);
    const [addFormData, setAddFormData] = useState({
        title: "",
        content: "",
        news_url: "",
    });
    const [editFormData, setEditFormData] = useState({
        title: "",
        content: "",
        news_url: "",
    });

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

        const newArticle = {
            id: nanoid(),
            title: addFormData.title,
            content: addFormData.content,
            news_url: addFormData.news_url,
        };

        try {
            const payload = newArticle
            const res = await Axios.post(`https://pet-shelter-api.uw.r.appspot.com/news/`, payload)
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

        const editedArticle = {
            title: editFormData.title,
            content: editFormData.content,
            news_url: editFormData.news_url,
        };

        const newArticles = [...articles];
        const index = articles.findIndex((article) => article.id === editArticleId);
        console.log("Editting", editArticleId); // remove after testing

        try {
            const payload = editedArticle
            const res = await Axios.patch(`https://pet-shelter-api.uw.r.appspot.com/news/${editArticleId}`, payload)
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

    return (
        <>
            <Container>
                <form onSubmit={handleEditFormSubmit}>
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Content</th>
                                <th>URL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {articles.map((article) => (
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
                        </tbody>
                    </table>
                </form>
            </Container>

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
                    required
                    type="text"
                    name="news_url"
                    placeholder="Enter a URL"
                    onChange={handleAddFormChange}
                />
                <button type="submit">Add</button>
            </form>
        </>
    );
}
