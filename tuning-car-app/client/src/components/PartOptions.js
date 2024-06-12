import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PartOptions({ partId }) {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        if (partId) {
            const [part, modelId] = partId.split(':');
            const endpoint = part === 'all'
                ? `http://localhost:3003/api/cars/all-part-options/${modelId}`
                : `http://localhost:3003/api/cars/part-options/${partId}`;

            axios.get(endpoint)
                .then(response => {
                    setOptions(response.data);
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        } else {
            setOptions([]);
        }
    }, [partId]);

    return (
        <div>
            <h2>Select Part Option:</h2>
            <ul>
                {options.map(option => (
                    <li key={option.name} style={{ marginBottom: '20px' }}>
                        <img src={option.imageUrl} alt={option.name} />
                        <p>{option.name}</p>
                        <a href={option.purchaseUrl} target="_blank" rel="noopener noreferrer">Buy Now</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PartOptions;
