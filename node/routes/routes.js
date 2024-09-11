import express from 'express'; // Importa express
import { createBlog, getALLBLOGS, getBlog, updateBlog, deleteBlog } from '../controllers/blogControllers.js';

const router = express.Router();

router.get('/', getALLBLOGS);
router.get('/:id', getBlog);
router.post('/', createBlog);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);

export default router;
