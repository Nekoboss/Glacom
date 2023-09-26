import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios"
export function Main() {
    const navigate = useNavigate();
    let { slug } = useParams();
    const [data, setData] = useState([]);
    const [icons] = useState({
        "date": <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar" viewBox="0 0 16 16">
            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
        </svg>,
        "user": <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
        </svg>,
        "trash": <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
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
                                            <div className="col col"><button className="btn btn-outline-secondary btn-sm" onClick={() => deleteFromDatabase(items.Slug)}>{icons["trash"]} Elimina</button></div>
                                        </div>
                                        <div class="row">
                                            <div class="col-4">
                                                <div class="imgAbt">
                                                    <img src={items.Image} width={200} />
                                                </div>
                                            </div>
                                            <div class="col-md-8">
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
            </main>
        </>
    );
}

export default Main;
