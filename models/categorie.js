import mongoose from 'mongoose';

const categorie = mongoose.Schema({
    nom : {
        type : String,
        require : true
    },
    description : String,
});

export default mongoose.model('categorie',categorie);