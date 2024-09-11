import sequelize from "../database/db.js"; // Importa correctamente la instancia de Sequelize
import { DataTypes } from "sequelize";

const BlogModel = sequelize.define('registro', { // Usa el nombre correcto de la tabla
  nombre: { type: DataTypes.STRING }, 
  email: { type: DataTypes.STRING }, 
  fecha_nacimiento: { type: DataTypes.DATE }, 
  edad: { type: DataTypes.DOUBLE }, 
  telefono: { type: DataTypes.STRING }
}, {
  tableName: 'registro', // Especifica el nombre de la tabla en la base de datos
  timestamps: false // Opcional: desactiva los timestamps si no los necesitas
});

export default BlogModel;
