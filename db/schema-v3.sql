-- MySQL Script generated by MySQL Workbench
-- Mon Jul 16 19:24:07 2018
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
-- Table `coding_collab_db`.`acceptedbies`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `coding_collab_db`.`acceptedbies` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `coding_collab_db`.`acceptedbies` (
  `acceptedByID` INT NOT NULL AUTO_INCREMENT,
  `acceptedByUser_userID` CHAR(36) NOT NULL,
  `accepted_requestID` CHAR(36) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`acceptedByID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

SHOW WARNINGS;
CREATE UNIQUE INDEX `acceptedByID` ON `coding_collab_db`.`acceptedbies` (`acceptedByID` ASC);

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `coding_collab_db`.`requests`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `coding_collab_db`.`requests` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `coding_collab_db`.`requests` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
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
  PRIMARY KEY (`id`))
ENGINE = InnoDB
-- AUTO_INCREMENT = 29
DEFAULT CHARACTER SET = latin1;

SHOW WARNINGS;
CREATE UNIQUE INDEX `requestID` ON `coding_collab_db`.`requests` (`requestID` ASC);

SHOW WARNINGS;
CREATE UNIQUE INDEX `id_UNIQUE` ON `coding_collab_db`.`requests` (`id` ASC);

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `coding_collab_db`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `coding_collab_db`.`users` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `coding_collab_db`.`users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(255) NOT NULL,
  `lastName` VARCHAR(255) NOT NULL,
  `userName` VARCHAR(255) NOT NULL,
  `userID` CHAR(36) NOT NULL,
  `userPass` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
-- AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = latin1;

SHOW WARNINGS;
CREATE UNIQUE INDEX `userName` ON `coding_collab_db`.`users` (`userName` ASC);

SHOW WARNINGS;
CREATE UNIQUE INDEX `userID` ON `coding_collab_db`.`users` (`userID` ASC);

SHOW WARNINGS;
CREATE UNIQUE INDEX `email` ON `coding_collab_db`.`users` (`email` ASC);

SHOW WARNINGS;
CREATE UNIQUE INDEX `id_UNIQUE` ON `coding_collab_db`.`users` (`id` ASC);

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `coding_collab_db`.`acceptedby`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `coding_collab_db`.`acceptedby` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `coding_collab_db`.`acceptedby` (
  `acceptedByID` INT NOT NULL AUTO_INCREMENT,
  `requestAcceptedBy_userID` CHAR(36) NULL DEFAULT NULL,
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
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

SHOW WARNINGS;
CREATE UNIQUE INDEX `requestID` ON `coding_collab_db`.`acceptedby` (`acceptedByID` ASC);

SHOW WARNINGS;
CREATE INDEX `fk_acceptedby_requests1_idx` ON `coding_collab_db`.`acceptedby` (`accepted_requestID` ASC);

SHOW WARNINGS;
CREATE INDEX `fk_acceptedby_users1_idx` ON `coding_collab_db`.`acceptedby` (`requestAcceptedBy_userID` ASC);

SHOW WARNINGS;

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
-- AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = latin1;

SHOW WARNINGS;
CREATE UNIQUE INDEX `langID` ON `coding_collab_db`.`languages` (`langID` ASC);

SHOW WARNINGS;
CREATE UNIQUE INDEX `langName` ON `coding_collab_db`.`languages` (`langName` ASC);

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `coding_collab_db`.`requestedbies`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `coding_collab_db`.`requestedbies` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `coding_collab_db`.`requestedbies` (
  `requestedByID` INT(11) NOT NULL AUTO_INCREMENT,
  `requestedByUser_userID` CHAR(36) NOT NULL,
  `requestedID` CHAR(36) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`requestedByID`))
ENGINE = InnoDB
-- AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = latin1;

SHOW WARNINGS;
CREATE UNIQUE INDEX `requestedByID` ON `coding_collab_db`.`requestedbies` (`requestedByID` ASC);

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `coding_collab_db`.`requestedby`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `coding_collab_db`.`requestedby` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `coding_collab_db`.`requestedby` (
  `requestedByID` INT(11) NOT NULL AUTO_INCREMENT,
  `requestedByUser_userID` CHAR(36) NOT NULL,
  `requestedID` CHAR(36) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`requestedByID`),
  CONSTRAINT `fk_requestedby_requests2`
    FOREIGN KEY (`requestedID`)
    REFERENCES `coding_collab_db`.`requests` (`requestID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_requestedby_users1`
    FOREIGN KEY (`requestedByUser_userID`)
    REFERENCES `coding_collab_db`.`users` (`userID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

SHOW WARNINGS;
CREATE UNIQUE INDEX `requestID` ON `coding_collab_db`.`requestedby` (`requestedByID` ASC);

SHOW WARNINGS;
CREATE INDEX `fk_requestedby_requests2` ON `coding_collab_db`.`requestedby` (`requestedID` ASC);

SHOW WARNINGS;
CREATE INDEX `fk_requestedby_users1_idx` ON `coding_collab_db`.`requestedby` (`requestedByUser_userID` ASC);

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
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`request_lang_id`),
  CONSTRAINT `LangID - languages`
    FOREIGN KEY (`lang_id`)
    REFERENCES `coding_collab_db`.`languages` (`langID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `ReqID - requests`
    FOREIGN KEY (`req_id`)
    REFERENCES `coding_collab_db`.`requests` (`requestID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
-- AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = latin1;

SHOW WARNINGS;
CREATE INDEX `Request ID - requests_idx` ON `coding_collab_db`.`requestlanguages` (`req_id` ASC);

SHOW WARNINGS;
CREATE INDEX `Language ID - languages_idx` ON `coding_collab_db`.`requestlanguages` (`lang_id` ASC);

SHOW WARNINGS;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;