import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
export function Main() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/api/blogs", {
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

  return (
    <>
      <main>
        <div className="container">
          <div className="p-5">
            <h2>Blog</h2>
          </div>
          <div className="row justify-content-center">
            {data.map((items) => (
              <div className="col">
                <div key={items.idBlog} className="card mb-3" style={{ maxWidth: "540px" }}>
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img src={items.Image} className="img-fluid rounded-start" alt="..." />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h4 className="card-title text-info-emphasis"><strong>{items.Title}</strong></h4>
                        <p className="card-text"><span className="badge bg-primary">{new Date(items.CreatedAt).toLocaleDateString()}</span> <small>{items.Slug}</small> </p>
                        <p className="card-text">{items.Description}</p>
                        <figure className="text-end ">
                          <figcaption className="blockquote-footer">
                            Pubblicato da <cite title="Source Title">{items.Creator}</cite>
                          </figcaption>
                        </figure>
                        <Link className="btn btn-outline-primary btn-sm rounded-btn" to={"/read/" + items.Slug}>Read More</Link>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default Main;
