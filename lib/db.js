import { Sequelize } from 'sequelize';

if (!global.__sequelizeInstance) {
  global.__sequelizeInstance = new Sequelize(
    process.env.DB_NAME  || 'shivansh_tech_db',
    process.env.DB_USER  || 'root',
    process.env.DB_PASS  || '',
    {
      host:    process.env.DB_HOST || 'localhost',
      port:    parseInt(process.env.DB_PORT || '3306', 10),
      dialect: 'mysql',
      logging: false,
      pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
    }
  );
}

export default global.__sequelizeInstance;
