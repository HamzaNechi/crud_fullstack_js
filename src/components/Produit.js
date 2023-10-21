import React, { Fragment, useEffect, useState } from "react";
import { Badge, Button, Table} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit,faPlus  } from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function Produit(){

    const [nom , setNom] = useState();
    const [marque , setMarque] = useState();
    const [quantity , setQuantity] = useState();
    const [categorie , setCategorie] = useState();
    const [description , setDescription] = useState();
    const [_id, setId] = useState("");
    //liste des catégorie
    const [cat_options, setCatOptions] = useState([]);
    useEffect(() =>{
        axios.get("http://localhost:3000/categorie")
        .then(res => setCatOptions(res.data))
        .catch(err => console.log(err));
    },[])

    //-------------------------------------------------display produit
    const [produits , setProduits] = useState();

    useEffect(() =>{
        axios.get("http://localhost:3000/produit")
        .then(res => setProduits(res.data))
        .catch(err => console.log(err));
    },[])
    //----------------------------------------------------end display


    //---------------------------------------------add produit
    //modal ajout
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        setNom("");
        setDescription("");
        setCategorie("");
        setMarque("");
        setQuantity("");
    };
    const handleShow = () => setShow(true);


    const addProduit = (e) =>{
        e.preventDefault();
        axios.post("http://localhost:3000/produit",{nom,marque,quantity,categorie,description}).then(response =>{
            const newProduit = response.data;
            setProduits((produits) => [...produits, newProduit]); //ajouter le nouveau élement à la liste
            handleClose();
        }).catch(err =>{
            console.log(err);
        });
    }
    //----------------------------------------------end add produit


    //---------------------------------------------delete function

    let history = useNavigate();

    const handleDelete = (_id) => {
        // Envoyer une requête DELETE au serveur
        axios
          .delete(`http://localhost:3000/produit/${_id}`)
          .then((response) => {
            // Si la suppression côté serveur réussit, mettez à jour la liste des catégories dans le composant
            setProduits((prevProduits) =>
                prevProduits.filter((produit) => produit._id !== _id)
            );
            history("/produit");
          })
          .catch((error) => {
            console.error("Erreur lors de la suppression :", error);
            // Gérer les erreurs de suppression
          });
    };

    //--------------------------------------------------------end delete function

    //------------------------------------------------- start update function
    //modal update
    const [showUp, setShowUp] = useState(false);
    const handleCloseUp = () => {
        setShowUp(false);
        setNom("");
        setDescription("");
        setCategorie("");
        setMarque("");
        setQuantity("");
        setId("");
    };
    const handleShowUp = (produit) => {
        setNom(produit.nom);
        setDescription(produit.description);
        setCategorie(produit.categorie);
        setMarque(produit.marque);
        setQuantity(produit.quantity);
        setId(produit._id);
        setShowUp(true);
    }

    const handleUpdate = (e) => {
        e.preventDefault();

        const data = {
            nom : nom,
            categorie : categorie,
            marque : marque,
            quantity : quantity,
            description : description
        };

        axios
        .patch(`http://localhost:3000/produit/${_id}`, data)
        .then((response) => {
            // Si la mise à jour côté serveur réussit, mettez à jour la liste des catégories dans le composant
            setProduits((produits) =>
            produits.map((produit) =>
                produit._id === _id ? { ...produit, ...response.data } : produit
            )
            );
            history("/produit");
        })
        .catch((error) => {
            console.error("Erreur lors de la mise à jour :", error);
            // Gérez les erreurs de mise à jour
        });

        handleCloseUp();
    }
    //-------------------------------------------------end update function

    return (
        <div>

            <Fragment>
            <div style={{margin: "10rem"}}>
                <h2 style={{textAlign: "center", margin:"2rem"}}>Liste des produits</h2>

                <div style={{textAlign: "right", marginBottom:"1rem"}}>
                    
                    <Button variant="outline-success" onClick={handleShow}><FontAwesomeIcon icon={faPlus} /> Ajouter un produit</Button>{' '}
                </div>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>

                            <th>Nom</th>

                            <th>Marque</th>

                            <th>Quantité</th>

                            <th>Catégorie</th>

                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            produits && produits.length > 0
                            ?
                            produits.map((item) =>{
                                return(
                                    <tr key={item._id}>
                                        <td>
                                            {item.nom}
                                        </td>
                                        <td >
                                            {item.marque}
                                        </td>

                                        <td >
                                            <Badge pill bg="warning">{item.quantity}</Badge>
                                        </td>

                                        <td >
                                            {item.categorie.nom}
                                        </td>

                                        <td>
                                            <Button variant="primary" onClick={() => handleShowUp(item)}><FontAwesomeIcon icon={faEdit} /></Button>
                                            &nbsp;
                                            <Button variant="danger" onClick={() => handleDelete(item._id)}><FontAwesomeIcon icon={faTrash} /></Button>
                                        </td>
                                    </tr>

                                )
                                
                            })
                            :
                            <tr>
                                <td colSpan={4}>No data Found</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        }
                    </tbody>
                </Table>
                
            </div>
        </Fragment>


        {/** Modal ajout */}
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nouveau produit</Modal.Title>
        </Modal.Header>
        <Form onSubmit={addProduit}>
        <Modal.Body>
          
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                placeholder="exple : Polo"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Marque</Form.Label>
              <Form.Control
                type="text"
                placeholder="exple : Ralph Lauren"
                value={marque}
                onChange={(e) => setMarque(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Quantité</Form.Label>
              <Form.Control
                type="text"
                placeholder="exple : 55"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Catégorie</Form.Label>
              <Form.Control as="select" value={categorie} onChange={(e) => setCategorie(e.target.value)}>
                    <option value="">Sélectionnez une option</option>
                    {cat_options.map((item) => (
                    <option key={item._id} value={item._id}>
                        {item.nom}
                    </option>
                    ))}
          </Form.Control>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
               />
            </Form.Group>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annuler
          </Button>
          <Button variant="primary" type="submit">
            Ajouter
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>
        {/** End modal ajout */}



        {/** Modal update */}
        <Modal show={showUp} onHide={handleCloseUp}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier produit</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleUpdate}>
        <Modal.Body>
          
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                placeholder="exple : Polo"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Marque</Form.Label>
              <Form.Control
                type="text"
                placeholder="exple : Ralph Lauren"
                value={marque}
                onChange={(e) => setMarque(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Quantité</Form.Label>
              <Form.Control
                type="text"
                placeholder="exple : 55"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Catégorie</Form.Label>
              <Form.Control as="select" value={categorie} onChange={(e) => setCategorie(e.target.value)}>
                    <option value="">Sélectionnez une option</option>
                    {cat_options.map((item) => (
                    <option key={item._id} value={item._id}>
                        {item.nom}
                    </option>
                    ))}
          </Form.Control>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
               />
            </Form.Group>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUp}>
            Annuler
          </Button>
          <Button variant="primary" type="submit">
            Modifier
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>
        {/** End modal update */}

        </div>
    );
}

export default Produit;