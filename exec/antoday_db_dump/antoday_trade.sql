-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: antoday
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `trade`
--

DROP TABLE IF EXISTS `trade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trade` (
  `trade_pk` bigint NOT NULL,
  `ai_analyze` text,
  `cnt` int NOT NULL,
  `is_deleted` tinyint DEFAULT '0',
  `option_buy_sell` tinyint DEFAULT NULL,
  `price` int NOT NULL,
  `reason` text,
  `trade_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `stock_code` varchar(255) DEFAULT NULL,
  `social_id` bigint DEFAULT NULL,
  PRIMARY KEY (`trade_pk`),
  KEY `FKku5fsvo4xp4u8ahlpstpq3rkh` (`stock_code`),
  KEY `FKklgjlbycpfhc9clsu69f6lael` (`social_id`),
  CONSTRAINT `FKklgjlbycpfhc9clsu69f6lael` FOREIGN KEY (`social_id`) REFERENCES `user` (`social_id`),
  CONSTRAINT `FKku5fsvo4xp4u8ahlpstpq3rkh` FOREIGN KEY (`stock_code`) REFERENCES `stock` (`stock_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trade`
--

LOCK TABLES `trade` WRITE;
/*!40000 ALTER TABLE `trade` DISABLE KEYS */;
INSERT INTO `trade` VALUES (554,NULL,5,0,0,25300,'string','2023-09-18 12:41:16.000000','2023-10-05 22:32:48.163023','000880',3015700161),(555,NULL,10,0,0,37300,'','2023-09-18 12:41:16.000000','2023-10-05 22:33:35.853254','000720',3015700161),(558,NULL,5,0,1,26100,'악재 이슈가 있어서 미리 매도함','2023-09-20 18:41:16.000000','2023-10-05 22:37:43.400790','000880',3015700161),(561,NULL,3,0,0,145300,'string','2023-09-20 12:41:16.000000','2023-10-05 22:35:37.963747','068270',3015700161),(563,NULL,30,0,0,3015,'','2023-09-20 12:41:16.000000','2023-10-05 22:38:21.251844','288980',3015700161),(567,'당신의 이유가 유효한지 분석하기 위해 조금 더 정보가 필요합니다. 이유를 좀 더 자세히 설명해주시겠어요?',6,0,0,45050,'','2023-09-22 09:41:16.000000','2023-10-05 14:15:18.081489','035720',3015700161),(570,NULL,5,0,1,3060,'string','2023-09-22 12:41:16.000000','2023-10-05 22:39:39.866721','288980',3015700161),(571,NULL,4,0,0,68800,'우량주라 꾸준히 매수 중이다.','2023-09-22 09:41:16.000000','2023-10-05 23:02:57.235860','005930',3015700161),(575,NULL,10,0,1,37200,'string','2023-09-27 12:41:16.000000','2023-10-05 22:42:10.380744','000720',3015700161),(576,NULL,5,0,0,137400,'string','2023-09-27 12:41:16.000000','2023-10-05 22:52:42.985695','009150',3015700161),(577,NULL,2,0,0,69400,'string','2023-09-25 12:41:16.000000','2023-10-05 22:54:58.870845','005930',3015700161),(578,'분석 결과, 당신이 매수한 이유는 유효한 이유입니다. 삼성전자는 새로운 반도체 기술 개발 이슈와 관련하여 호재가 될 것으로 판단되기 때문에 매수한 것은 합리적입니다. 또한, 관련 키워드인 \'반도체\', \'수출 회복\', \'메모리\'는 삼성전자와 관련이 있으며, 향후 주가에 긍정적인 영향을 줄 수 있는 요소들입니다. 현재 시점에서는 매수한 것이 적절한 결정이었을 것으로 판단됩니다.',2,0,1,69800,'새로운 반도체 기술 개발 이슈가 있어서 호재라 판단하고 매수하였음','2023-10-04 00:41:16.000000','2023-10-05 14:14:15.053650','005930',3015700161),(580,NULL,4,1,0,113900,'두산로보틱스 공모주 이슈가 있어 주가 상승이 예상된다.','2023-10-04 18:41:16.000000','2023-10-05 23:02:00.980041','000150',3015700161);
/*!40000 ALTER TABLE `trade` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-05 23:57:58
