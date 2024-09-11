import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const URI = 'http://localhost:8000/blogs/';

const CompEditarblog = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    fecha_nacimiento: '',
    telefono: ''
  });

  const { id } = useParams();
  const navigate = useNavigate();

  // Obtener los datos del blog por ID
  useEffect(() => {
    const getBlogById = async () => {
      try {
        const res = await axios.get(`${URI}${id}`);
        const blog = res.data;
        setFormData({
          nombre: blog.nombre,
          email: blog.email,
          fecha_nacimiento: blog.fecha_nacimiento,
          telefono: blog.telefono ? String(blog.telefono) : ''
        });
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    getBlogById();
  }, [id]);

  // Manejar los cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Actualizar los datos en el servidor
  const update = async (e) => {
    e.preventDefault();
    const isConfirmed = window.confirm('¿Está seguro que quiere actualizar el registro?');
    if (!isConfirmed) {
      return;
    }

    const updatedFormData = {
      nombre: formData.nombre,
      email: formData.email,
      fecha_nacimiento: formData.fecha_nacimiento,
      telefono: formData.telefono
    };

    try {
      const res = await axios.put(`${URI}${id}`, updatedFormData);
      console.log('Respuesta del servidor:', res.data);
      navigate('/');
    } catch (error) {
      console.error('Error al actualizar el registro:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg border-0 rounded-lg">
            <div className="card-header bg-dark text-white text-center rounded-top">
              <h2 className="mb-0">Editar Registro</h2>
            </div>
            <div className="card-body bg-light">
              <form onSubmit={update} noValidate>
                <div className="mb-4">
                  <label htmlFor="nombre" className="form-label">Nombre</label>
                  <input
                    type="text"
                    className="form-control shadow-sm rounded"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    placeholder="Ingresa tu nombre completo"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control shadow-sm rounded"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="example@correo.com"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="fecha_nacimiento" className="form-label">Fecha de Nacimiento</label>
                  <input
                    type="date"
                    className="form-control shadow-sm rounded"
                    id="fecha_nacimiento"
                    name="fecha_nacimiento"
                    value={formData.fecha_nacimiento}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="telefono" className="form-label">Teléfono</label>
                  <input
                    type="tel"
                    className="form-control shadow-sm rounded"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    required
                    placeholder="+123-456-7890"
                    pattern="^\+?[0-9\- ]+$"
                    title="Número de teléfono válido. Puedes usar +, - y espacios."
                    aria-describedby="telefonoHelp"
                  />
                </div>
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary btn-lg shadow-sm rounded">
                    Actualizar Registro
                  </button>
                </div>
              </form>
            </div>
            <div className="card-footer text-muted text-center">
              Asegúrate de que todos los campos estén correctos antes de actualizar
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompEditarblog;
