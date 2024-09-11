import express from "express";
import cors from "cors";
// Importar base de datos
import db from "./database/db.js";
// Importar rutas (con la ruta relativa correcta)
import blogRouters from './routes/routes.js'; 

const app = express();

app.use(cors());
// Corregido el uso de express.json()
app.use(express.json());
// Corregida la ruta de las rutas de blogs
app.use('/blogs', blogRouters);

// Función asíncrona para la autenticación de la base de datos
const connectDB = async () => {
  try {
    await db.authenticate();
    console.log('Conexión a la base de datos realizada');
  } catch (error) {
    console.log(`Conexión a la base de datos no realizada: ${error}`);
  }
};

// Llamar a la función para conectar la base de datos
connectDB();

app.get('/', (req, res) => {
  res.send('Hola mundo');
});

app.listen(8000, () => {
  console.log('Server running on http://localhost:8000');
});
