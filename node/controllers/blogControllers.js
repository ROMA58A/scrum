import BlogModel from "../models/Blogmodel.js";

//** Métodos del CRUD **

// Mostrar todos los registros
export const getALLBLOGS = async (req, res) => {
  try {
    const blogs = await BlogModel.findAll(); // Usar findAll para obtener todos los registros
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message }); // Enviar estado 500 para errores del servidor
  }
};

// Mostrar un registro
export const getBlog = async (req, res) => {
  try {
    const blog = await BlogModel.findOne({
      where: { id: req.params.id } // Buscar un solo registro basado en el ID
    });
    if (blog) {
      res.json(blog);
    } else {
      res.status(404).json({ message: 'no existe registro' }); // Enviar estado 404 si no se encuentra el registro
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un registro
export const createBlog = async (req, res) => {
  try {
    const newBlog = await BlogModel.create(req.body); // Crear un nuevo registro
    res.status(201).json({ // Enviar estado 201 para un recurso creado
      message: "Registro ingresado correctamente",
      blog: newBlog
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un registro
export const updateBlog = async (req, res) => {
  try {
    const [updated] = await BlogModel.update(req.body, { // Actualizar el registro
      where: { id: req.params.id }
    });
    if (updated) {
      res.json({
        message: "Registro actualizado correctamente"
      });
    } else {
      res.status(404).json({ message: 'registro no encontrado' }); // Enviar estado 404 si no se encuentra el registro
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un registro
export const deleteBlog = async (req, res) => {
  try {
    const deleted = await BlogModel.destroy({ // Eliminar el registro
      where: { id: req.params.id }
    });
    if (deleted) {
      res.json({
        message: "Registro eliminado correctamente"
      });
    } else {
      res.status(404).json({ message: 'registro no encontrado' }); // Enviar estado 404 si no se encuentra el registro
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
