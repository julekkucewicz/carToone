import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CarPart({ modelId, onPartChange }) {
    const [parts, setParts] = useState([]);

    useEffect(() => {
        if (modelId) {
            axios.get(`http://localhost:3003/api/cars/parts/${modelId}`)
                .then(response => {
                    setParts(response.data);
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        } else {
            setParts([]);
        }
    }, [modelId]);

    return (
        <div>
            <h2>Select Car Part to Tune:</h2>
            <select onChange={e => onPartChange(e.target.value)} disabled={!modelId}>
                <option value="">Select a part</option>
                <option value={`all:${modelId}`}>All Parts</option>
                {parts.map(part => (
                    <option key={part.id} value={part.id}>{part.name}</option>
                ))}
            </select>
        </div>
    );
}

export default CarPart;
