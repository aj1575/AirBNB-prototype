-- MySQL dump 10.13  Distrib 9.4.0, for macos15.4 (arm64)
--
-- Host: localhost    Database: airbnb_db
-- ------------------------------------------------------
-- Server version	9.4.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `property_id` int NOT NULL,
  `traveler_id` int NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `guests` int NOT NULL,
  `total_price` decimal(10,2) DEFAULT NULL,
  `status` enum('pending','accepted','cancelled') DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_bookings_dates` (`start_date`,`end_date`),
  KEY `idx_bookings_status` (`status`),
  KEY `idx_bookings_traveler` (`traveler_id`),
  KEY `idx_bookings_property` (`property_id`),
  CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE,
  CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`traveler_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (5,2,3,'2025-10-27','2025-10-29',1,700.00,'accepted','2025-10-27 19:57:38','2025-10-27 19:57:50'),(6,2,2,'2025-09-15','2025-09-18',2,1050.00,'accepted','2025-09-01 17:00:00','2025-10-27 20:18:45'),(7,4,2,'2025-08-20','2025-08-23',1,375.00,'accepted','2025-08-05 21:30:00','2025-10-27 20:18:45'),(8,6,2,'2025-07-10','2025-07-14',3,720.00,'accepted','2025-06-25 16:15:00','2025-10-27 20:18:45'),(9,4,4,'2025-10-29','2025-10-30',1,125.00,'accepted','2025-10-28 04:37:57','2025-10-28 04:42:11'),(10,3,3,'2025-10-29','2025-10-30',1,450.00,'cancelled','2025-10-28 05:53:40','2025-10-28 05:54:09'),(11,3,3,'2025-10-30','2025-11-02',1,1350.00,'accepted','2025-10-30 07:06:13','2025-10-30 07:06:28'),(12,9,8,'2025-10-31','2025-11-01',1,200.00,'cancelled','2025-10-30 21:48:26','2025-10-30 21:48:45'),(13,9,8,'2025-10-31','2025-11-04',3,800.00,'accepted','2025-10-30 21:49:23','2025-10-30 21:50:04');
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorites`
--

DROP TABLE IF EXISTS `favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorites` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `property_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_favorite` (`user_id`,`property_id`),
  KEY `property_id` (`property_id`),
  CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `favorites_ibfk_2` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorites`
--

LOCK TABLES `favorites` WRITE;
/*!40000 ALTER TABLE `favorites` DISABLE KEYS */;
INSERT INTO `favorites` VALUES (5,4,3,'2025-10-28 04:39:51'),(6,3,3,'2025-10-28 04:58:31'),(8,3,4,'2025-10-28 05:19:27');
/*!40000 ALTER TABLE `favorites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `properties`
--

DROP TABLE IF EXISTS `properties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `properties` (
  `id` int NOT NULL AUTO_INCREMENT,
  `owner_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(50) NOT NULL,
  `location` varchar(255) NOT NULL,
  `description` text,
  `pricing` decimal(10,2) NOT NULL,
  `bedrooms` int NOT NULL,
  `bathrooms` int NOT NULL,
  `amenities` text,
  `photos` text,
  `max_guests` int DEFAULT '1',
  `available` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `owner_id` (`owner_id`),
  KEY `idx_properties_location` (`location`),
  CONSTRAINT `properties_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `properties`
--

LOCK TABLES `properties` WRITE;
/*!40000 ALTER TABLE `properties` DISABLE KEYS */;
INSERT INTO `properties` VALUES (2,1,'Luxury Downtown ','Loft','San Francisco, CA','Modern loft in the heart of downtown with stunning city views. Perfect for business travelers and couples.',350.00,2,2,'WiFi,Kitchen,Air Conditioning,Heating,Washer,Dryer','/uploads/properties/1760481080102-367450083.jpeg,/uploads/properties/1760481096843-270141722.jpeg',4,1,'2025-10-27 19:51:54','2025-10-28 04:42:03'),(3,1,'Cozy Beach House','House','Santa Monica, CA','Beautiful beach house just steps from the ocean. Enjoy sunset views from your private deck.',450.00,3,2,'WiFi,Kitchen,Parking,Air Conditioning,Washer,Dryer','/uploads/properties/1760481108924-180376316.jpg,/uploads/properties/1760481122754-149273312.jpg',6,1,'2025-10-27 19:51:54','2025-10-27 19:51:54'),(4,1,'Modern Studio Downtown','Studio','Los Angeles, CA','Sleek studio apartment in downtown LA. Walking distance to restaurants, shops, and entertainment.',125.00,1,1,'WiFi,Kitchen,Air Conditioning,Heating','/uploads/properties/1760481175494-399605326.webp',2,1,'2025-10-27 19:51:54','2025-10-27 19:51:54'),(5,1,'Spacious Family Villa','Villa','Malibu, CA','Stunning 5-bedroom villa with private pool, ocean views, and luxury amenities. Perfect for families and groups.',800.00,5,4,'WiFi,Kitchen,Parking,Pool,Air Conditioning,Heating,Washer,Dryer','/uploads/properties/1760481190375-104177279.jpg,/uploads/properties/1760481080102-367450083.jpeg',10,1,'2025-10-27 19:51:54','2025-10-27 19:51:54'),(6,1,'Charming Garden Cottage','House','Pasadena, CA','Quaint cottage surrounded by beautiful gardens. Peaceful retreat close to Old Town Pasadena.',180.00,2,1,'WiFi,Kitchen,Parking,Air Conditioning,Pet Friendly','/uploads/properties/1760481096843-270141722.jpeg,/uploads/properties/1760481108924-180376316.jpg',4,1,'2025-10-27 19:51:54','2025-10-27 19:51:54'),(7,1,'Penthouse with City Views','Condo','San Diego, CA','Luxurious penthouse with panoramic city and bay views. High-end finishes throughout.',550.00,3,3,'WiFi,Kitchen,Parking,Gym,Air Conditioning,Heating,Washer,Dryer','/uploads/properties/1760481122754-149273312.jpg,/uploads/properties/1760481175494-399605326.webp',6,1,'2025-10-27 19:51:54','2025-10-27 19:51:54'),(9,9,'new prop','House','Seattle, WA','house f or test',200.00,2,1,'WiFi,Pool,Kitchen,Gym','/uploads/properties/1761860840634-860056446.png,/uploads/properties/1761860840641-613674295.png',1,1,'2025-10-30 21:46:58','2025-10-30 21:47:31');
/*!40000 ALTER TABLE `properties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `property_images`
--

DROP TABLE IF EXISTS `property_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `property_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `property_id` int NOT NULL,
  `image_path` varchar(500) NOT NULL,
  `display_order` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `property_id` (`property_id`),
  CONSTRAINT `property_images_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property_images`
--

LOCK TABLES `property_images` WRITE;
/*!40000 ALTER TABLE `property_images` DISABLE KEYS */;
INSERT INTO `property_images` VALUES (1,2,'/uploads/properties/1760481080102-367450083.jpeg',1,'2025-10-30 06:56:07'),(2,2,'/uploads/properties/1760481096843-270141722.jpeg',2,'2025-10-30 06:56:07'),(3,3,'/uploads/properties/1760481108924-180376316.jpg',1,'2025-10-30 06:56:07'),(4,3,'/uploads/properties/1760481122754-149273312.jpg',2,'2025-10-30 06:56:07'),(5,4,'/uploads/properties/1760481175494-399605326.webp',1,'2025-10-30 06:56:07'),(6,4,'/uploads/properties/1760481190375-104177279.jpg',2,'2025-10-30 06:56:07'),(7,5,'/uploads/properties/1760481080102-367450083.jpeg',1,'2025-10-30 06:56:07'),(8,5,'/uploads/properties/1760481096843-270141722.jpeg',2,'2025-10-30 06:56:07'),(9,6,'/uploads/properties/1760481108924-180376316.jpg',1,'2025-10-30 06:56:07'),(10,6,'/uploads/properties/1760481122754-149273312.jpg',2,'2025-10-30 06:56:07'),(11,7,'/uploads/properties/1760481175494-399605326.webp',1,'2025-10-30 06:56:07'),(12,7,'/uploads/properties/1760481190375-104177279.jpg',2,'2025-10-30 06:56:07');
/*!40000 ALTER TABLE `property_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('traveler','owner') NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `profile_picture` varchar(500) DEFAULT NULL,
  `about_me` text,
  `languages` varchar(255) DEFAULT NULL,
  `gender` varchar(20) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'anurag','a@gmail.com','$2b$10$dyEcVL5RAikVDn2rdEqDfemAej1h5zBA.4FLEAT51nI7Yfg0Gegga','owner','1234567890','San Jose','United States',NULL,NULL,NULL,NULL,NULL,'2025-10-14 02:07:24','2025-10-14 02:07:24'),(2,'Yuktaa','yuktaa@test.com','$2b$10$Jl.Yq0Gum5yOMmbmMmBm9.R0ux2eV5uY3du5yUmBcJz8M43DuEBru','traveler',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-10-14 02:10:47','2025-10-14 02:10:47'),(3,'t2','t2@gmail.com','$2b$10$tIyB1/aS/xs.QNB5k8MipuAKXTBbGcIuSqgNWtR8PtWHMbRLRoGpG','traveler',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-10-27 19:57:13','2025-10-27 19:57:13'),(4,'anurag','aj@gmail.com','$2b$10$UzqX/LjinFyj058sQznGTOjMcaUR/pYQQBsNeV0m/s4wehEzLsHqq','traveler',NULL,NULL,NULL,'/uploads/profiles/1761626323194-354135641.png',NULL,NULL,NULL,NULL,'2025-10-28 04:36:50','2025-10-28 04:38:43'),(5,'anurag','ajowner@gmail.com','$2b$10$ggX6tErSsQcI.eNwxH9d/OluS9vhdWdgBZjY0trvu.iDjEDeqyWyi','owner','1234567890','San Jose','United States',NULL,NULL,NULL,NULL,NULL,'2025-10-28 04:40:50','2025-10-28 04:40:50'),(6,'t3','t3@gmail.com','$2b$10$BKs4phBhaUIH.80WHQqiUeaUkPz2KEJF5b0UGYRO.LJ/SKkcu5zLy','traveler',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-10-28 05:50:32','2025-10-28 05:50:32'),(7,'aa2','a2@gmail.com','$2b$10$t.duHld7HFCQuNqR5yWgbuB5qkqduOJ1gZVyyfbau0XjP5RS886j6','owner','1234567890','irvine','united states',NULL,NULL,NULL,NULL,NULL,'2025-10-28 05:52:23','2025-10-28 05:52:23'),(8,'t5','t5@gmail.com','$2b$10$32VBW5cp55ixI883IfefF.D4xwFoP.g0cLZsZSUEkNZnjjYE/zBqu','traveler','1234567890','san francisco','United States','/uploads/profiles/1761860598894-902087050.png','xxgsjxuwbdiuxkiw','English','Male',NULL,'2025-10-30 21:40:54','2025-10-30 21:43:18'),(9,'owner','o2@gmail.com','$2b$10$o8DBdlTLzIMl3v6hauAqd.EfSyVVEkMi/zI8TyDNqDXSEzwgA/Kki','owner','1234567890','seattle','united states','/uploads/profiles/1761860740948-345898890.png',NULL,NULL,NULL,NULL,'2025-10-30 21:45:14','2025-10-30 21:46:01');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-17 20:59:19
