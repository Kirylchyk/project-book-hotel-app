const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');
const uri = 'mongodb+srv://Kirylchyk:rita12@cluster0.j4dfwce.mongodb.net/?retryWrites=true&w=majority';

// Route for getting all cards
router.get('/', async (req, res) => {
    try {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        const db = client.db('test');
        const cards = await db.collection('cards').find().toArray();
        await client.close();

        res.status(200).json(cards);
    } catch (error) {
        console.error('Error fetching cards:', error);
        res.status(500).json({ message: 'Error fetching cards' });
    }
});

// Route for getting a specific card by id
router.get('/:id', async (req, res) => {
    const cardId = req.params.id;

    try {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        const db = client.db('test');
        const card = await db.collection('cards').findOne({ _id: new ObjectId(cardId) });
        await client.close();

        if (card) {
            res.status(200).json(card);
        } else {
            res.status(404).json({ message: 'Card not found' });
        }
    } catch (error) {
        console.error('Error fetching card:', error);
        res.status(500).json({ message: 'Error fetching card' });
    }
});

module.exports = router;

