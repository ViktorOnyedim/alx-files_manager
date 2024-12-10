// import { MongoClient } from 'mongodb'
const { MongoClient } = require('mongodb');

/**
 * Represents a MongoDB client
 */
class DBClient {
    /**
     * Creates a new DBClient instance
     */
    constructor() {
        const host = process.env.DB_HOST || 'localhost';
        const port = process.env.DB_PORT || 27017;
        const database = process.env.DB_DATABASE || 'files_manager';
        const url = `mongodb://${host}:${port}`;

        this.client = new MongoClient(url, { useUnifiedTopology: true });
        this.dbName = database;

        this.client.connect()
            .then(() => console.log('Connected to MongoDB'))
            .catch((err) => console.error('Failed to connect to MongoDB:', err));
    }

    /**
     * Checks if connetion to MongoDB server is active
     * @returns {boolean} connection status
     */
    isAlive() {
        return this.client.isConnected();
    }

    /**
     * Get the number of documents in the collection users
     * @returns {Promise<number>} Number of documents
     */
    async nbUsers() {
        try {
            const db = this.client.db(this.dbName);
            const usersCollection = db.collection('users');
            return await usersCollection.countDocuments();
        } catch (err) {
            console.error('Error getting number of users:', err);
            return 0;
        }
    }

    /**
     * Get the number of files in the collection files 
     * @returns {Promise<number>} Number of files
     */
    async nbFiles() {
        try {
            const db = this.client.db(this.dbName);
            const filesCollection = db.collection('files');
            return await filesCollection.countDocuments();
        } catch (err) {
            console.error('Error getting number of files:', err);
            return 0;
        }
    }
}

const dbClient = new DBClient();
export default dbClient;
