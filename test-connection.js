import { config as configDotenv } from 'dotenv'; 
import { Sequelize } from 'sequelize';

// Load environment variables
configDotenv();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to Neon Postgres!');
  } catch (error) {
    console.error('❌ Connection failed:', error);
  }
})();
