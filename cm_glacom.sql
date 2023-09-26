-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Set 26, 2023 alle 16:15
-- Versione del server: 10.4.24-MariaDB
-- Versione PHP: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cm_glacom`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `blog`
--

CREATE TABLE `blog` (
  `idBlog` int(11) NOT NULL,
  `Title` varchar(50) NOT NULL,
  `Slug` varchar(50) NOT NULL,
  `Image` varchar(200) NOT NULL,
  `Description` text NOT NULL,
  `CreatedAt` date NOT NULL,
  `Creator` varchar(50) NOT NULL,
  `Content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `blog`
--

INSERT INTO `blog` (`idBlog`, `Title`, `Slug`, `Image`, `Description`, `CreatedAt`, `Creator`, `Content`) VALUES
(1, 'Storia di molte storie', 'storie-storiate', 'https://picsum.photos/200/300', 'Sviluppare siti web coinvolgenti è la mia passione. Creo codice pulito e design accattivanti per garantire il successo online.', '2023-09-24', 'Giulio Verdi', 'Sono appassionato di sviluppo web e gestione dei social media. Nel mio lavoro quotidiano, mi impegno a creare siti web innovativi che catturino l\'attenzione degli utenti e adottano le ultime tecnologie. Inoltre, come social manager, mi occupo di pianificare strategie di contenuto coinvolgenti per i clienti su Instagram e altre piattaforme. Il mio obiettivo è garantire che ogni post, video, storia o reel abbia un copy accattivante di circa 250 caratteri, arricchito da emoji pertinenti. L\'utilizzo degli hashtag è fondamentale per aumentare la visibilità. Quindi, quando hai bisogno di consigli su codice, copy o hashtag, sono qui per aiutarti a ottenere risultati straordinari!'),
(2, 'Storia di un canguro', 'canguro-story', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Kangaroo_and_joey05.jpg/800px-Kangaroo_and_joey05.jpg', 'Tratta la storia di un canguro che, trovandosi in Australia, decide di volare fino in Antartide per mangiare una carota. ', '2023-09-26', 'Mario Rossi', 'Tratta la storia di un canguro che, trovandosi in Australia, decide di prendere l\'aereo e volare fino in Antartide per mangiare una carota. Durante il suo viaggio epico, incontra una serie di personaggi straordinari, tra cui un pinguino amichevole, una foca curiosa e un gruppo di esploratori polari. Il canguro affronta sfide uniche lungo il percorso, come il freddo glaciale e gli iceberg. Tuttavia, la sua determinazione e il desiderio di assaporare quella carota perfetta lo spingono sempre avanti. Questa avventura straordinaria narra la storia di coraggio, amicizia e la ricerca incrollabile di un obiettivo, dimostrando che anche i viaggi più impensabili possono portare a incredibili scoperte e connessioni inaspettate.');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`idBlog`),
  ADD UNIQUE KEY `slug` (`Slug`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `blog`
--
ALTER TABLE `blog`
  MODIFY `idBlog` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
