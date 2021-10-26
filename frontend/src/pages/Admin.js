import React, { useEffect, useState, Fragment } from 'react';
import Axios from "axios"
import { nanoid } from "nanoid";
import { Container } from '@mui/material/';
import RowReadOnly from "../components/RowReadOnly";
import RowEditable from "../components/RowEditable";


export default function Admin() {
    const [animals, setAnimals] = useState([])

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

    const [addFormData, setAddFormData] = useState({
        availability: "",
        breed: "",
        description: "",
        disposition: "",
        name: "",
        type: "",
    });

    const [editFormData, setEditFormData] = useState({
        availability: "",
        breed: "",
        description: "",
        disposition: "",
        name: "",
        type: "",
    });

    const [editAnimalId, setEditAnimalId] = useState(null);

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

    async function handleAddFormSubmit(event){
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
                                        <RowEditable
                                            editFormData={editFormData}
                                            handleEditFormChange={handleEditFormChange}
                                            handleCancelClick={handleCancelClick}
                                        />
                                    ) : (
                                        <RowReadOnly
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
            </Container>

            <h2>Add an Animal</h2>
            <form onSubmit={handleAddFormSubmit}>
                <input
                    type="text"
                    name="name"
                    required="required"
                    placeholder="Enter a name..."
                    onChange={handleAddFormChange}
                />
                <input
                    type="text"
                    name="type"
                    required="required"
                    placeholder="Enter a type..."
                    onChange={handleAddFormChange}
                />
                <input
                    type="text"
                    name="breed"
                    required="required"
                    placeholder="Enter a breed..."
                    onChange={handleAddFormChange}
                />
                <input
                    type="text"
                    name="description"
                    //required="required"
                    placeholder="Enter a description..."
                    onChange={handleAddFormChange}
                />
                <input
                    type="text"
                    name="disposition"
                    required="required"
                    placeholder="Enter a disposition..."
                    onChange={handleAddFormChange}
                />
                <input
                    type="text"
                    name="availability"
                    required="required"
                    placeholder="Enter availability..."
                    onChange={handleAddFormChange}
                />
                <button type="submit">Add</button>
            </form>
        </>
    );
}