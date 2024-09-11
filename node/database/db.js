import { Sequelize } from 'sequelize';

// Configuración de la conexión con Sequelize
const sequelize = new Sequelize('prueba', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306 // Asegúrate de que este es el puerto correcto
});

// Verificar la conexión
const authenticateDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conectado a la base de datos MySQL con Sequelize');
  } catch (err) {
    console.error('No se pudo conectar a la base de datos:', err);
  }
};

// Llamar a la función para verificar la conexión
authenticateDatabase();

export default sequelize;
