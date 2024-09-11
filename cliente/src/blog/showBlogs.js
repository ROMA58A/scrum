import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const URI = 'http://localhost:8000/blogs/';  // Cambia esto si tu URL de la API es diferente.

const CompShowBlogs = () => {
  const [blogs, setBlogs] = useState([]);  // Almacena la lista completa de blogs.
  const [searchTerm, setSearchTerm] = useState('');  // Almacena el valor del buscador.

  useEffect(() => {
    getBlogs();  // Llama a la función para obtener los blogs al montar el componente.
  }, []);

  // Función para obtener todos los blogs desde la API
  const getBlogs = async () => {
    try {
      const res = await axios.get(URI, { headers: { 'Accept': 'application/json' } });
      console.log('Respuesta del servidor:', res.data);

      if (Array.isArray(res.data)) {
        setBlogs(res.data);  // Si es un array, se almacena directamente.
      } else if (typeof res.data === 'object') {
        setBlogs([res.data]);  // Si es un solo objeto, lo convierte en un array.
      } else {
  
      }

    } catch (error) {
      
      setBlogs([]);  // Si hay un error, el estado de blogs se vacía.
    }
  };

  // Función para eliminar un blog.
  const deleteBlog = async (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este registro?');
    if (confirmDelete) {
      try {
        await axios.delete(`${URI}${id}`);
        getBlogs();  // Actualiza la lista de blogs después de eliminar uno.
      } catch (error) {
        console.error('Error eliminando el blog:', error.response ? error.response.data : error.message);
      }
    }
  };

  // Filtrar los blogs según el término de búsqueda.
  const filteredBlogs = blogs.filter((blog) =>
    blog.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
    <h1 className="mb-4">Datos</h1>
    {/* Botón para crear un nuevo blog */}
    <Link to="/create" className="btn btn-primary mb-3">Crear Nuevo registro</Link>
    {/* Campo de búsqueda */}
    <div className="mb-3">
      <input
        type="text"
        placeholder="Buscar por nombre"
        className="form-control"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}  // Actualiza el valor del término de búsqueda.
      />
    </div>
    <table className="table table-hover table-bordered ">
      <thead  className='thead-dark '>
        <tr>
          <th>Nombre</th>
          <th>Email</th>
          <th>Fecha de Nacimiento</th>
          <th>Edad</th>
          <th>Teléfono</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {/* Recorre el array filtrado de blogs para mostrar los registros que coincidan */}
        {Array.isArray(filteredBlogs) && filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <tr key={blog.id}>
              <td>{blog.nombre}</td>
              <td>{blog.email}</td>
              <td>{new Date(blog.fecha_nacimiento).toLocaleDateString()}</td>
              <td>{blog.edad}</td>
              <td>{blog.telefono}</td>
              <td>
                <Link to={`/blogs/${blog.id}`} className="btn btn-info btn-sm me-2"><i className="fa-solid fa-folder-plus"></i></Link>
                <button 
                  onClick={() => deleteBlog(blog.id)}
                  className="btn btn-danger btn-sm"
                >
                <i className="fa-solid fa-trash-can"></i>
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6">No se encontraron registros</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);
};

export default CompShowBlogs;
