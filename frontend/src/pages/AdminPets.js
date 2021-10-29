import { Container } from '@mui/material/';
import Axios from "axios";
import { nanoid } from "nanoid";
import React, { Fragment, useEffect, useState } from 'react';
import PetForm from '../components/PetForm';
import AnimalReadRow from '../components/AnimalReadRow';
import AnimalEditRow from '../components/AnimalEditRow';

export default function AdminPets() {
    const [animals, setAnimals] = useState([])
    const [editAnimalId, setEditAnimalId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        availability: "",
        breed: "",
        description: "",
        disposition: [],
        name: "",
        type: "",
    });
    const [addFormData, setAddFormData] = useState({
        availability: "",
        breed: "",
        description: "",
        disposition: [],
        name: "",
        type: "",
    });

    useEffect(() => {
        try {
            async function fetchAnimal() {
                const res = await Axios.get("https://pet-shelter-api.uw.r.appspot.com/pets")
                console.log(res.data); // remove after testing
                setAnimals(res.data)
            }
            fetchAnimal();
        } catch (err) {
            console.log(err);
        }
    }, []);

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

        const newAnimal = {
            id: nanoid(),
            availability: addFormData.availability,
            breed: addFormData.breed,
            description: addFormData.description,
            disposition: addFormData.disposition,
            name: addFormData.name,
            type: addFormData.type,
        };

        try {
            const payload = newAnimal
            const res = await Axios.post(`https://pet-shelter-api.uw.r.appspot.com/pets/`, payload)
            console.log(res);

            const newAnimals = [...animals, newAnimal];
            setAnimals(newAnimals);

        } catch (err) {
            console.log("Failed to POST: ", err);
        }
    };

    async function handleEditFormSubmit(event) {
        event.preventDefault();

        const editedAnimal = {
            availability: editFormData.availability,
            breed: editFormData.breed,
            description: editFormData.description,
            disposition: editFormData.disposition,
            name: editFormData.name,
            type: editFormData.type,
        };

        const newAnimals = [...animals];
        const index = animals.findIndex((animal) => animal.id === editAnimalId);
        console.log("Editting", editAnimalId); // remove after testing

        try {
            const payload = editedAnimal
            const res = await Axios.patch(`https://pet-shelter-api.uw.r.appspot.com/pets/${editAnimalId}`, payload)
            console.log(res);

            newAnimals[index] = editedAnimal;
            setAnimals(newAnimals);
            setEditAnimalId(null);

        } catch (err) {
            console.log("Failed to PATCH: ", err);
        }
    };

    const handleEditClick = (event, animal) => {
        event.preventDefault();
        setEditAnimalId(animal.id);

        const formValues = {
            availability: animal.availability,
            breed: animal.breed,
            description: animal.description,
            disposition: animal.disposition,
            name: animal.name,
            type: animal.type,
        };

        setEditFormData(formValues);
    };

    const handleCancelClick = () => {
        setEditAnimalId(null);
    };

    async function handleDeleteClick(animalId) {
        console.log("Deleting", animalId); // remove after testing

        const newAnimals = [...animals];
        const index = animals.findIndex((animal) => animal.id === animalId);

        try {
            const res = await Axios.delete(`https://pet-shelter-api.uw.r.appspot.com/pets/${animalId}`)
            console.log(res);

            newAnimals.splice(index, 1);
            setAnimals(newAnimals);

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
                                <th>Name</th>
                                <th>Type</th>
                                <th>Breed</th>
                                <th>Discription</th>
                                <th>Disposition</th>
                                <th>Availability</th>
                            </tr>
                        </thead>
                        <tbody>
                            {animals.map((animal) => (
                                <Fragment>
                                    {editAnimalId === animal.id ? (
                                        <>
                                            <AnimalEditRow
                                                formData={editFormData}
                                                handleFormChange={handleEditFormChange}
                                                handleCancelClick={handleCancelClick}
                                            />
                                        </>
                                    ) : (
                                        <AnimalReadRow
                                            animal={animal}
                                            handleEditClick={handleEditClick}
                                            handleDeleteClick={handleDeleteClick}
                                        />
                                    )}
                                </Fragment>
                            ))}
                        </tbody>
                    </table>
                </form>
                <h2>Add an Animal</h2>
                <PetForm
                    formData={addFormData}
                    handleChange={handleAddFormChange}
                    handleSubmit={handleAddFormSubmit}
                />
            </Container>
        </>
    );
}
