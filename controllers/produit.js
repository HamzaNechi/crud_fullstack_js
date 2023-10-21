import produit from "../models/produit.js";


//add produit
export function addProduit(req,res){
    produit.create({
        nom : req.body.nom,
        marque : req.body.marque,
        quantity : req.body.quantity,
        description : req.body.description,
        categorie : req.body.categorie
    }).then(doc =>{
        doc.populate('categorie').then(t =>{
            res.status(201).json(t);
        }).catch(err=>{
            res.json(err)
        });
        
    }).catch(err =>{
        res.status(400).json({error : err});
    })
}


//get all produits
export async function getAllProduits(req,res){
    const produits = await produit.find().populate('categorie');
    if(produits){
        res.status(200).json(produits);
    }else{
        res.status(400).json({message : "No data found !"});
    }
}



//update produit
export async function updateProduit(req,res){
    const filter = {_id : req.params.id_produit};
    const update = {
        nom : req.body.nom,
        marque : req.body.marque,
        quantity : req.body.quantity,
        description : req.body.description,
        categorie : req.body.categorie
    };

    produit.findOneAndUpdate(filter,update,{new : true}).then(doc =>{
        doc.populate('categorie').then(t =>{
            res.status(200).json(t);
        }).catch(err=>{
            res.json(err)
        });
    }).catch(err =>{
        res.status(400).json({error : err});
    });
}


//delete produit
export function deleteProduit(req,res){
    produit.findOneAndDelete({_id : req.params.id_produit}).then(doc =>{
        res.status(200).json(doc);
    }).catch(err =>{
        res.status(400).json({error : err});
    })
}