import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    this.client = new MongoClient(`mongodb://${host}:${port}`, { useUnifiedTopology: true });
    this.connect();
  }

  async connect() {
    try {
      await this.client.connect();
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error(`Error connecting to MongoDB: ${error}`);
    }
  }

  async isAlive() {
    try {
      await this.client.db().admin().ping();
      return true;
    } catch (error) {
      console.error(`MongoDB connection error: ${error}`);
      return false;
    }
  }

  async nbUsers() {
    const count = await this.client.db().collection('users').countDocuments();
    return count;
  }

  async nbFiles() {
    const count = await this.client.db().collection('files').countDocuments();
    return count;
  }
}

const dbClient = new DBClient();
export default dbClient;
