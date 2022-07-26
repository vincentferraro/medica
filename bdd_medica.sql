-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Feb 11, 2022 at 11:21 AM
-- Server version: 5.7.30
-- PHP Version: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `bdd_medica`
--

-- --------------------------------------------------------

--
-- Table structure for table `docteur`
--

CREATE TABLE `docteur` (
  `id_docteur` int(11) NOT NULL,
  `nom` varchar(32) NOT NULL,
  `prenom` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `docteur`
--

INSERT INTO `docteur` (`id_docteur`, `nom`, `prenom`) VALUES
(1, 'Mabhoul', 'Jean'),
(2, 'House', 'Gregory'),
(3, 'Greys', 'Meredith'),
(4, 'Norbert', 'Yves');

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE `patient` (
  `id_patient` int(11) NOT NULL,
  `nom` varchar(32) NOT NULL,
  `prenom` varchar(32) NOT NULL,
  `mail` varchar(32) NOT NULL,
  `telephone` varchar(32) NOT NULL,
  `login` varchar(32) NOT NULL,
  `pass` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`id_patient`, `nom`, `prenom`, `mail`, `telephone`, `login`, `pass`) VALUES
(1, 'AAA', 'BBB', 'AAA', '303030303', '', ''),
(2, 'AAA', 'BBB', 'AAA', '303030303', '', ''),
(3, 'test', 'test', 'test', '213', '', ''),
(4, 'ccc', 'cc', 'cc', '22', 'cc', 'cc'),
(7, 'Vincent', 'Ferraro', 'v.fee', '22', 'vferr', 'vfera'),
(8, 'Ferraro', 'Nahil', 'v@fee', '333', 'Nahil', 'Nahil'),
(9, 'Kad', 'Kad', 'k@k', '233', 'Kad', 'Kad'),
(10, 'zz', 'zz', 'zz', '0', 'zz', 'zz'),
(11, 'ee', 'ee', 'ee', '0', 'ee', 'ee'),
(12, 'Vincent', 'Ferraro', 'aa@aa.fr', '0618000000', 'Vincent', 'Vincent'),
(15, 'Nah', 'Nah', 'Nah', '333', 'Nah', 'Nah'),
(16, 'Kadi', 'Kadi', 'Kad@kad.com', '33333', 'Kadi', 'Kadi');

-- --------------------------------------------------------

--
-- Table structure for table `rdv`
--

CREATE TABLE `rdv` (
  `id_rdv` int(11) NOT NULL,
  `date` date NOT NULL,
  `heure` varchar(32) NOT NULL,
  `motif` varchar(100) NOT NULL,
  `id_docteur` int(11) NOT NULL,
  `id_patient` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `rdv`
--

INSERT INTO `rdv` (`id_rdv`, `date`, `heure`, `motif`, `id_docteur`, `id_patient`) VALUES
(12, '2022-02-11', '17:30', '', 4, 4),
(15, '2022-02-12', '15:30', '', 1, 4),
(16, '2022-02-14', '11:00', '', 4, 4),
(17, '2022-02-11', '16:00', '', 3, 4),
(19, '2022-02-15', '10:30', '', 1, 16),
(20, '2022-02-15', '13:30', '', 1, 16),
(21, '2022-02-15', '14:00', '', 1, 16),
(22, '2022-02-15', '15:30', '', 1, 16),
(23, '2022-02-16', '12:30', '', 2, 12),
(25, '2022-02-24', '12:30', '', 4, 12),
(26, '2022-02-15', '18:00', '', 1, 12);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `docteur`
--
ALTER TABLE `docteur`
  ADD PRIMARY KEY (`id_docteur`);

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`id_patient`);

--
-- Indexes for table `rdv`
--
ALTER TABLE `rdv`
  ADD PRIMARY KEY (`id_rdv`),
  ADD KEY `FOREIGN` (`id_patient`) USING BTREE,
  ADD KEY `FOREIGN KEY` (`id_docteur`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `patient`
--
ALTER TABLE `patient`
  MODIFY `id_patient` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `rdv`
--
ALTER TABLE `rdv`
  MODIFY `id_rdv` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `rdv`
--
ALTER TABLE `rdv`
  ADD CONSTRAINT `rdv_ibfk_1` FOREIGN KEY (`id_patient`) REFERENCES `patient` (`id_patient`);
