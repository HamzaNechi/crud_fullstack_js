import mongoose from 'mongoose';


const produit = mongoose.Schema({
    nom : {
        type : String,
        require : true,
        unique : true
    },
    marque : {
        type : String,
        require :true
    },
    quantity : Number,
    description : String,
    categorie : {
        type : mongoose.Types.ObjectId,
        ref : "categorie"
    }
});

export default mongoose.model('produit',produit);