import { MongoClient } from 'mongodb';
import 'dotenv/config';

// Add error handling for missing environment variable
if (!process.env.DBCONNECTION) {
    throw new Error('Please define DBCONNECTION in your .env file');
}

const uri = process.env.DBCONNECTION;
let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
    if (cachedClient && cachedDb) {
        return { client: cachedClient, db: cachedDb };
    }

    try {
        const client = await MongoClient.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // 5 second timeout
            maxPoolSize: 10, // Limit number of connections
        });

        const db = client.db('EmployeeList');

        client.on('connected', () => {
            console.log('Successfully connected to MongoDB.');
        });

        client.on('error', (error) => {
            console.error('MongoDB connection error:', error);
        });

        // Cache the client and database instances
        cachedClient = client;
        cachedDb = db;

        return { client, db };
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error.message);
        throw new Error('Failed to connect to the database');
    }
}

export default connectToDatabase;
