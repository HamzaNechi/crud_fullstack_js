import express from 'express';
import {config} from 'dotenv';
import cors from 'cors'; // une politique de sécurité des navigateurs web 
import mongoose from 'mongoose'; //mongoose est un ODM pour faciliter la communication entre nodejs et mongoDB
import categorieRouter from './routes/categorie.js';
import produitRouter from './routes/produit.js';


config();
const app=express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3030;
const hostname= process.env.HOST || 'localhost';
const databaseName = process.env.DBNAME || 'GStock';


//connecter à mongoDB
mongoose
  .connect(`mongodb://localhost:27017/${databaseName}`)
  .then(() => {
    console.log('Connected to mongodb.');
  })
  .catch((error) => {
    console.log(error);
  });


app.use('/categorie',categorieRouter);
app.use('/produit',produitRouter);

app.get('/',(req,res) => {
    res.send("Formation FullStack JS");
});

app.listen(port,hostname, () =>{
    console.log(`Server running on http://${hostname}:${port}/`);
})

