-- MySQL Script generated by MySQL Workbench
-- Fri Jun 29 16:11:29 2018
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema coding_collab_db
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `coding_collab_db` ;

-- -----------------------------------------------------
-- Schema coding_collab_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `coding_collab_db` DEFAULT CHARACTER SET latin1 ;
SHOW WARNINGS;
USE `coding_collab_db` ;

-- -----------------------------------------------------
-- Table `coding_collab_db`.`languages`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `coding_collab_db`.`languages` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `coding_collab_db`.`languages` (
  `langID` INT(11) NOT NULL AUTO_INCREMENT,
  `langName` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`langID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

SHOW WARNINGS;
CREATE UNIQUE INDEX `langID` ON `coding_collab_db`.`languages` (`langID` ASC);

SHOW WARNINGS;
CREATE UNIQUE INDEX `langName` ON `coding_collab_db`.`languages` (`langName` ASC);

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `coding_collab_db`.`requests`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `coding_collab_db`.`requests` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `coding_collab_db`.`requests` (
  `requestID` CHAR(36) NOT NULL,
  `requestName` VARCHAR(255) NOT NULL,
  `requestContent` TEXT NOT NULL,
  `requestOpen` TINYINT(1) NOT NULL DEFAULT '0',
  `requestCompleted` TINYINT(1) NOT NULL DEFAULT '0',
  `requestPrice` DECIMAL(10,2) NOT NULL DEFAULT '20.00',
  `requestDueDate` DATETIME NOT NULL,
  `requestCompletedDate` DATETIME NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`requestID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

SHOW WARNINGS;
CREATE UNIQUE INDEX `requestID` ON `coding_collab_db`.`requests` (`requestID` ASC);

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `coding_collab_db`.`requestlanguages`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `coding_collab_db`.`requestlanguages` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `coding_collab_db`.`requestlanguages` (
  `request_lang_id` INT(11) NOT NULL AUTO_INCREMENT,
  `req_id` CHAR(36) NULL DEFAULT NULL,
  `lang_id` INT(11) NULL DEFAULT NULL,
--  `lang_name` VARCHAR(255) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`request_lang_id`),
  CONSTRAINT `LangID - languages`
    FOREIGN KEY (`lang_id`)
    REFERENCES `coding_collab_db`.`languages` (`langID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
--  CONSTRAINT `LangName - languages`
--    FOREIGN KEY (`lang_name`)
--    REFERENCES `coding_collab_db`.`languages` (`langName`)
--    ON DELETE CASCADE
--    ON UPDATE CASCADE,
  CONSTRAINT `ReqID - requests`
    FOREIGN KEY (`req_id`)
    REFERENCES `coding_collab_db`.`requests` (`requestID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

SHOW WARNINGS;
CREATE INDEX `Request ID - requests_idx` ON `coding_collab_db`.`requestlanguages` (`req_id` ASC);

SHOW WARNINGS;
CREATE INDEX `Language ID - languages_idx` ON `coding_collab_db`.`requestlanguages` (`lang_id` ASC);

-- SHOW WARNINGS;
-- CREATE INDEX `Language Name - languages_idx` ON `coding_collab_db`.`requestlanguages` (`lang_name` ASC);

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `coding_collab_db`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `coding_collab_db`.`users` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `coding_collab_db`.`users` (
  `firstName` VARCHAR(255) NOT NULL,
  `lastName` VARCHAR(255) NOT NULL,
  `userName` VARCHAR(255) NOT NULL,
  `userID` CHAR(36) NOT NULL,
  `userPass` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`userID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

SHOW WARNINGS;
CREATE UNIQUE INDEX `userName` ON `coding_collab_db`.`users` (`userName` ASC);

SHOW WARNINGS;
CREATE UNIQUE INDEX `userID` ON `coding_collab_db`.`users` (`userID` ASC);

SHOW WARNINGS;
CREATE UNIQUE INDEX `email` ON `coding_collab_db`.`users` (`email` ASC);

SHOW WARNINGS;

-- -- -----------------------------------------------------
-- -- Table `coding_collab_db`.`userrequests`
-- -- -----------------------------------------------------
-- DROP TABLE IF EXISTS `coding_collab_db`.`userrequests` ;
-- 
-- SHOW WARNINGS;
-- CREATE TABLE IF NOT EXISTS `coding_collab_db`.`userrequests` (
--   `id` INT(11) NOT NULL AUTO_INCREMENT,
--   `user_id` CHAR(36) NOT NULL DEFAULT NULL,
-- --  `user_name` VARCHAR(255) NULL DEFAULT NULL,
--   `request_id` CHAR(36) NULL DEFAULT NULL,
--   `createdAt` DATETIME NOT NULL,
--   `updatedAt` DATETIME NOT NULL,
--   PRIMARY KEY (`id`),
--   CONSTRAINT `RequestID - requests`
--     FOREIGN KEY (`request_id`)
--     REFERENCES `coding_collab_db`.`requests` (`requestID`)
--     ON DELETE CASCADE
--     ON UPDATE CASCADE,
--   CONSTRAINT `UserID - users`
--     FOREIGN KEY (`user_id`)
--     REFERENCES `coding_collab_db`.`users` (`userID`)
--     ON DELETE CASCADE
-- --    ON UPDATE CASCADE,
-- --  CONSTRAINT `UserName - users`
-- --    FOREIGN KEY (`user_name`)
-- --    REFERENCES `coding_collab_db`.`users` (`userName`)
-- --    ON DELETE CASCADE
--     ON UPDATE CASCADE)
-- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = latin1;
-- 
-- SHOW WARNINGS;
-- CREATE INDEX `User ID - users_idx` ON `coding_collab_db`.`userrequests` (`user_id` ASC);
-- 
-- -- SHOW WARNINGS;
-- -- CREATE INDEX `UserName - users_idx` ON `coding_collab_db`.`userrequests` (`user_name` ASC);
-- 
-- SHOW WARNINGS;
-- CREATE INDEX `UserID - requests_idx` ON `coding_collab_db`.`userrequests` (`request_id` ASC);
-- 
-- SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `coding_collab_db`.`requestedby`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `coding_collab_db`.`requestedby` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `coding_collab_db`.`requestedby` (
  `requestedByID` CHAR(36) NOT NULL,
  `requestedByUser_userID` CHAR(36) NOT NULL,
--   `requestedByUser_userName` VARCHAR(255) NOT NULL,
  `requestedID` CHAR(36) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`requestedByID`),
  CONSTRAINT `fk_requestedby_users1`
    FOREIGN KEY (`requestedByUser_userID`)
    REFERENCES `coding_collab_db`.`users` (`userID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
--   CONSTRAINT `fk_requestedby_users2`
--     FOREIGN KEY (`requestedByUser_userName`)
--     REFERENCES `coding_collab_db`.`users` (`userName`)
--     ON DELETE NO ACTION
--     ON UPDATE NO ACTION,
  CONSTRAINT `fk_requestedby_requests2`
    FOREIGN KEY (`requestedID`)
    REFERENCES `coding_collab_db`.`requests` (`requestID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

SHOW WARNINGS;
CREATE UNIQUE INDEX `requestID` ON `coding_collab_db`.`requestedby` (`requestedByID` ASC);

SHOW WARNINGS;
CREATE INDEX `fk_requestedby_users1_idx` ON `coding_collab_db`.`requestedby` (`requestedByUser_userID` ASC);

-- SHOW WARNINGS;
-- CREATE INDEX `fk_requestedby_users2_idx` ON `coding_collab_db`.`requestedby` (`requestedByUser_userName` ASC);

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `coding_collab_db`.`acceptedby`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `coding_collab_db`.`acceptedby` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `coding_collab_db`.`acceptedby` (
  `acceptedByID` CHAR(36) NOT NULL,
  `requestAcceptedBy_userID` CHAR(36) NULL,
--   `requestAcceptedBy_userName` VARCHAR(255) NULL,
  `accepted_requestID` CHAR(36) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`acceptedByID`),
  CONSTRAINT `fk_acceptedby_requests1`
    FOREIGN KEY (`accepted_requestID`)
    REFERENCES `coding_collab_db`.`requests` (`requestID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_acceptedby_users1`
    FOREIGN KEY (`requestAcceptedBy_userID`)
    REFERENCES `coding_collab_db`.`users` (`userID`)
    ON DELETE NO ACTION
--     ON UPDATE NO ACTION,
--   CONSTRAINT `fk_acceptedby_users2`
--     FOREIGN KEY (`requestAcceptedBy_userName`)
--     REFERENCES `coding_collab_db`.`users` (`userName`)
--     ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

SHOW WARNINGS;
CREATE UNIQUE INDEX `requestID` ON `coding_collab_db`.`acceptedby` (`acceptedByID` ASC);

SHOW WARNINGS;
CREATE INDEX `fk_acceptedby_requests1_idx` ON `coding_collab_db`.`acceptedby` (`accepted_requestID` ASC);

SHOW WARNINGS;
CREATE INDEX `fk_acceptedby_users1_idx` ON `coding_collab_db`.`acceptedby` (`requestAcceptedBy_userID` ASC);

-- SHOW WARNINGS;
-- CREATE INDEX `fk_acceptedby_users2_idx` ON `coding_collab_db`.`acceptedby` (`requestAcceptedBy_userName` ASC);

SHOW WARNINGS;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
