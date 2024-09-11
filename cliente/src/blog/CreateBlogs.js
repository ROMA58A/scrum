import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const URI = 'http://localhost:8000/blogs/';

const CreateBlog = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    fecha_nacimiento: '',
    telefono: ''
  });
  const navigate = useNavigate(); // Para redireccionar después de crear el registro

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isConfirmed = window.confirm('¿Estás seguro de que quieres crear este registro?');
    if (!isConfirmed) {
      return;
    }
    try {
      await axios.post(URI, formData);
      // Redirige a la página principal después de crear el registro
      navigate('/');
    } catch (error) {
      console.error('Error creando el registro:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg border-0 rounded-lg">
            <div className="card-header bg-primary text-white text-center rounded-top">
              <h2 className="mb-0">Crear Nuevo Registro</h2>
            </div>
            <div className="card-body bg-light">
              <form onSubmit={handleSubmit} noValidate>
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
                  <small id="telefonoHelp" className="form-text text-muted">
                    Introduce tu número con guiones y, si es internacional, con +.
                  </small>
                </div>
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-success btn-lg shadow-sm rounded">
                    Crear Registro
                  </button>
                </div>
              </form>
            </div>
            <div className="card-footer text-muted text-center">
              Asegúrate de que todos los campos estén correctamente completados.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
