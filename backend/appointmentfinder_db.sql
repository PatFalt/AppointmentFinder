-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 05, 2022 at 08:50 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `appointmentfinder_db`
--
CREATE DATABASE IF NOT EXISTS `appointmentfinder_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `appointmentfinder_db`;

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `commentID` int(11) NOT NULL,
  `f_userID` int(11) NOT NULL,
  `f_eventID` int(11) NOT NULL,
  `text` varchar(140) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `eventID` int(11) NOT NULL,
  `open` tinyint(1) NOT NULL DEFAULT 1,
  `name` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `closeDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`eventID`, `open`, `name`, `description`, `closeDate`) VALUES
(48, 1, 'test3', 'qweqwe', '2022-05-01'),
(51, 1, '1313', '1313', '2022-05-05'),
(52, 1, 'new', 'test', '2022-05-11'),
(53, 1, '123124', '124124125', '2022-05-19'),
(54, 1, 'ad', 'asd', '2022-05-05'),
(55, 1, 'next', '1515', '2022-05-06'),
(56, 1, 'ok', '14', '2022-05-05'),
(57, 1, 'rqrqr', 'qwerg', '2022-05-13');

-- --------------------------------------------------------

--
-- Table structure for table `options`
--

CREATE TABLE `options` (
  `optionID` int(11) NOT NULL,
  `f_eventID` int(11) NOT NULL,
  `date` date NOT NULL,
  `timeStart` time NOT NULL,
  `timeEnd` time NOT NULL,
  `voteCount` int(11) DEFAULT 0 COMMENT 'count of votes'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `options`
--

INSERT INTO `options` (`optionID`, `f_eventID`, `date`, `timeStart`, `timeEnd`, `voteCount`) VALUES
(9, 0, '2022-04-28', '12:12:00', '13:13:00', 0),
(13, 48, '2022-05-01', '12:12:00', '13:13:00', 0),
(19, 51, '2022-05-12', '12:12:00', '13:13:00', 0),
(20, 52, '2022-05-05', '12:12:00', '13:13:00', 0),
(21, 53, '2022-05-05', '12:12:00', '13:13:00', 0),
(22, 53, '2022-05-06', '12:12:00', '13:13:00', 0),
(23, 53, '2022-05-07', '13:14:00', '14:14:00', 0),
(24, 54, '2022-05-05', '12:12:00', '13:13:00', 0),
(25, 55, '2022-05-05', '13:13:00', '14:14:00', 0),
(26, 56, '2022-05-12', '12:12:00', '13:13:00', 0);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userID` int(11) NOT NULL,
  `name` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `vote`
--

CREATE TABLE `vote` (
  `f_userID` int(11) NOT NULL,
  `f_optionID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`commentID`),
  ADD KEY `FOREIGN` (`f_eventID`,`f_userID`) USING BTREE;

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`eventID`);

--
-- Indexes for table `options`
--
ALTER TABLE `options`
  ADD PRIMARY KEY (`optionID`),
  ADD KEY `FOREIGN` (`f_eventID`) USING BTREE;

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userID`);

--
-- Indexes for table `vote`
--
ALTER TABLE `vote`
  ADD KEY `FOREIGN` (`f_userID`,`f_optionID`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `commentID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `event`
--
ALTER TABLE `event`
  MODIFY `eventID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `options`
--
ALTER TABLE `options`
  MODIFY `optionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
