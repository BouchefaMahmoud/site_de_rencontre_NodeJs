-- phpMyAdmin SQL Dump
-- version 4.8.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le :  Dim 17 mars 2019 à 23:48
-- Version du serveur :  10.1.31-MariaDB
-- Version de PHP :  7.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `dm_web`
--

-- --------------------------------------------------------

--
-- Structure de la table `adresse`
--

CREATE TABLE `adresse` (
  `id_adresse` int(10) NOT NULL,
  `pays` varchar(255) DEFAULT NULL,
  `ville` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `ami`
--

CREATE TABLE `ami` (
  `id_pers` int(11) DEFAULT NULL,
  `id_profil` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `ami`
--

INSERT INTO `ami` (`id_pers`, `id_profil`) VALUES
(13, 6),
(13, 7),
(13, 8),
(13, 9);

-- --------------------------------------------------------

--
-- Structure de la table `commentaire`
--

CREATE TABLE `commentaire` (
  `id_image` varchar(255) NOT NULL,
  `id_profil` int(10) NOT NULL,
  `com_at` datetime NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `commentaire`
--

INSERT INTO `commentaire` (`id_image`, `id_profil`, `com_at`, `content`) VALUES
('image-1552583095790.jpeg', 13, '2019-03-17 00:00:00', 'Ok, that works'),
('photo-1552582318220.jpeg', 13, '2019-03-17 00:00:00', 'ceci est un comentaire ');

-- --------------------------------------------------------

--
-- Structure de la table `image`
--

CREATE TABLE `image` (
  `id_image` varchar(255) NOT NULL,
  `description` text,
  `likes` int(10) DEFAULT NULL,
  `id_profil` int(11) DEFAULT NULL,
  `date_img` date DEFAULT NULL,
  `type` varchar(1) NOT NULL DEFAULT 'p'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `image`
--

INSERT INTO `image` (`id_image`, `description`, `likes`, `id_profil`, `date_img`, `type`) VALUES
('1546456451', 'best freinds ever', -1, 7, '2019-03-14', 'p'),
('1552581390677', 'ceci est un poste', -1, 7, '2019-03-14', 'p'),
('1552581494651', 'ceci est un poste', 1, 7, '2019-03-14', 'p'),
('1552583080066', 'Ceci est un poste', -1, 13, '2019-03-14', 'p'),
('1552583087112', 'ceci est un autre poste', -1, 13, '2019-03-14', 'p'),
('1552672519598', 'ceci est un post', 0, 13, '2019-03-15', 'p'),
('1552672602836', 'ceci est un autre poste ;) ', 0, 13, '2019-03-15', 'p'),
('1552672705363', 'je rajoute un autre poste  ! ', 0, 13, '2019-03-15', 'p'),
('1552672852985', 'ceci est un autre poste ;) ', 0, 13, '2019-03-15', 'p'),
('1552672909362', 'ceci est autre poste ;)', -1, 13, '2019-03-15', 'p'),
('1552672990750', '', 0, 13, '2019-03-15', 'p'),
('1552673014860', 'ceci est un autre poste putain', 0, 13, '2019-03-15', 'p'),
('1552673132268', 'ceci est un post\r\n', 0, 13, '2019-03-15', 'p'),
('1552673186606', 'test', 0, 13, '2019-03-15', 'p'),
('1552673427936', 'je vais ajouter un autre poste', 0, 13, '2019-03-15', 'p'),
('1552760210615', 'c\'est juste du text', 0, 7, '2019-03-16', 'p'),
('1552823632506', 'je rajoute un poste ok ok ok', 0, 13, '2019-03-17', 'p'),
('default-user.png', 'default-user', 0, NULL, NULL, 'p'),
('image-1552583095790.jpeg', 'ceci est un 3 eme poste ', 0, 13, '2019-03-14', 'i'),
('image-1552661599899.jpeg', '', 0, 13, '2019-03-15', 'i'),
('image-1552671375033.png', 'Planète terre', 0, 13, '2019-03-15', 'i'),
('image-1552672456878.jpeg', 'univers', 0, 13, '2019-03-15', 'i'),
('image-1552673033119.png', 'test', 0, 13, '2019-03-15', 'i'),
('image-1552680194180.jpeg', 'terre', 0, 13, '2019-03-15', 'i'),
('image-1552760078439.jpeg', 'ok', 0, 7, '2019-03-16', 'i'),
('photo-1552503627943.jpeg', 'Image de profile', 0, 7, '2019-03-13', 'i'),
('photo-1552571391126.jpeg', 'Image de profile', 0, 10, '2019-03-14', 'i'),
('photo-1552575418906.jpeg', 'Image de profile', 0, 11, '2019-03-14', 'i'),
('photo-1552576991372.jpeg', 'Image de profile', 0, 12, '2019-03-14', 'i'),
('photo-1552582318220.jpeg', 'Image de profile', 0, 13, '2019-03-14', 'i');

-- --------------------------------------------------------

--
-- Structure de la table `profil`
--

CREATE TABLE `profil` (
  `id_profil` int(10) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `sexe` varchar(10) DEFAULT NULL,
  `age` int(3) DEFAULT NULL,
  `situation` varchar(100) DEFAULT NULL,
  `description` text,
  `pays` varchar(255) DEFAULT NULL,
  `ville` varchar(255) DEFAULT NULL,
  `taille` float DEFAULT NULL,
  `profession` varchar(255) DEFAULT NULL,
  `interesse` varchar(20) DEFAULT NULL,
  `pwd` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `profil`
--

INSERT INTO `profil` (`id_profil`, `nom`, `prenom`, `sexe`, `age`, `situation`, `description`, `pays`, `ville`, `taille`, `profession`, `interesse`, `pwd`, `username`) VALUES
(1, '', '', 'M', NULL, NULL, NULL, 'Algérie', 'Béjaia', 1.75, NULL, 'Femmes', 'moudmah', ''),
(2, '', '', 'M', NULL, NULL, NULL, 'wakanda', 'paris', 1.75, NULL, 'femmes', 'rudy', ''),
(3, '', '', 'm', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'moudmah', 'moudmah'),
(5, '', '', 'Masculin', NULL, NULL, NULL, 'Algérie', 'Béjaia', 1.75, NULL, 'Femmes', '123', 'moudmah'),
(6, '', '', 'Masculin', NULL, NULL, NULL, 'Algérie', 'Béjaia', 1.75, NULL, 'Femmes', '123', 'jhgikjh'),
(7, '', '', 'Masculin', NULL, NULL, NULL, 'Algérie', 'Béjaia', 1, NULL, 'Femmes', 'latif', 'latif'),
(8, '', '', 'Masculin', NULL, NULL, NULL, 'jklgb', 'lkhlhlkh', 1.45, NULL, 'Hommes', 'latifa', 'latifa'),
(9, '', '', 'Masculin', NULL, NULL, NULL, 'qsdfsd', 'qsdfzedf', 4.45, NULL, 'Hommes', '123', 'lqhkqsflqh'),
(10, '', '', 'Masculin', NULL, NULL, NULL, '', '', 0, NULL, '', '', 'Mahmoud'),
(11, '', '', 'Masculin', NULL, NULL, NULL, '', '', 0, NULL, '', '', 'test'),
(12, 'bouchefa', 'Mahmoud', 'Masculin', NULL, NULL, NULL, '', '', 0, NULL, '', '', 'test2'),
(13, 'Bouchefa', 'Mahmoud', 'Masculin', 23, 'Célibataire', NULL, 'Algérie', 'Béjaia', 1.75, 'Etudiant', 'Femmes', 'm', 'mabchf55'),
(14, '', '', 'Masculin', NULL, NULL, NULL, 'test', 'test', 1.45, NULL, '', 'test', 'test'),
(15, '', '', 'Masculin', NULL, NULL, NULL, 'test', 'test', 1.45, NULL, '', '', 'test'),
(16, '', '', 'Masculin', NULL, NULL, NULL, '', '', 0, NULL, '', 'moudmah', 'moudmah'),
(17, '', '', 'Masculin', NULL, NULL, NULL, '', '', 0, NULL, '', '', 'moudmah'),
(18, '', '', 'Masculin', NULL, NULL, NULL, '', '', 0, NULL, '', '', 'moudmah'),
(19, '', '', 'Masculin', NULL, NULL, NULL, '', '', 0, NULL, '', '', 'moudmah'),
(20, '', '', 'Masculin', NULL, NULL, NULL, '', '', 0, NULL, '', '', 'moudmah'),
(21, '', '', 'Masculin', NULL, NULL, NULL, '', '', 0, NULL, '', 'mmm', 'latif');

-- --------------------------------------------------------

--
-- Structure de la table `profil_img`
--

CREATE TABLE `profil_img` (
  `id_profil` int(10) NOT NULL,
  `id_image` varchar(255) NOT NULL,
  `type` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `profil_img`
--

INSERT INTO `profil_img` (`id_profil`, `id_image`, `type`) VALUES
(6, 'default-user.png', 'p'),
(8, 'default-user.png', 'p'),
(9, 'default-user.png', 'p'),
(14, 'default-user.png', 'p'),
(15, 'default-user.png', 'p'),
(16, 'default-user.png', 'p'),
(17, 'default-user.png', 'p'),
(18, 'default-user.png', 'p'),
(19, 'default-user.png', 'p'),
(20, 'default-user.png', 'p'),
(21, 'default-user.png', 'p'),
(7, 'photo-1552503627943.jpeg', 'p'),
(10, 'photo-1552571391126.jpeg', 'p'),
(11, 'photo-1552575418906.jpeg', 'p'),
(12, 'photo-1552576991372.jpeg', 'p'),
(13, 'photo-1552582318220.jpeg', 'p');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `adresse`
--
ALTER TABLE `adresse`
  ADD PRIMARY KEY (`id_adresse`);

--
-- Index pour la table `ami`
--
ALTER TABLE `ami`
  ADD KEY `id_pers` (`id_pers`),
  ADD KEY `id_profil` (`id_profil`);

--
-- Index pour la table `commentaire`
--
ALTER TABLE `commentaire`
  ADD PRIMARY KEY (`id_image`,`id_profil`,`com_at`),
  ADD KEY `id_profil` (`id_profil`);

--
-- Index pour la table `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`id_image`),
  ADD KEY `id_profil` (`id_profil`);

--
-- Index pour la table `profil`
--
ALTER TABLE `profil`
  ADD PRIMARY KEY (`id_profil`);

--
-- Index pour la table `profil_img`
--
ALTER TABLE `profil_img`
  ADD PRIMARY KEY (`id_profil`,`type`),
  ADD KEY `id_image` (`id_image`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `adresse`
--
ALTER TABLE `adresse`
  MODIFY `id_adresse` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `profil`
--
ALTER TABLE `profil`
  MODIFY `id_profil` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `ami`
--
ALTER TABLE `ami`
  ADD CONSTRAINT `ami_ibfk_1` FOREIGN KEY (`id_pers`) REFERENCES `profil` (`id_profil`),
  ADD CONSTRAINT `ami_ibfk_2` FOREIGN KEY (`id_profil`) REFERENCES `profil` (`id_profil`);

--
-- Contraintes pour la table `commentaire`
--
ALTER TABLE `commentaire`
  ADD CONSTRAINT `commentaire_ibfk_1` FOREIGN KEY (`id_image`) REFERENCES `image` (`id_image`),
  ADD CONSTRAINT `commentaire_ibfk_2` FOREIGN KEY (`id_profil`) REFERENCES `profil` (`id_profil`);

--
-- Contraintes pour la table `image`
--
ALTER TABLE `image`
  ADD CONSTRAINT `image_ibfk_1` FOREIGN KEY (`id_profil`) REFERENCES `profil` (`id_profil`);

--
-- Contraintes pour la table `profil_img`
--
ALTER TABLE `profil_img`
  ADD CONSTRAINT `profil_img_ibfk_1` FOREIGN KEY (`id_profil`) REFERENCES `profil` (`id_profil`),
  ADD CONSTRAINT `profil_img_ibfk_2` FOREIGN KEY (`id_image`) REFERENCES `image` (`id_image`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
