import express from 'express';
import { getAllCategorie, addCategorie,deleteCategorie,updateCategorie } from '../controllers/categorie.js';


const router = express.Router();



router
    .route('/:id_cat')
    .delete(deleteCategorie)
    .patch(updateCategorie);

router
    .route('/')
    .get(getAllCategorie)
    .post(addCategorie);


export default router;