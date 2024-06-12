const express = require('express');
const router = express.Router();
const pool = require('../database');

// Endpoint do pobierania marek
router.get('/makes', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT name FROM Makes');
        res.json(rows.map(row => row.name));
    } catch (error) {
        console.error('There was an error!', error);
        res.status(500).send('Server error');
    }
});

// Endpoint do pobierania modeli dla danej marki
router.get('/models/:make', async (req, res) => {
    try {
        const [makes] = await pool.query('SELECT id FROM Makes WHERE name = ?', [req.params.make]);
        if (makes.length === 0) {
            return res.status(404).send('Make not found');
        }
        const [models] = await pool.query('SELECT id, name FROM Models WHERE make_id = ?', [makes[0].id]);
        res.json(models);
    } catch (error) {
        console.error('There was an error!', error);
        res.status(500).send('Server error');
    }
});

// Endpoint do pobierania części dla danego modelu
router.get('/parts/:modelId', async (req, res) => {
    try {
        const [parts] = await pool.query('SELECT id, name FROM Parts WHERE model_id = ?', [req.params.modelId]);
        res.json(parts);
    } catch (error) {
        console.error('There was an error!', error);
        res.status(500).send('Server error');
    }
});

// Endpoint do pobierania opcji części dla danej części
router.get('/part-options/:partId', async (req, res) => {
    try {
        const [options] = await pool.query('SELECT name, imageUrl, purchaseUrl FROM PartOptions WHERE part_id = ?', [req.params.partId]);
        res.json(options);
    } catch (error) {
        console.error('There was an error!', error);
        res.status(500).send('Server error');
    }
});

// Endpoint do pobierania wszystkich opcji części dla danego modelu
router.get('/all-part-options/:modelId', async (req, res) => {
    try {
        const [parts] = await pool.query(`
            SELECT po.name, po.imageUrl, po.purchaseUrl 
            FROM PartOptions po
            JOIN Parts p ON po.part_id = p.id
            WHERE p.model_id = ?
        `, [req.params.modelId]);
        res.json(parts);
    } catch (error) {
        console.error('There was an error!', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
