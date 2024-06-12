import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CarModel({ make, onModelChange }) {
    const [models, setModels] = useState([]);

    useEffect(() => {
        if (make) {
            axios.get(`http://localhost:3003/api/cars/models/${make}`)
                .then(response => {
                    setModels(response.data);
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        } else {
            setModels([]);
        }
    }, [make]);

    const handleModelChange = (e) => {
        const selectedModel = models.find(model => model.id === parseInt(e.target.value));
        onModelChange(selectedModel ? selectedModel.name : '', selectedModel ? selectedModel.id : '');
    };

    return (
        <div>
            <h2>Select Car Model:</h2>
            <select onChange={handleModelChange} disabled={!make}>
                <option value="">Select a model</option>
                {models.map(model => (
                    <option key={model.id} value={model.id}>{model.name}</option>
                ))}
            </select>
        </div>
    );
}

export default CarModel;
