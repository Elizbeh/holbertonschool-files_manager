import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class AppController {
  static async getStatus(req, res) {
    const redisAlive = redisClient.isAlive();
    const dbAlive = await dbClient.isAlive();

    res.status(200).send({ redis: redisAlive, db: dbAlive });
  }

  static async getStats(request, response) {
    try {
      const usersCount = await dbClient.nbUsers();
      const filesCount = await dbClient.nbFiles();

      response.status(200).send({ users: usersCount, files: filesCount });
    } catch (error) {
      console.error(`Error getting stats: ${error}`);
      response.status(500).send('Internal Server Error');
    }
  }
}

export default AppController;
