const mysql = require("mysql");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());

function isEmailValid(text) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(text);
}

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "cm_glacom",
});

const whitelist = ["http://localhost:3000"];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

connection.connect((err) => {
  if (err) {
    console.error("Errore nella connessione al database:", err);
    throw err;
  }
  console.log("Connected to MySQL database!");
});
// Route api per ottenere i libri disponibili nel database
app.get("/api/blogs", (req, res) => {
  connection.query("SELECT * FROM blog", (error, results, fields) => {
    if (error) throw error;
    res.json(results); // Utilizza json() per inviare dati JSON
  });
});
app.get("/api/read/:id", (req, res) => {
  const blogId = req.params.id; // Otteniamo il parametro "id" dalla URL

  connection.query("SELECT * FROM blog WHERE Slug = ?", [blogId], (error, results, fields) => {
    if (error) {
      console.error("Errore nella query del database:", error);
      res.status(500).json({ error: "Errore nel recupero del blog" });
    } else {
      if (results.length === 0) {
        // Se non trova un blog con l'ID specificato, restituisci un errore 404
        res.status(404).json({ error: "Blog non trovato" });
      } else {
        res.json(results);
      }
    }
  });
});
// Route per aggiungere libri al database
app.post("/api/add", (req, res) => {
  const {
    Title,
    Slug,
    Image,
    Description,
    Creator,
    Content
  } = req.body;
  const Now = new Date().toISOString();
  // Esegui una query per l'inserimento dei dati nel database
  const query =
    "INSERT INTO blog (Title, Slug, Image, Description,CreatedAt, Creator, Content) VALUES (?, ?, ?, ?, ?, ?, ?)";
  connection.query(
    query,
    [Title, Slug, Image, Description, Now, Creator, Content],
    (err, results) => {
      if (err) {
        console.error("Errore nell'inserimento dei dati:", err);
        res.status(500).json({ error: "Errore nel server" });
        return;
      }
      console.log("Dati inseriti con successo");
      res.json({ message: "Dati inseriti con successo" });
    }
  );
});

// Route per rimuovere libri dal database
app.delete("/api/delete/:slug", (req, res) => {
  const slug = req.params.slug;
  // Esegui la query per la cancellazione dei dati nel database
  const query = "DELETE FROM blog WHERE Slug = ?";
  console.log("server: " + slug);
  connection.query(query, slug, (err, results) => {
    if (err) {
      console.error("Errore nella cancellazione dei dati:", err);
      res.status(500).json({ error: "Errore nel server" });
      return;
    }
    console.log("Dati cancellati con successo");
    res.json({ message: "Dati cancellati con successo" });
  });
});

app.put("/api/update/:cod", (req, res) => {
  const cod = req.params.cod;
  const {
    Title,
    Slug,
    Image,
    Description,
    CreatedAt,
    Creator,
    Content
  } = req.body;
  console.log("req body: " + req.body);
  // Verifica se almeno un campo con valore è stato fornito
  const fieldsToUpdate = [
    "Title",
    "Slug",
    "Image",
    "Description",
    "CreatedAt",
    "Creator",
    "Content"
  ].filter((field) => req.body[field]);

  if (fieldsToUpdate.length === 0) {
    res.status(400).json({ error: "Nessun campo con valore valido fornito" });
    return;
  }
  console.log("fieldsToUpdate: " + fieldsToUpdate);

  const query = `UPDATE blog SET ${fieldsToUpdate.map((field) => `${field} = ?`).join(", ")} WHERE Slug = ?`;
  const values = [...fieldsToUpdate.map((field) => req.body[field]), cod];

  // console.log("Server values: " + values);

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error("Errore nell'aggiornamento dei dati:", err);
      res.status(500).json({ error: "Errore nel server" });
      return;
    }

    // console.log("Dati aggiornati con successo");
    res.json({ message: "Dati aggiornati con successo" });
  });
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
