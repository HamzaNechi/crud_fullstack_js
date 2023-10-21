import { addProduit, getAllProduits,updateProduit,deleteProduit } from "../controllers/produit.js";
import express from 'express';


const router = express.Router();




router
    .route('/:id_produit')
    .patch(updateProduit)
    .delete(deleteProduit);

router
    .route('/')
    .get(getAllProduits)
    .post(addProduit);

export default router;