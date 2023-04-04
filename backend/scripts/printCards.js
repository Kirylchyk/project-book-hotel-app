const { MongoClient } = require('mongodb');

//My MongoDB connection string
const uri = 'mongodb+srv://Kirylchyk:rita12@cluster0.j4dfwce.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function printCards() {
    try {
        await client.connect();

        const collection = client.db('test').collection('cards');

        const allCards = await collection.find({}).toArray();

        console.log('All cards in the collection:');
        console.log(allCards);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    } finally {
        await client.close();
    }
}

printCards();
