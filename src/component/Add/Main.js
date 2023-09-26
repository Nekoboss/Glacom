import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios"
export function Main() {
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData(e.target);
            const formDataObject = {};
            formData.forEach((value, key) => {
                formDataObject[key] = value;
            });
            // Effettua una richiesta POST al tuo server con i dati del modulo
            const response = await axios.post(
                "http://localhost:3001/api/add",
                formDataObject
            );
            console.log("Dati inseriti con successo:", response.data);
            navigate("/");
            // Effettua l'eventuale aggiornamento dell'interfaccia utente o reindirizzamento
        } catch (error) {
            console.error("Errore nell'inserimento dei dati:", error);
            // Gestisci gli errori
        }
    }

    return (
        <>
            <main>
                <div className="container">
                    <form onSubmit={handleSubmit}>
                        <fieldset>
                            <div className="row">
                                <div className="form-group col">
                                    <label for="title" className="form-label mt-4">Blog Title</label>
                                    <input type="text" className="form-control" name="Title" id="title" placeholder="Title" />
                                    {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                </div>
                                <div className="form-group col">
                                    <label for="slug" className="form-label mt-4">Blog Slug</label>
                                    <input type="text" className="form-control" name="Slug" id="slug" placeholder="Blog Slug" />
                                </div>
                                <div className="form-group col">
                                    <label for="img" className="form-label mt-4">Image src</label>
                                    <input type="text" className="form-control" name="Image" id="image" placeholder="Image src" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-4">
                                    <label for="creator" className="form-label mt-4">Creator</label>
                                    <input type="text" className="form-control" name="Creator" id="creator" placeholder="Creator" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-7">
                                    <label for="desc" className="form-label mt-4">Description</label>
                                    <textarea className="form-control" name="Description" id="desc" rows="2"></textarea>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-7">
                                    <label for="content" className="form-label mt-4">Content</label>
                                    <textarea className="form-control" name="Content" id="content" rows="6"></textarea>
                                </div>
                            </div>
                            <div className="pt-2">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </main >
        </>
    );
}

export default Main;
