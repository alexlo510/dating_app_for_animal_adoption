import React, { useEffect, useState, Fragment } from 'react';
import Axios from "axios";
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
import PetForm from '../components/PetForm';
import AnimalReadRow from '../components/AnimalReadRow';
import AnimalEditRow from '../components/AnimalEditRow';
import { useUserContext } from '../components/UserContext.js';

export default function AdminPets() {
    const [animals, setAnimals] = useState([])
    const [editAnimalId, setEditAnimalId] = useState(null);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [addFormData, setAddFormData] = useState({
        availability: "",
        breed: "",
        description: "",
        disposition: [],
        name: "",
        type: "",
        picture_url: "",
        file: "",
    });
    const [editFormData, setEditFormData] = useState({
        availability: "",
        breed: "",
        description: "",
        disposition: [],
        name: "",
        type: "",
        picture_url: "",
        file: "",
        adoptedby: "",
    });
    const { user } = useUserContext();

    useEffect(() => {
        try {
            fetchAnimal();
        } catch (err) {
            console.log(err);
        }
    }, []);

    const handleChangePage = (_event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        console.log(rowsPerPage);
    };

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - animals.length) : 0;

    async function fetchAnimal() {
        const res = await Axios.get("https://pet-shelter-api.uw.r.appspot.com/pets")
        console.log(res.data); // remove after testing
        setAnimals(res.data)
    }

    const handleAddFormChange = (event) => {
        event.preventDefault();

        const { value, name } = event.target;
        const newFormData = { ...addFormData };
        newFormData[name] = value;

        setAddFormData(newFormData);
        console.log(newFormData); // remove after testing
    };

        const handleEditFormChange = (event) => {
            event.preventDefault();

            let fieldValue = "";
            let fieldName = "";
            if (event.target.name === "type"){
                fieldName = "type"
            } else if (event.target.name === "breed") {
                fieldName = "breed"
            } else if (event.target.name === "disposition") {
                fieldName = "disposition"
            } else if (event.target.name === "availability") {
                fieldName = "availability"
            } else {
                fieldName = event.target.getAttribute("name");
            }

            if (fieldName === "file") {
                fieldValue = event.target.files[0]
            } else {
                fieldValue = event.target.value;
            }
            const newFormData = { ...editFormData };
            newFormData[fieldName] = fieldValue;

            setEditFormData(newFormData);
        };

        async function handleAddFormSubmit(event) {
            event.preventDefault();

            const config = {
                headers: { Authorization: `Bearer ${user.accesstoken}` }
            };

            // 1st call for uploading image and getting img_url
            if (addFormData.file) {
                try {
                    const payload = new FormData()
                    // append additional data here if needed
                    payload.append("file", addFormData.file);
                    const res = await Axios.post(`https://pet-shelter-api.uw.r.appspot.com/upload`, payload, config)
                    const url = res.data.image_url
                    console.log(url);
                    addFormData.picture_url = url;
                } catch (err) {
                    errorCatch(err);
                    console.log("Failed to POST: ", err);
                }
            }

            const newAnimal = {
                availability: addFormData.availability,
                breed: addFormData.breed,
                description: addFormData.description,
                disposition: addFormData.disposition,
                name: addFormData.name,
                type: addFormData.type,
                file: addFormData.file,
                picture_url: addFormData.picture_url,
            };

            // 2nd call for editting the data
            try {
                console.log("POST: ", newAnimal); // remove after testing
                const payload = newAnimal
                const res = await Axios.post(`https://pet-shelter-api.uw.r.appspot.com/pets/`, payload, config)
                console.log(res);

            } catch (err) {
                errorCatch(err);
                console.log("Failed to POST: ", err);
            }
            try {
                fetchAnimal();
            } catch (err) {
                console.log(err);
            }
        };

        async function handleEditFormSubmit(event) {
            event.preventDefault();

            const config = {
                headers: { Authorization: `Bearer ${user.accesstoken}` }
            };

            // 1st call for uploading image and getting img_url
            if (editFormData.file) {
                try {
                    const payload = new FormData()
                    // append additional data here if needed
                    payload.append("file", editFormData.file);
                    const res = await Axios.post(`https://pet-shelter-api.uw.r.appspot.com/upload`, payload, config)
                    const url = res.data.image_url
                    console.log(url);
                    editFormData.picture_url = url;
                } catch (err) {
                    errorCatch(err);
                    console.log("Failed to upload img: ", err);
                }
            }

            const editedAnimal = {
                id: editAnimalId,
                availability: editFormData.availability,
                breed: editFormData.breed,
                description: editFormData.description,
                disposition: editFormData.disposition,
                name: editFormData.name,
                type: editFormData.type,
                picture_url: editFormData.picture_url,
                adoptedby: editFormData.adoptedby,
            };

            const newAnimals = [...animals];
            const index = animals.findIndex((animal) => animal.id === editAnimalId);

            // 2nd call for editting the data
            try {
                const payload = editedAnimal
                const res = await Axios.patch(`https://pet-shelter-api.uw.r.appspot.com/pets/${editAnimalId}`, payload, config)
                console.log(res);

                newAnimals[index] = editedAnimal;
                setAnimals(newAnimals);
                setEditAnimalId(null);

            } catch (err) {
                errorCatch(err);
                console.log("Failed to PATCH: ", err);
            }
            console.log("Animals: ", animals); // remove after testing
        };

        const handleEditClick = (event, animal) => {
            console.log("Animal: ", animal); // remove after testing
            console.log("AnimalID: ", animal.id);

            event.preventDefault();
            setEditAnimalId(animal.id);
            console.log("editAnimalId: ", editAnimalId); // remove after testing

            const formValues = {
                availability: animal.availability,
                breed: animal.breed,
                description: animal.description,
                disposition: animal.disposition,
                name: animal.name,
                type: animal.type,
                adoptedby: animal.adoptedby,
            };

            setEditFormData(formValues);
        };

        const handleCancelClick = () => {
            setEditAnimalId(null);
            console.log("Animals: ", animals); // remove after testing
        };

        async function handleDeleteClick(animalId) {
            const config = {
                headers: { Authorization: `Bearer ${user.accesstoken}` }
            };

            const newAnimals = [...animals];
            const index = animals.findIndex((animal) => animal.id === animalId);

            try {
                const res = await Axios.delete(`https://pet-shelter-api.uw.r.appspot.com/pets/${animalId}`, config)
                console.log(res);

                console.log("Deleting", animalId); // remove after testing

                newAnimals.splice(index, 1);
                setAnimals(newAnimals);

            } catch (err) {
                errorCatch(err);
                console.log("Failed to DELETE: ", err);
            }
        }

        function handleAddImage(event) {
            const file = event.target.files[0]
            setAddFormData({ ...addFormData, file: file })
        }

        function errorCatch(err) {
            if (err.response.status === 401) {
                sessionStorage.clear()
                //localStorage.clear()
                window.location.href = '/login';

            }
        }

        return (
            <>
                <br />
                <Container>
                    <form onSubmit={handleEditFormSubmit}>
                        <TableContainer component={Paper}>
                            <Table style={{ whiteSpace: 'pre-wrap' }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell align="left">Type</TableCell>
                                        <TableCell align="left">Breed</TableCell>
                                        <TableCell align="left">Discription</TableCell>
                                        <TableCell align="left">Disposition</TableCell>
                                        <TableCell align="left">Availability</TableCell>
                                        <TableCell align="left">Adopted By</TableCell>
                                        <TableCell align="right" />
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(rowsPerPage > 0
                                        ? animals.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : animals
                                    ).map((animal) => (
                                        <Fragment>
                                            {editAnimalId === animal.id ? (
                                                <AnimalEditRow
                                                    formData={editFormData}
                                                    handleChange={handleEditFormChange}
                                                    handleCancelClick={handleCancelClick}
                                                />
                                            ) : (
                                                <AnimalReadRow
                                                    animal={animal}
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
                                count={animals.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableContainer>
                    </form>
                    <br />
                    <h2>Add an Animal</h2>
                    <PetForm
                        formData={addFormData}
                        handleImage={handleAddImage}
                        handleChange={handleAddFormChange}
                        handleSubmit={handleAddFormSubmit}
                    />
                </Container>
            </>
        );
    }
