import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CarMake({ onMakeChange }) {
    const [makes, setMakes] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3003/api/cars/makes')
            .then(response => {
                setMakes(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    return (
        <div>
            <h2>Select Car Make:</h2>
            <select onChange={e => onMakeChange(e.target.value)}>
                <option value="">Select a make</option>
                {makes.map(make => (
                    <option key={make} value={make}>{make}</option>
                ))}
            </select>
        </div>
    );
}

export default CarMake;
