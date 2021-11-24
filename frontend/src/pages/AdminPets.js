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
    const config = {
        headers: { Authorization: `Bearer ${user.accesstoken}` }
    };

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

    const handleAddFormChange = event => {
        event.preventDefault();

        const { value, name } = event.target;
        const newFormData = { ...addFormData };
        newFormData[name] = value;

        setAddFormData(newFormData);
        console.log(newFormData); // remove after testing
    };

    const handleEditFormChange = (event) => {
        event.preventDefault();

        const { value, name } = event.target;
        const newFormData = { ...editFormData };
        newFormData[name] = value;

        setEditFormData(newFormData);
        console.log(newFormData); // remove after testing
    };

    async function handleAddFormSubmit(event) {
        event.preventDefault();

        // 1st call for uploading image and getting img_url
        try {
            const payload = addFormData.file;
            const url = await Axios.post(`https://pet-shelter-api.uw.r.appspot.com/pets/`, payload, config)
            console.log(url);
            addFormData.url = url;

        } catch (err) {
            console.log("Failed to upload img: ", err);
        }

        const newAnimal = {
            availability: addFormData.availability,
            breed: addFormData.breed,
            description: addFormData.description,
            disposition: addFormData.disposition,
            name: addFormData.name,
            type: addFormData.type,
            file: addFormData.file,
        };

        // 2nd call for editting the data
        try {
            console.log("POST: ", newAnimal); // remove after testing
            const payload = newAnimal
            const res = await Axios.post(`https://pet-shelter-api.uw.r.appspot.com/pets/`, payload, config)
            console.log(res);

        } catch (err) {
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

        // 1st call for uploading image and getting img_url
        try {
            const payload = editFormData.file;
            const url = await Axios.patch(`https://pet-shelter-api.uw.r.appspot.com/upload`, payload, config)
            console.log(url);
            editFormData.picture_url = url;
        } catch (err) {
            console.log("Failed to upload image: ", err);
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
            console.log("Index: ", index); // remove after testing
            console.log("PATCH: ", editAnimalId); // remove after testing
            const payload = editedAnimal
            const res = await Axios.patch(`https://pet-shelter-api.uw.r.appspot.com/pets/${editAnimalId}`, payload, config)
            console.log(res);

            newAnimals[index] = editedAnimal;
            setAnimals(newAnimals);
            setEditAnimalId(null);

        } catch (err) {
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

        const newAnimals = [...animals];
        const index = animals.findIndex((animal) => animal.id === animalId);

        try {
            const res = await Axios.delete(`https://pet-shelter-api.uw.r.appspot.com/pets/${animalId}`)
            console.log(res);

            console.log("Deleting", animalId); // remove after testing

            newAnimals.splice(index, 1);
            setAnimals(newAnimals);

        } catch (err) {
            console.log("Failed to DELETE: ", err);
        }
    }

    function handleAddImage(event) {
        const file = event.target.files[0]
        setAddFormData({ ...addFormData, file: file })
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
