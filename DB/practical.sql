-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 22, 2021 at 12:00 PM
-- Server version: 10.4.10-MariaDB
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `practical`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `gender` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `birthDate` varchar(50) NOT NULL,
  `photo` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `gender`, `password`, `birthDate`, `photo`) VALUES
(1, 'Maulikasdf', 'Makadiyaaaaa', 'maulik@gmail.com', 'Male', '$2b$13$qzmhuSZDFOccNYUNRxQdzecV1C/AzjhU/LL74pEHsEwKaZfgENQPi', '3000-12-05', '888.png'),
(2, 'maulik', 'asdfasdf', 'makadiyam.8106@gmail.com', 'Male', '$2b$13$xzIRPIlE3deushigSpRIHOUapRWEWovGe.ZnlmAuCfRWPVx055KZ.', '2000-12-05', 'lake-tekapo-new-zealand-hd-wallpaper_trey-ratcliff.jpg'),
(3, 'asdfasdf', 'asdfasdf', 'raj@gmail.com', 'Male', '$2b$13$gtNupD1RV1fSMGE2lJg7neygp2F1fPt7HmcBjh9OAUf522XVmYJ1W', '2000-12-12', 'lake-tekapo-new-zealand-hd-wallpaper_trey-ratcliff.jpg');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
