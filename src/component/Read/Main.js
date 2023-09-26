import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios"
export function Main() {
    const navigate = useNavigate();
    let { slug } = useParams();
    const [data, setData] = useState([]);
    const [values, setValues] = useState({
    });

    const [icons] = useState({
        "date": <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar" viewBox="0 0 16 16">
            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
        </svg>,
        "user": <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
        </svg>,
        "trash": <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
        </svg>,
        "edit": <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
        </svg>
    })

    useEffect(() => {
        axios.get(`http://localhost:3001/api/read/${slug}`, {
            headers: {
                Accept: "application/json",
            },
        })
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    const consoleClick = () => {
        console.log(data);
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };
    const deleteFromDatabase = async (slug) => {
        axios
            .delete(`http://localhost:3001/api/delete/${slug}`)
            .then((response) => {
                // Gestisci la risposta o esegui un'azione appropriata
                alert("Post eliminitao con successo. slug post: " + slug);
                navigate("/");
            })
            .catch((error) => {
                // Gestisci gli errori in caso di problemi nella cancellazione
                console.error(
                    "Si è verificato un errore durante la cancellazione del Post.",
                    error
                );
            });

        // console.log(index);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        let slug = e.target.name;

        axios
            .put(`http://localhost:3001/api/update/${slug}`, values)
            .then((response) => {
                // Gestisci la risposta o esegui un'azione appropriata
                // console.log("Libro aggiornato con successo.");
                alert("Post aggiornato con successo.");
                window.location.reload();
                navigate("/");
            })
            .catch((error) => {
                // Gestisci gli errori in caso di problemi nella modifica
                console.error(
                    "Si è verificato un errore durante la modifica del libro.",
                    error
                );
            });
    };
    return (
        <>
            <main>
                <div className="container">
                    {data.map((items) => (
                        <section className="content-item grey p-5" id={slug}>
                            <div className="container">
                                {/* <button className="btn bnt-primary" onClick={consoleClick}> Console log</button> */}
                                <div className="row">
                                    <div className="col-sm-8 blog">
                                        <h2>{items.Title}</h2>
                                        <div className="row">
                                            <div className="col col"><p>{icons["date"]} {new Date(items.CreatedAt).toLocaleDateString()}</p></div>
                                            <div className="col col"><p>{icons["user"]} {items.Creator}</p></div>
                                            <div className="col col">
                                                <button className="btn btn-outline-secondary btn-sm" onClick={() => deleteFromDatabase(items.Slug)}>{icons["trash"]} Delete</button>
                                            </div>
                                            <div className="col col">
                                                <button className="btn btn-outline-secondary btn-sm" name={items.Slug} value={items.Slug} data-bs-toggle="modal" data-bs-target={"#modal" + items.Slug}>{icons["edit"]} Edit</button>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-4">
                                                <div className="imgAbt">
                                                    <img src={items.Image} width={200} />
                                                </div>
                                            </div>
                                            <div className="col-md-8">
                                                <p>
                                                    {items.Content}
                                                </p>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    ))}
                </div>
                {data.map((items, index) => (
                    <div
                        className="modal fade "
                        id={"modal" + items.Slug}
                        key={items.idBlog}
                        tabIndex="-1"
                        aria-labelledby={"exampleModalLabel" + items.Title}
                        aria-hidden="true">
                        <div className="modal-dialog modal-dialog-scrollable modal-xl">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4
                                        className="modal-title title text-info-emphasis"
                                        id={"exampleModalLabel" + items.Title}>
                                        <strong>{items.Title}</strong>
                                    </h4>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="container">
                                        <form name={items.Slug} onSubmit={handleSubmit}>
                                            <div className="form-row row">
                                                <div className="col-auto form-group ">
                                                    <label className="form-label">Title</label>
                                                    <input
                                                        contentEditable="true"
                                                        className="form-control"
                                                        type="text"
                                                        name="Title"
                                                        value={values.Title || items.Title}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                {/* {console.log("formvalue: " + formValues[index].isbn)} */}
                                                <div className="col-auto form-group">
                                                    <label className="form-label">Slug</label>
                                                    <input
                                                        contentEditable="true"
                                                        className="form-control"
                                                        type="text"
                                                        name="Slug"
                                                        value={values.Slug || items.Slug}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div className="form-group col">
                                                    <label className="form-label">Image</label>
                                                    <input
                                                        contentEditable="true"
                                                        className="form-control"
                                                        type="text"
                                                        name="Image"
                                                        value={values.Image || items.Image}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                            <input type="hidden" name="CreatedAt" value={new Date().toISOString()} />
                                            <div className="row">
                                                <div className="col form-group">
                                                    <label className="form-label">Description</label>
                                                    <textarea
                                                        className="form-control"
                                                        type="text"
                                                        name="Description"
                                                        rows="3"
                                                        value={values.Description || items.Description}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div className="col-auto form-group">
                                                    <label className="form-label">Creator</label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="Creator"
                                                        value={values.Creator || items.Creator}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col form-group">
                                                    <label className="form-label">
                                                        Content
                                                    </label>
                                                    <textarea
                                                        className="form-control"
                                                        type="text"
                                                        name="Content"
                                                        rows="5"
                                                        value={values.Content || items.Content}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                            <div
                                                className="modal-footer"
                                                style={{ marginTop: "25px" }}>
                                                <button type="submit" className="btn btn-primary">
                                                    Save
                                                </button>
                                            </div>
                                        </form>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </main>
        </>
    );
}

export default Main;
