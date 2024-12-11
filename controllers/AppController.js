const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

const endpoints = {
  getStatus: async (req, res) => {
    try {
      const redisStatus = redisClient.isAlive();
      const dbStatus = dbClient.isAlive();
            
      res.status(200).json({
        redis: redisStatus,
        db: dbStatus,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },

  getStats: async (req, res) => {
    try {
      const userCount = await dbClient.nbUsers();
      const fileCount = await dbClient.nbFiles();

      res.status(200).json({
        users: userCount,
        files: fileCount, 
      })
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  }
};

module.exports = endpoints;
