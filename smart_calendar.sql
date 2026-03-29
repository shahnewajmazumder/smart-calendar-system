-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 25, 2025 at 02:38 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `smart_calendar`
--

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `start_time` time DEFAULT '09:00:00',
  `end_time` time DEFAULT '17:00:00',
  `category` enum('festival','national','religious','cultural','personal') NOT NULL,
  `priority` enum('high','medium','low') DEFAULT 'medium',
  `location` varchar(255) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `user_id`, `title`, `description`, `start_date`, `end_date`, `start_time`, `end_time`, `category`, `priority`, `location`, `photo`, `created_at`, `updated_at`) VALUES
(9, 7, 'Brother\'s Day', '', '2025-11-29', '2025-11-30', '09:00:00', '17:00:00', 'festival', 'medium', 'Assam', 'uploads/events/6924d94c620b1.jpg', '2025-11-24 22:16:44', '2025-11-24 22:16:44'),
(10, 9, 'Brother\'s Day', '', '2025-11-27', '2025-11-27', '12:00:00', '17:00:00', 'personal', 'medium', 'Assam', 'uploads/events/6924dcf9aba0b.jpg', '2025-11-24 22:32:25', '2025-11-24 22:32:25'),
(11, 10, 'dffdf', '', '2025-11-14', '2025-11-14', '09:00:00', '17:00:00', 'cultural', 'medium', 'fggfdg', 'uploads/events/6924e97024f66.jpg', '2025-11-24 23:25:36', '2025-11-24 23:25:36'),
(12, 10, 'Father', 'gfhfgh', '2025-11-25', '2025-11-25', '09:00:00', '17:00:00', 'festival', 'medium', 'assam', 'uploads/events/6924e98381c60.jpg', '2025-11-24 23:25:55', '2025-11-24 23:25:55'),
(13, 10, 'dffdf', '', '2025-11-11', '2025-11-11', '09:00:00', '17:00:00', 'national', 'medium', 'fggfdg', '', '2025-11-24 23:43:21', '2025-11-24 23:43:21'),
(14, 10, 'mark', '', '2025-12-01', '2025-12-01', '00:03:00', '20:04:00', 'festival', 'medium', 'assam', 'uploads/events/6924ee800c2fa.jpg', '2025-11-24 23:47:12', '2025-11-24 23:47:12'),
(15, 10, 'man', '', '2025-04-29', '2025-04-29', '09:03:00', '22:00:00', 'festival', 'medium', 'assam', 'uploads/events/6924eeb9dc8b8.jpg', '2025-11-24 23:48:09', '2025-11-24 23:48:09'),
(16, 10, 'dffdf', '', '2025-11-06', '2025-11-06', '09:00:00', '17:00:00', 'personal', 'medium', 'fggfdg', '', '2025-11-25 00:19:10', '2025-11-25 00:19:10'),
(17, 10, 'dffdf', 'juhgj', '2025-11-06', '2025-11-06', '09:00:00', '17:00:00', 'religious', 'medium', '', '', '2025-11-25 00:19:29', '2025-11-25 00:19:29'),
(18, 10, 'markman', '', '2025-12-01', '2025-12-01', '09:00:00', '17:00:00', 'festival', 'medium', 'assam', '', '2025-11-25 00:20:05', '2025-11-25 00:20:05'),
(25, 11, 'Mother', 'dgdgdg', '2027-02-12', '2027-02-12', '09:00:00', '17:00:00', 'religious', 'high', 'fggfdg', 'uploads/events/6924fbf46881f.jpeg', '2025-11-25 00:44:36', '2025-11-25 00:44:36'),
(26, 11, 'Father', '', '2027-02-12', '2027-02-12', '09:00:00', '17:00:00', 'personal', 'medium', 'Assam', 'uploads/events/6924fc1b36c1f.jpeg', '2025-11-25 00:45:15', '2025-11-25 00:45:15'),
(27, 11, 'Father', 'fgfdgd', '2025-11-19', '2025-11-19', '09:00:00', '17:00:00', 'personal', 'medium', 'Assam', 'uploads/events/692502163e179.jpg', '2025-11-25 01:10:46', '2025-11-25 01:10:46'),
(28, 11, 'MyLove', 'fddfdfdf', '2028-02-24', '2028-02-24', '03:00:00', '21:04:00', 'religious', 'medium', 'assam', 'uploads/events/6925029637960.jpeg', '2025-11-25 01:12:54', '2025-11-25 01:12:54'),
(29, 11, 'ytytry', '', '2025-11-20', '2025-11-20', '09:00:00', '17:00:00', 'personal', 'medium', '', '', '2025-11-25 01:33:59', '2025-11-25 01:33:59');

-- --------------------------------------------------------

--
-- Table structure for table `indian_holidays`
--

CREATE TABLE `indian_holidays` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `date` date NOT NULL,
  `end_date` date NOT NULL,
  `category` enum('festival','national','religious','cultural') NOT NULL,
  `location` varchar(255) DEFAULT 'Nationwide',
  `photo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `indian_holidays`
--

INSERT INTO `indian_holidays` (`id`, `title`, `description`, `date`, `end_date`, `category`, `location`, `photo`) VALUES
(1, 'Republic Day', 'Celebration of the Constitution of India', '2024-01-26', '2024-01-26', 'national', 'Nationwide', 'https://images.unsplash.com/photo-1579546929662-711aa81148cf?w=500&h=300&fit=crop'),
(2, 'Holi', 'Festival of colors', '2024-03-25', '2024-03-25', 'festival', 'Nationwide', 'https://images.unsplash.com/photo-1548869207-216df6c2dcc4?w=500&h=300&fit=crop'),
(3, 'Diwali', 'Festival of Lights', '2024-11-01', '2024-11-01', 'festival', 'Nationwide', 'https://images.unsplash.com/photo-1604591259957-7e1e7b2d258f?w=500&h=300&fit=crop'),
(4, 'Eid al-Fitr', 'End of Ramadan', '2024-04-10', '2024-04-10', 'religious', 'Nationwide', 'https://images.unsplash.com/photo-1563298258-c5eee5a881e2?w=500&h=300&fit=crop'),
(5, 'Christmas', 'Birth of Jesus Christ', '2024-12-25', '2024-12-25', 'religious', 'Nationwide', 'https://images.unsplash.com/photo-1543616991-3b31b5d4c4a5?w=500&h=300&fit=crop'),
(6, 'Republic Day', 'Celebration of the Constitution of India', '2024-01-26', '2024-01-26', 'national', 'Nationwide', 'https://images.unsplash.com/photo-1579546929662-711aa81148cf?w=500&h=300&fit=crop'),
(7, 'Holi', 'Festival of colors', '2024-03-25', '2024-03-25', 'festival', 'Nationwide', 'https://images.unsplash.com/photo-1548869207-216df6c2dcc4?w=500&h=300&fit=crop'),
(8, 'Diwali', 'Festival of Lights', '2024-11-01', '2024-11-01', 'festival', 'Nationwide', 'https://images.unsplash.com/photo-1604591259957-7e1e7b2d258f?w=500&h=300&fit=crop'),
(9, 'Eid al-Fitr', 'End of Ramadan', '2024-04-10', '2024-04-10', 'religious', 'Nationwide', 'https://images.unsplash.com/photo-1563298258-c5eee5a881e2?w=500&h=300&fit=crop'),
(10, 'Christmas', 'Birth of Jesus Christ', '2024-12-25', '2024-12-25', 'religious', 'Nationwide', 'https://images.unsplash.com/photo-1543616991-3b31b5d4c4a5?w=500&h=300&fit=crop'),
(11, 'Republic Day', 'Celebration of the Constitution of India coming into effect. Grand parade at Kartavya Path, New Delhi.', '2024-01-26', '2024-01-26', 'national', 'Nationwide, New Delhi', 'https://images.unsplash.com/photo-1579546929662-711aa81148cf?w=600&h=400&fit=crop'),
(12, 'Republic Day', 'Celebration of the Constitution of India coming into effect', '2025-01-26', '2025-01-26', 'national', 'Nationwide, New Delhi', 'https://images.unsplash.com/photo-1579546929662-711aa81148cf?w=600&h=400&fit=crop'),
(13, 'Republic Day', 'Celebration of the Constitution of India coming into effect', '2026-01-26', '2026-01-26', 'national', 'Nationwide, New Delhi', 'https://images.unsplash.com/photo-1579546929662-711aa81148cf?w=600&h=400&fit=crop'),
(14, 'Republic Day', 'Celebration of the Constitution of India coming into effect', '2027-01-26', '2027-01-26', 'national', 'Nationwide, New Delhi', 'https://images.unsplash.com/photo-1579546929662-711aa81148cf?w=600&h=400&fit=crop'),
(15, 'Republic Day', 'Celebration of the Constitution of India coming into effect', '2028-01-26', '2028-01-26', 'national', 'Nationwide, New Delhi', 'https://images.unsplash.com/photo-1579546929662-711aa81148cf?w=600&h=400&fit=crop'),
(16, 'Republic Day', 'Celebration of the Constitution of India coming into effect', '2029-01-26', '2029-01-26', 'national', 'Nationwide, New Delhi', 'https://images.unsplash.com/photo-1579546929662-711aa81148cf?w=600&h=400&fit=crop'),
(17, 'Republic Day', 'Celebration of the Constitution of India coming into effect', '2030-01-26', '2030-01-26', 'national', 'Nationwide, New Delhi', 'https://images.unsplash.com/photo-1579546929662-711aa81148cf?w=600&h=400&fit=crop'),
(18, 'Independence Day', 'Celebration of India independence from British rule. Flag hoisting ceremony at Red Fort, New Delhi.', '2024-08-15', '2024-08-15', 'national', 'Nationwide, New Delhi', 'https://images.unsplash.com/photo-1594736797933-d0401ba94693?w=600&h=400&fit=crop'),
(19, 'Independence Day', 'Celebration of India independence from British rule', '2025-08-15', '2025-08-15', 'national', 'Nationwide, New Delhi', 'https://images.unsplash.com/photo-1594736797933-d0401ba94693?w=600&h=400&fit=crop'),
(20, 'Independence Day', 'Celebration of India independence from British rule', '2026-08-15', '2026-08-15', 'national', 'Nationwide, New Delhi', 'https://images.unsplash.com/photo-1594736797933-d0401ba94693?w=600&h=400&fit=crop'),
(21, 'Independence Day', 'Celebration of India independence from British rule', '2027-08-15', '2027-08-15', 'national', 'Nationwide, New Delhi', 'https://images.unsplash.com/photo-1594736797933-d0401ba94693?w=600&h=400&fit=crop'),
(22, 'Independence Day', 'Celebration of India independence from British rule', '2028-08-15', '2028-08-15', 'national', 'Nationwide, New Delhi', 'https://images.unsplash.com/photo-1594736797933-d0401ba94693?w=600&h=400&fit=crop'),
(23, 'Independence Day', 'Celebration of India independence from British rule', '2029-08-15', '2029-08-15', 'national', 'Nationwide, New Delhi', 'https://images.unsplash.com/photo-1594736797933-d0401ba94693?w=600&h=400&fit=crop'),
(24, 'Independence Day', 'Celebration of India independence from British rule', '2030-08-15', '2030-08-15', 'national', 'Nationwide, New Delhi', 'https://images.unsplash.com/photo-1594736797933-d0401ba94693?w=600&h=400&fit=crop'),
(25, 'Gandhi Jayanti', 'Birth anniversary of Mahatma Gandhi, the Father of the Nation. Prayer meetings at Raj Ghat, New Delhi.', '2024-10-02', '2024-10-02', 'national', 'Nationwide', 'https://images.unsplash.com/photo-1604342050335-8614415a1b4d?w=600&h=400&fit=crop'),
(26, 'Gandhi Jayanti', 'Birth anniversary of Mahatma Gandhi', '2025-10-02', '2025-10-02', 'national', 'Nationwide', 'https://images.unsplash.com/photo-1604342050335-8614415a1b4d?w=600&h=400&fit=crop'),
(27, 'Gandhi Jayanti', 'Birth anniversary of Mahatma Gandhi', '2026-10-02', '2026-10-02', 'national', 'Nationwide', 'https://images.unsplash.com/photo-1604342050335-8614415a1b4d?w=600&h=400&fit=crop'),
(28, 'Gandhi Jayanti', 'Birth anniversary of Mahatma Gandhi', '2027-10-02', '2027-10-02', 'national', 'Nationwide', 'https://images.unsplash.com/photo-1604342050335-8614415a1b4d?w=600&h=400&fit=crop'),
(29, 'Gandhi Jayanti', 'Birth anniversary of Mahatma Gandhi', '2028-10-02', '2028-10-02', 'national', 'Nationwide', 'https://images.unsplash.com/photo-1604342050335-8614415a1b4d?w=600&h=400&fit=crop'),
(30, 'Gandhi Jayanti', 'Birth anniversary of Mahatma Gandhi', '2029-10-02', '2029-10-02', 'national', 'Nationwide', 'https://images.unsplash.com/photo-1604342050335-8614415a1b4d?w=600&h=400&fit=crop'),
(31, 'Gandhi Jayanti', 'Birth anniversary of Mahatma Gandhi', '2030-10-02', '2030-10-02', 'national', 'Nationwide', 'https://images.unsplash.com/photo-1604342050335-8614415a1b4d?w=600&h=400&fit=crop'),
(32, 'Makar Sankranti', 'Harvest festival marking the transition of Sun into Capricorn. Celebrated with kite flying and sweets.', '2024-01-14', '2024-01-15', 'festival', 'Nationwide', 'https://images.unsplash.com/photo-1543161281-2eafc2b8c47f?w=600&h=400&fit=crop'),
(33, 'Pongal', 'Tamil harvest festival celebrating the Sun God. Traditional cooking of Pongal dish.', '2024-01-15', '2024-01-16', 'festival', 'Tamil Nadu', 'https://images.unsplash.com/photo-1577985057584-707d0adc7981?w=600&h=400&fit=crop'),
(34, 'Maha Shivratri', 'Hindu festival dedicated to Lord Shiva. Night-long vigil and fasting.', '2024-03-08', '2024-03-08', 'religious', 'Nationwide', 'https://images.unsplash.com/photo-1587132135057-a91545fa014f?w=600&h=400&fit=crop'),
(35, 'Holi', 'Festival of Colors - Celebration of spring and victory of good over evil.', '2024-03-25', '2024-03-25', 'festival', 'Nationwide', 'https://images.unsplash.com/photo-1548869207-216df6c2dcc4?w=600&h=400&fit=crop'),
(36, 'Holi', 'Festival of Colors - Celebration of spring and victory of good over evil.', '2025-03-14', '2025-03-14', 'festival', 'Nationwide', 'https://images.unsplash.com/photo-1548869207-216df6c2dcc4?w=600&h=400&fit=crop'),
(37, 'Holi', 'Festival of Colors - Celebration of spring and victory of good over evil.', '2026-03-03', '2026-03-03', 'festival', 'Nationwide', 'https://images.unsplash.com/photo-1548869207-216df6c2dcc4?w=600&h=400&fit=crop'),
(38, 'Ram Navami', 'Birthday of Lord Rama. Reading of Ramayana and temple celebrations.', '2024-04-17', '2024-04-17', 'religious', 'Nationwide', 'https://images.unsplash.com/photo-1587132135057-a91545fa014f?w=600&h=400&fit=crop'),
(39, 'Hanuman Jayanti', 'Birth anniversary of Lord Hanuman. Chanting of Hanuman Chalisa.', '2024-04-23', '2024-04-23', 'religious', 'Nationwide', 'https://images.unsplash.com/photo-1587132135057-a91545fa014f?w=600&h=400&fit=crop'),
(40, 'Raksha Bandhan', 'Festival celebrating the bond between brothers and sisters.', '2024-08-19', '2024-08-19', 'festival', 'Nationwide', 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&h=400&fit=crop'),
(41, 'Janmashtami', 'Birth anniversary of Lord Krishna. Dahi Handi competitions and fasting.', '2024-08-26', '2024-08-26', 'religious', 'Nationwide', 'https://images.unsplash.com/photo-1587132135057-a91545fa014f?w=600&h=400&fit=crop'),
(42, 'Ganesh Chaturthi', 'Festival celebrating the birth of Lord Ganesha. Installation of Ganesha idols.', '2024-09-07', '2024-09-07', 'religious', 'Nationwide, especially Maharashtra', 'https://images.unsplash.com/photo-1561135748-4e9c2d6b0c0e?w=600&h=400&fit=crop'),
(43, 'Navratri', 'Nine-night festival dedicated to Goddess Durga. Garba and Dandiya Raas dances.', '2024-10-03', '2024-10-12', 'religious', 'Nationwide', 'https://images.unsplash.com/photo-1573459558040-87a81fbaf6cc?w=600&h=400&fit=crop'),
(44, 'Durga Puja', 'Major festival in West Bengal celebrating Goddess Durga. Elaborate pandals.', '2024-10-09', '2024-10-13', 'religious', 'West Bengal, Eastern India', 'https://images.unsplash.com/photo-1602524812593-20ffc12189d9?w=600&h=400&fit=crop'),
(45, 'Dussehra', 'Celebration of victory of good over evil. Burning of Ravana effigies.', '2024-10-12', '2024-10-12', 'religious', 'Nationwide', 'https://images.unsplash.com/photo-1573459558040-87a81fbaf6cc?w=600&h=400&fit=crop'),
(46, 'Diwali', 'Festival of Lights - Celebration of victory of light over darkness.', '2024-10-31', '2024-10-31', 'festival', 'Nationwide', 'https://images.unsplash.com/photo-1604591259957-7e1e7b2d258f?w=600&h=400&fit=crop'),
(47, 'Diwali', 'Festival of Lights - Celebration of victory of light over darkness.', '2025-10-20', '2025-10-20', 'festival', 'Nationwide', 'https://images.unsplash.com/photo-1604591259957-7e1e7b2d258f?w=600&h=400&fit=crop'),
(48, 'Diwali', 'Festival of Lights - Celebration of victory of light over darkness.', '2026-11-08', '2026-11-08', 'festival', 'Nationwide', 'https://images.unsplash.com/photo-1604591259957-7e1e7b2d258f?w=600&h=400&fit=crop'),
(49, 'Bhai Dooj', 'Festival celebrating brother-sister relationship.', '2024-11-02', '2024-11-02', 'festival', 'Nationwide', 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&h=400&fit=crop'),
(50, 'Chhath Puja', 'Ancient Hindu festival dedicated to Sun God. Ritual bathing and fasting.', '2024-11-07', '2024-11-10', 'religious', 'Bihar, Jharkhand, UP', 'https://images.unsplash.com/photo-1587132135057-a91545fa014f?w=600&h=400&fit=crop'),
(51, 'Eid al-Fitr', 'Islamic festival marking the end of Ramadan. Special prayers and feasts.', '2024-04-11', '2024-04-11', 'religious', 'Nationwide', 'https://images.unsplash.com/photo-1563298258-c5eee5a881e2?w=600&h=400&fit=crop'),
(52, 'Eid al-Fitr', 'Islamic festival marking the end of Ramadan', '2025-03-31', '2025-03-31', 'religious', 'Nationwide', 'https://images.unsplash.com/photo-1563298258-c5eee5a881e2?w=600&h=400&fit=crop'),
(53, 'Eid al-Fitr', 'Islamic festival marking the end of Ramadan', '2026-03-21', '2026-03-21', 'religious', 'Nationwide', 'https://images.unsplash.com/photo-1563298258-c5eee5a881e2?w=600&h=400&fit=crop'),
(54, 'Eid al-Adha', 'Festival of Sacrifice commemorating Prophet Ibrahim', '2024-06-17', '2024-06-17', 'religious', 'Nationwide', 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&h=400&fit=crop'),
(55, 'Eid al-Adha', 'Festival of Sacrifice', '2025-06-07', '2025-06-07', 'religious', 'Nationwide', 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&h=400&fit=crop'),
(56, 'Eid al-Adha', 'Festival of Sacrifice', '2026-05-28', '2026-05-28', 'religious', 'Nationwide', 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&h=400&fit=crop'),
(57, 'Muharram', 'Islamic New Year and mourning of Imam Hussain', '2024-07-07', '2024-07-07', 'religious', 'Nationwide', 'https://images.unsplash.com/photo-1563298258-c5eee5a881e2?w=600&h=400&fit=crop'),
(58, 'Mawlid al-Nabi', 'Birthday of Prophet Muhammad', '2024-09-16', '2024-09-16', 'religious', 'Nationwide', 'https://images.unsplash.com/photo-1563298258-c5eee5a881e2?w=600&h=400&fit=crop'),
(59, 'Christmas', 'Celebration of the birth of Jesus Christ', '2024-12-25', '2024-12-25', 'religious', 'Nationwide', 'https://images.unsplash.com/photo-1543616991-3b31b5d4c4a5?w=600&h=400&fit=crop'),
(60, 'Christmas', 'Celebration of the birth of Jesus Christ', '2025-12-25', '2025-12-25', 'religious', 'Nationwide', 'https://images.unsplash.com/photo-1543616991-3b31b5d4c4a5?w=600&h=400&fit=crop'),
(61, 'Christmas', 'Celebration of the birth of Jesus Christ', '2026-12-25', '2026-12-25', 'religious', 'Nationwide', 'https://images.unsplash.com/photo-1543616991-3b31b5d4c4a5?w=600&h=400&fit=crop'),
(62, 'Christmas', 'Celebration of the birth of Jesus Christ', '2027-12-25', '2027-12-25', 'religious', 'Nationwide', 'https://images.unsplash.com/photo-1543616991-3b31b5d4c4a5?w=600&h=400&fit=crop'),
(63, 'Christmas', 'Celebration of the birth of Jesus Christ', '2028-12-25', '2028-12-25', 'religious', 'Nationwide', 'https://images.unsplash.com/photo-1543616991-3b31b5d4c4a5?w=600&h=400&fit=crop'),
(64, 'Christmas', 'Celebration of the birth of Jesus Christ', '2029-12-25', '2029-12-25', 'religious', 'Nationwide', 'https://images.unsplash.com/photo-1543616991-3b31b5d4c4a5?w=600&h=400&fit=crop'),
(65, 'Christmas', 'Celebration of the birth of Jesus Christ', '2030-12-25', '2030-12-25', 'religious', 'Nationwide', 'https://images.unsplash.com/photo-1543616991-3b31b5d4c4a5?w=600&h=400&fit=crop'),
(66, 'Good Friday', 'Christian holiday commemorating the crucifixion of Jesus', '2024-03-29', '2024-03-29', 'religious', 'Nationwide', 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&h=400&fit=crop'),
(67, 'Good Friday', 'Christian holiday commemorating the crucifixion of Jesus', '2025-04-18', '2025-04-18', 'religious', 'Nationwide', 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&h=400&fit=crop'),
(68, 'Good Friday', 'Christian holiday commemorating the crucifixion of Jesus', '2026-04-03', '2026-04-03', 'religious', 'Nationwide', 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&h=400&fit=crop'),
(69, 'Easter Sunday', 'Celebration of the resurrection of Jesus', '2024-03-31', '2024-03-31', 'religious', 'Nationwide', 'https://images.unsplash.com/photo-1543616991-3b31b5d4c4a5?w=600&h=400&fit=crop'),
(70, 'Easter Sunday', 'Celebration of the resurrection of Jesus', '2025-04-20', '2025-04-20', 'religious', 'Nationwide', 'https://images.unsplash.com/photo-1543616991-3b31b5d4c4a5?w=600&h=400&fit=crop'),
(71, 'Easter Sunday', 'Celebration of the resurrection of Jesus', '2026-04-05', '2026-04-05', 'religious', 'Nationwide', 'https://images.unsplash.com/photo-1543616991-3b31b5d4c4a5?w=600&h=400&fit=crop'),
(72, 'Guru Nanak Jayanti', 'Birth anniversary of Guru Nanak Dev Ji', '2024-11-15', '2024-11-15', 'religious', 'Nationwide', 'https://images.unsplash.com/photo-1587132135057-a91545fa014f?w=600&h=400&fit=crop'),
(73, 'Guru Nanak Jayanti', 'Birth anniversary of Guru Nanak Dev Ji', '2025-11-05', '2025-11-05', 'religious', 'Nationwide', 'https://images.unsplash.com/photo-1587132135057-a91545fa014f?w=600&h=400&fit=crop'),
(74, 'Guru Nanak Jayanti', 'Birth anniversary of Guru Nanak Dev Ji', '2026-10-25', '2026-10-25', 'religious', 'Nationwide', 'https://images.unsplash.com/photo-1587132135057-a91545fa014f?w=600&h=400&fit=crop'),
(75, 'Vaisakhi', 'Sikh New Year and formation of Khalsa', '2024-04-13', '2024-04-13', 'religious', 'Punjab, Nationwide', 'https://images.unsplash.com/photo-1587132135057-a91545fa014f?w=600&h=400&fit=crop'),
(76, 'Vaisakhi', 'Sikh New Year and formation of Khalsa', '2025-04-13', '2025-04-13', 'religious', 'Punjab, Nationwide', 'https://images.unsplash.com/photo-1587132135057-a91545fa014f?w=600&h=400&fit=crop'),
(77, 'Vaisakhi', 'Sikh New Year and formation of Khalsa', '2026-04-13', '2026-04-13', 'religious', 'Punjab, Nationwide', 'https://images.unsplash.com/photo-1587132135057-a91545fa014f?w=600&h=400&fit=crop'),
(78, 'Onam', 'Harvest festival of Kerala', '2024-09-05', '2024-09-05', 'festival', 'Kerala', 'https://images.unsplash.com/photo-1577985057584-707d0adc7981?w=600&h=400&fit=crop'),
(79, 'Onam', 'Harvest festival of Kerala', '2025-08-26', '2025-08-26', 'festival', 'Kerala', 'https://images.unsplash.com/photo-1577985057584-707d0adc7981?w=600&h=400&fit=crop'),
(80, 'Bihu', 'Assamese festival marking the Assamese New Year', '2024-04-14', '2024-04-14', 'festival', 'Assam', 'https://images.unsplash.com/photo-1518834107812-67d4c13d805b?w=600&h=400&fit=crop'),
(81, 'Bihu', 'Assamese festival marking the Assamese New Year', '2025-04-14', '2025-04-14', 'festival', 'Assam', 'https://images.unsplash.com/photo-1518834107812-67d4c13d805b?w=600&h=400&fit=crop'),
(82, 'Bihu', 'Assamese festival marking the Assamese New Year', '2026-04-14', '2026-04-14', 'festival', 'Assam', 'https://images.unsplash.com/photo-1518834107812-67d4c13d805b?w=600&h=400&fit=crop'),
(83, 'Gudi Padwa', 'Marathi New Year', '2024-04-09', '2024-04-09', 'festival', 'Maharashtra', 'https://images.unsplash.com/photo-1577985057584-707d0adc7981?w=600&h=400&fit=crop'),
(84, 'Ugadi', 'Telugu and Kannada New Year', '2024-04-09', '2024-04-09', 'festival', 'Andhra Pradesh, Telangana, Karnataka', 'https://images.unsplash.com/photo-1577985057584-707d0adc7981?w=600&h=400&fit=crop'),
(85, 'Vishu', 'Malayalam New Year', '2024-04-14', '2024-04-14', 'festival', 'Kerala', 'https://images.unsplash.com/photo-1577985057584-707d0adc7981?w=600&h=400&fit=crop'),
(86, 'New Year\'s Day', 'First day of the Gregorian calendar year', '2024-01-01', '2024-01-01', 'cultural', 'Worldwide', 'https://images.unsplash.com/photo-1579546929662-711aa81148cf?w=600&h=400&fit=crop'),
(87, 'New Year\'s Day', 'First day of the Gregorian calendar year', '2025-01-01', '2025-01-01', 'cultural', 'Worldwide', 'https://images.unsplash.com/photo-1579546929662-711aa81148cf?w=600&h=400&fit=crop'),
(88, 'New Year\'s Day', 'First day of the Gregorian calendar year', '2026-01-01', '2026-01-01', 'cultural', 'Worldwide', 'https://images.unsplash.com/photo-1579546929662-711aa81148cf?w=600&h=400&fit=crop'),
(89, 'New Year\'s Day', 'First day of the Gregorian calendar year', '2027-01-01', '2027-01-01', 'cultural', 'Worldwide', 'https://images.unsplash.com/photo-1579546929662-711aa81148cf?w=600&h=400&fit=crop'),
(90, 'New Year\'s Day', 'First day of the Gregorian calendar year', '2028-01-01', '2028-01-01', 'cultural', 'Worldwide', 'https://images.unsplash.com/photo-1579546929662-711aa81148cf?w=600&h=400&fit=crop'),
(91, 'New Year\'s Day', 'First day of the Gregorian calendar year', '2029-01-01', '2029-01-01', 'cultural', 'Worldwide', 'https://images.unsplash.com/photo-1579546929662-711aa81148cf?w=600&h=400&fit=crop'),
(92, 'New Year\'s Day', 'First day of the Gregorian calendar year', '2030-01-01', '2030-01-01', 'cultural', 'Worldwide', 'https://images.unsplash.com/photo-1579546929662-711aa81148cf?w=600&h=400&fit=crop'),
(93, 'Valentine\'s Day', 'Celebration of romance and love', '2024-02-14', '2024-02-14', 'cultural', 'Worldwide', 'https://images.unsplash.com/photo-1518199266807-041125440ab5?w=600&h=400&fit=crop'),
(94, 'Valentine\'s Day', 'Celebration of romance and love', '2025-02-14', '2025-02-14', 'cultural', 'Worldwide', 'https://images.unsplash.com/photo-1518199266807-041125440ab5?w=600&h=400&fit=crop'),
(95, 'Valentine\'s Day', 'Celebration of romance and love', '2026-02-14', '2026-02-14', 'cultural', 'Worldwide', 'https://images.unsplash.com/photo-1518199266807-041125440ab5?w=600&h=400&fit=crop'),
(96, 'International Women\'s Day', 'Global day celebrating women\'s achievements', '2024-03-08', '2024-03-08', 'cultural', 'Worldwide', 'https://images.unsplash.com/photo-1589571894965-d8256af56c2c?w=600&h=400&fit=crop'),
(97, 'International Women\'s Day', 'Global day celebrating women\'s achievements', '2025-03-08', '2025-03-08', 'cultural', 'Worldwide', 'https://images.unsplash.com/photo-1589571894965-d8256af56c2c?w=600&h=400&fit=crop'),
(98, 'International Women\'s Day', 'Global day celebrating women\'s achievements', '2026-03-08', '2026-03-08', 'cultural', 'Worldwide', 'https://images.unsplash.com/photo-1589571894965-d8256af56c2c?w=600&h=400&fit=crop'),
(99, 'Earth Day', 'Global event demonstrating support for environmental protection', '2024-04-22', '2024-04-22', 'cultural', 'Worldwide', 'https://images.unsplash.com/photo-1569163139394-de44cb54d0c8?w=600&h=400&fit=crop'),
(100, 'Earth Day', 'Global event demonstrating support for environmental protection', '2025-04-22', '2025-04-22', 'cultural', 'Worldwide', 'https://images.unsplash.com/photo-1569163139394-de44cb54d0c8?w=600&h=400&fit=crop'),
(101, 'Earth Day', 'Global event demonstrating support for environmental protection', '2026-04-22', '2026-04-22', 'cultural', 'Worldwide', 'https://images.unsplash.com/photo-1569163139394-de44cb54d0c8?w=600&h=400&fit=crop'),
(102, 'Mother\'s Day', 'Celebration honoring mothers and motherhood', '2024-05-12', '2024-05-12', 'cultural', 'Worldwide', 'https://images.unsplash.com/photo-1558618666-fcd25856cd63?w=600&h=400&fit=crop'),
(103, 'Mother\'s Day', 'Celebration honoring mothers and motherhood', '2025-05-11', '2025-05-11', 'cultural', 'Worldwide', 'https://images.unsplash.com/photo-1558618666-fcd25856cd63?w=600&h=400&fit=crop'),
(104, 'Mother\'s Day', 'Celebration honoring mothers and motherhood', '2026-05-10', '2026-05-10', 'cultural', 'Worldwide', 'https://images.unsplash.com/photo-1558618666-fcd25856cd63?w=600&h=400&fit=crop'),
(105, 'Father\'s Day', 'Celebration honoring fathers and fatherhood', '2024-06-16', '2024-06-16', 'cultural', 'Worldwide', 'https://images.unsplash.com/photo-1595435742666-1decd6a5d327?w=600&h=400&fit=crop'),
(106, 'Father\'s Day', 'Celebration honoring fathers and fatherhood', '2025-06-15', '2025-06-15', 'cultural', 'Worldwide', 'https://images.unsplash.com/photo-1595435742666-1decd6a5d327?w=600&h=400&fit=crop'),
(107, 'Father\'s Day', 'Celebration honoring fathers and fatherhood', '2026-06-21', '2026-06-21', 'cultural', 'Worldwide', 'https://images.unsplash.com/photo-1595435742666-1decd6a5d327?w=600&h=400&fit=crop'),
(108, 'Halloween', 'Celebration observed in many countries', '2024-10-31', '2024-10-31', 'cultural', 'Worldwide', 'https://images.unsplash.com/photo-1508361001413-7a89d4d88b3b?w=600&h=400&fit=crop'),
(109, 'Halloween', 'Celebration observed in many countries', '2025-10-31', '2025-10-31', 'cultural', 'Worldwide', 'https://images.unsplash.com/photo-1508361001413-7a89d4d88b3b?w=600&h=400&fit=crop'),
(110, 'Halloween', 'Celebration observed in many countries', '2026-10-31', '2026-10-31', 'cultural', 'Worldwide', 'https://images.unsplash.com/photo-1508361001413-7a89d4d88b3b?w=600&h=400&fit=crop');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password_hash`, `phone`, `bio`, `profile_picture`, `is_active`, `created_at`, `updated_at`) VALUES
(7, 'Sourav', 'Shil', 'sourav143@gmail.com', '$2y$10$IgtB1HzGGEDqAaJrM.8AvemazvauaOAbkTxe79weQepDi3sAqBe6S', '', '', 'uploads/profile_photos/user_7_1764009633.jpeg', 1, '2025-11-24 17:17:57', '2025-11-24 18:40:33'),
(8, 'Souraj', 'Shil', 'sourajshil@gmail.com', '$2y$10$GmX./7T0R3z414V7JIbaFuSneNsfNcNkqd6QzbTUPEI0N9F2R4z/m', '09863113301', 'I am you.', 'uploads/profile_photos/user_8_1764009585.jpg', 1, '2025-11-24 17:33:06', '2025-11-24 18:39:45'),
(9, 'sumi', 'Shil', 'sumi1435@gmail.com', '$2y$10$w0DEQgB0ocDy6rSH2z4RbuzEmQT3fvzSThy5DvWjoOmLVUnYv.Jbq', '', '', 'uploads/profile_photos/user_9_1764023581.jpg', 1, '2025-11-24 22:31:45', '2025-11-24 22:33:01'),
(10, 'My', 'Rest', 'rest1435@gmail.com', '$2y$10$5T0yQj17GJ741pPwx/pCEuv8p2Ep5b2Lex5.J6yJ1aJEwHI94lHMK', '', '', NULL, 1, '2025-11-24 23:25:04', '2025-11-24 23:25:04'),
(11, 'My', 'Rest', 'rest143@gmail.com', '$2y$10$k5fAzLrD58XPGvntIo397ekCcRoAkeSCnEVis515uHxs39TjLnSve', '', '', 'uploads/profile_photos/user_11_1764033982.jpg', 1, '2025-11-25 00:32:24', '2025-11-25 01:26:22'),
(12, 'Suity', 'Rani', 'Suity1435@gmail.com', '$2y$10$pPcvMhgYUdPiYzTQ.tl/y.xVw9Lm1hr9YPYu6ppwdNWSiRA4m9XBu', '', '', NULL, 1, '2025-11-25 01:36:23', '2025-11-25 01:36:23');

-- --------------------------------------------------------

--
-- Table structure for table `user_preferences`
--

CREATE TABLE `user_preferences` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `notification_preference` enum('all','important','none') DEFAULT 'all',
  `timezone` varchar(50) DEFAULT 'UTC',
  `language` varchar(10) DEFAULT 'en',
  `email_updates` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_preferences`
--

INSERT INTO `user_preferences` (`id`, `user_id`, `notification_preference`, `timezone`, `language`, `email_updates`, `created_at`, `updated_at`) VALUES
(7, 7, 'all', 'UTC', 'en', 1, '2025-11-24 17:17:57', '2025-11-24 17:17:57'),
(8, 8, 'all', 'UTC', 'en', 1, '2025-11-24 17:33:06', '2025-11-24 17:33:06'),
(9, 9, 'all', 'UTC', 'en', 1, '2025-11-24 22:31:45', '2025-11-24 22:31:45'),
(10, 10, 'all', 'UTC', 'en', 1, '2025-11-24 23:25:04', '2025-11-24 23:25:04'),
(11, 11, 'all', 'UTC', 'en', 1, '2025-11-25 00:32:24', '2025-11-25 00:32:24'),
(12, 12, 'all', 'UTC', 'en', 1, '2025-11-25 01:36:23', '2025-11-25 01:36:23');

-- --------------------------------------------------------

--
-- Table structure for table `user_sessions`
--

CREATE TABLE `user_sessions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `session_token` varchar(64) NOT NULL,
  `expires_at` datetime NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_sessions`
--

INSERT INTO `user_sessions` (`id`, `user_id`, `session_token`, `expires_at`, `created_at`) VALUES
(35, 8, '43675c567c11e5cc6211739c047b4132d0d0833cc86a4dc4aec44b91dac1f75b', '2025-12-24 19:39:33', '2025-11-24 18:39:33'),
(44, 7, '468ec81766818c5824c76a83cc92377c2c7b91d1bc9af1e313f5ef99cdaa9305', '2025-12-24 23:31:04', '2025-11-24 22:31:04'),
(53, 10, '5ee4c17ce046c89ec823c0b32cc2660ac9d327ea4f81e6e0491cad1814f7145e', '2025-12-25 02:35:24', '2025-11-25 01:35:24'),
(54, 10, 'a2c0d137e6fb667c8edea4988052671f1f21ddb640120fdc1cc770bfa566c81f', '2025-12-25 02:35:24', '2025-11-25 01:35:24'),
(55, 10, 'fe9cff81176c8013753937bcbf6baeca9c90e2a3a62fb94fbe95e70e272ac1fb', '2025-12-25 02:35:24', '2025-11-25 01:35:24'),
(58, 12, '31a9632e0d18ceb1eb9283bc89a0abbea6ec60fbe707b44f4c5e8688e0e83377', '2025-12-25 02:36:56', '2025-11-25 01:36:56');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `indian_holidays`
--
ALTER TABLE `indian_holidays`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_preferences`
--
ALTER TABLE `user_preferences`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_user_preferences` (`user_id`);

--
-- Indexes for table `user_sessions`
--
ALTER TABLE `user_sessions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `session_token` (`session_token`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `indian_holidays`
--
ALTER TABLE `indian_holidays`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `user_preferences`
--
ALTER TABLE `user_preferences`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `user_sessions`
--
ALTER TABLE `user_sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_preferences`
--
ALTER TABLE `user_preferences`
  ADD CONSTRAINT `user_preferences_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_sessions`
--
ALTER TABLE `user_sessions`
  ADD CONSTRAINT `user_sessions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
