import React, { Fragment, useEffect, useState } from "react";
import { Button, Table} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit,faPlus  } from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function Categorie(){
    //modal ajout
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        setNom("");
        setDescription("");
    };
    const handleShow = () => setShow(true);


    //modal update
    const [showUp, setShowUp] = useState(false);
    const handleCloseUp = () => {
        setShowUp(false);
        setNom("");
        setDescription("");
        setId("");
    };
    const handleShowUp = () => setShowUp(true);

    //end modal

    //display catégorie
    const [categories , setCategories] = useState();

    useEffect(() =>{
        axios.get("http://localhost:3000/categorie")
        .then(res => setCategories(res.data))
        .catch(err => console.log(err));
    },[])
    //end display


    //ajouter catégorie
    const [nom, setNom] = useState("");
    const [description, setDescription] = useState("");


    const handleAddCat = (e) => {
        e.preventDefault(); // Empêche la soumission par défaut du formulaire
    
        // Envoie une requête POST avec Axios
        axios.post("http://localhost:3000/categorie", { nom, description })
          .then((response) => {
            // Gérer la réponse du serveur
            console.log("Réponse du serveur :", response.data);
            const newCategory = response.data;
            setCategories((categories) => [...categories, newCategory]);

            setNom("");
            setDescription("");
            handleClose();
            
          })
          .catch((error) => {
            // Gérer les erreurs
            console.error("Erreur lors de la soumission du formulaire :", error);
          });
      };
    //end ajouter
    

    //delete function

    let history = useNavigate();

    const handleDelete = (_id) => {
        // Envoyer une requête DELETE au serveur
        axios
          .delete(`http://localhost:3000/categorie/${_id}`)
          .then((response) => {
            // Si la suppression côté serveur réussit, mettez à jour la liste des catégories dans le composant
            setCategories((prevCategories) =>
              prevCategories.filter((category) => category._id !== _id)
            );
            history("/");
          })
          .catch((error) => {
            console.error("Erreur lors de la suppression :", error);
            // Gérer les erreurs de suppression
          });

        //handleCloseUp();
    };

    //end delete function


    //update function
    const [_id, setId] = useState("");

    const handleUpdate = (e) => {
        e.preventDefault();

        const data = {
            nom : nom,
            description : description
        };

        axios
        .patch(`http://localhost:3000/categorie/${_id}`, data)
        .then((response) => {
            // Si la mise à jour côté serveur réussit, mettez à jour la liste des catégories dans le composant
            setCategories((categories) =>
            categories.map((category) =>
                category._id === _id ? { ...category, ...data } : category
            )
            );
            history("/");
        })
        .catch((error) => {
            console.error("Erreur lors de la mise à jour :", error);
            // Gérez les erreurs de mise à jour
        });
    }
    //end update


    return (
    <div>
        
        <Fragment>
            <div style={{margin: "10rem"}}>
                <h2 style={{textAlign: "center", margin:"2rem"}}>Liste des catégories</h2>

                <div style={{textAlign: "right", marginBottom:"1rem"}}>
                    
                    <Button variant="outline-success" onClick={handleShow}><FontAwesomeIcon icon={faPlus} /> Ajouter une catégorie</Button>{' '}
                </div>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>

                            <th>Nom</th>

                            <th>Description</th>

                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categories && categories.length > 0
                            ?
                            categories.map((item) =>{
                                return(
                                    <tr key={item._id}>
                                        <td>
                                            {item.nom}
                                        </td>
                                        <td className="text-justify">
                                            {item.description}
                                        </td>

                                        <td>
                                            <Button variant="primary" onClick={() => {
                                                handleShowUp();
                                                setNom(item.nom);
                                                setDescription(item.description);
                                                setId(item._id);
                                            }}><FontAwesomeIcon icon={faEdit} /></Button>
                                            &nbsp;
                                            <Button variant="danger" onClick={() => handleDelete(item._id)}><FontAwesomeIcon icon={faTrash} /></Button>
                                        </td>
                                    </tr>

                                )
                                
                            })
                            :
                            <tr>
                              <td></td>
                              <td>"No data Found !"</td>
                              <td></td>
                            </tr>
                        }
                    </tbody>
                </Table>
                
            </div>
        </Fragment>



        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nouvelle catégorie</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddCat}>
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



      {/* model update*/}


      <Modal show={showUp} onHide={handleCloseUp}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier catégorie</Modal.Title>
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
    </div>
    )
}

export default Categorie;