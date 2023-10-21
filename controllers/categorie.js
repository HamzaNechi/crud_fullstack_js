import cat from '../models/categorie.js';


//add catégorie
export function addCategorie(req,res){
    const _cat = new cat({
        nom : req.body.nom,
        description : req.body.description
    });

    _cat.save().then(doc => {
        res.status(201).json(doc);
    }).catch(err =>{
        res.status(400).json({error : err});
    })    
}


//get all catégorie
export async function getAllCategorie(req,res){
    const cats = await cat.find();
    if(cats){
        res.status(200).json(cats);
    }else{
        res.status(404).json({message : "No data found"});
    }
}


//update categorie
export async function updateCategorie(req,res){
    const filter = {_id : req.params.id_cat};
    const update = {
        nom : req.body.nom,
        description : req.body.description
    }

    await cat.findOneAndUpdate(filter,update , {new : true}).then(doc =>{
        res.status(200).json(doc);
    }).catch(err => {
        res.status(400).json({error : err});
    });
}


//delete categorie
export function deleteCategorie(req,res){
    cat.findOneAndDelete({_id: req.params.id_cat}).then(doc => {
        res.status(200).json(doc);
    }).catch(err =>{
        res.status(400).json({error : err});
    })
}