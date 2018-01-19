-- MySQL Script generated by MySQL Workbench
-- Thu Jan 18 13:27:08 2018
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema schnuppertage
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema schnuppertage
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `schnuppertage` DEFAULT CHARACTER SET utf8 ;
USE `schnuppertage` ;

-- -----------------------------------------------------
-- Table `schnuppertage`.`LOCATIONS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `schnuppertage`.`LOCATIONS` (
  `ID` BIGINT NOT NULL AUTO_INCREMENT,
  `NAME` TEXT NOT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `schnuppertage`.`DEPARTMENTS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `schnuppertage`.`DEPARTMENTS` (
  `ID` BIGINT NOT NULL AUTO_INCREMENT,
  `CONTRACTION` VARCHAR(32) NOT NULL,
  `NAME` TEXT NOT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `schnuppertage`.`LOCATIONS_DEPARTMENTS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `schnuppertage`.`LOCATIONS_DEPARTMENTS` (
  `LOCATIONS_ID` BIGINT NOT NULL,
  `DEPARTMENTS_ID` BIGINT NOT NULL,
  PRIMARY KEY (`LOCATIONS_ID`, `DEPARTMENTS_ID`),
  INDEX `fk_LOCATIONS_has_DEPARTMENTS_DEPARTMENTS1_idx` (`DEPARTMENTS_ID` ASC),
  INDEX `fk_LOCATIONS_has_DEPARTMENTS_LOCATIONS_idx` (`LOCATIONS_ID` ASC),
  CONSTRAINT `fk_LOCATIONS_has_DEPARTMENTS_LOCATIONS`
    FOREIGN KEY (`LOCATIONS_ID`)
    REFERENCES `schnuppertage`.`LOCATIONS` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_LOCATIONS_has_DEPARTMENTS_DEPARTMENTS1`
    FOREIGN KEY (`DEPARTMENTS_ID`)
    REFERENCES `schnuppertage`.`DEPARTMENTS` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `schnuppertage`.`EVENTS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `schnuppertage`.`EVENTS` (
  `ID` BIGINT NOT NULL,
  `DATE` DATE NOT NULL,
  `DEPARTMENTS_ID` BIGINT NOT NULL,
  `LOCATIONS_ID` BIGINT NOT NULL,
  PRIMARY KEY (`ID`),
  INDEX `fk_EVENTS_DEPARTMENTS1_idx` (`DEPARTMENTS_ID` ASC),
  INDEX `fk_EVENTS_LOCATIONS1_idx` (`LOCATIONS_ID` ASC),
  CONSTRAINT `fk_EVENTS_DEPARTMENTS1`
    FOREIGN KEY (`DEPARTMENTS_ID`)
    REFERENCES `schnuppertage`.`DEPARTMENTS` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_EVENTS_LOCATIONS1`
    FOREIGN KEY (`LOCATIONS_ID`)
    REFERENCES `schnuppertage`.`LOCATIONS` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `schnuppertage`.`TIMETABLES`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `schnuppertage`.`TIMETABLES` (
  `ID` BIGINT NOT NULL AUTO_INCREMENT,
  `DEPARTMENTS_ID` BIGINT NOT NULL,
  `LOCATIONS_ID` BIGINT NOT NULL,
  PRIMARY KEY (`ID`),
  INDEX `fk_TIMETABLES_DEPARTMENTS1_idx` (`DEPARTMENTS_ID` ASC),
  INDEX `fk_TIMETABLES_LOCATIONS1_idx` (`LOCATIONS_ID` ASC),
  CONSTRAINT `fk_TIMETABLES_DEPARTMENTS1`
    FOREIGN KEY (`DEPARTMENTS_ID`)
    REFERENCES `schnuppertage`.`DEPARTMENTS` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_TIMETABLES_LOCATIONS1`
    FOREIGN KEY (`LOCATIONS_ID`)
    REFERENCES `schnuppertage`.`LOCATIONS` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `schnuppertage`.`GROUPS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `schnuppertage`.`GROUPS` (
  `ID` BIGINT NOT NULL AUTO_INCREMENT,
  `TIMETABLES_ID` BIGINT NOT NULL,
  PRIMARY KEY (`ID`),
  INDEX `fk_GROUPS_TIMETABLES1_idx` (`TIMETABLES_ID` ASC),
  CONSTRAINT `fk_GROUPS_TIMETABLES1`
    FOREIGN KEY (`TIMETABLES_ID`)
    REFERENCES `schnuppertage`.`TIMETABLES` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `schnuppertage`.`DAYTABLES`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `schnuppertage`.`DAYTABLES` (
  `ID` BIGINT NOT NULL AUTO_INCREMENT,
  `DAY_NAME` INT NOT NULL,
  `GROUPS_ID` BIGINT NOT NULL,
  PRIMARY KEY (`ID`),
  INDEX `fk_DAYTABLES_GROUPS1_idx` (`GROUPS_ID` ASC),
  CONSTRAINT `fk_DAYTABLES_GROUPS1`
    FOREIGN KEY (`GROUPS_ID`)
    REFERENCES `schnuppertage`.`GROUPS` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `schnuppertage`.`SUBJECTS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `schnuppertage`.`SUBJECTS` (
  `ID` BIGINT NOT NULL AUTO_INCREMENT,
  `NAME` TEXT NOT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `schnuppertage`.`TEACHERS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `schnuppertage`.`TEACHERS` (
  `ID` BIGINT NOT NULL AUTO_INCREMENT,
  `CONTRACTION` VARCHAR(4) NOT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `schnuppertage`.`LESSONS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `schnuppertage`.`LESSONS` (
  `ID` BIGINT NOT NULL AUTO_INCREMENT,
  `START` TIME NOT NULL,
  `END` TIME NOT NULL,
  `DAYTABLES_ID` BIGINT NOT NULL,
  `SUBJECTS_ID` BIGINT NOT NULL,
  `TEACHERS_ID` BIGINT NOT NULL,
  PRIMARY KEY (`ID`),
  INDEX `fk_LESSONS_DAYTABLES1_idx` (`DAYTABLES_ID` ASC),
  INDEX `fk_LESSONS_SUBJECTS1_idx` (`SUBJECTS_ID` ASC),
  INDEX `fk_LESSONS_TEACHERS1_idx` (`TEACHERS_ID` ASC),
  CONSTRAINT `fk_LESSONS_DAYTABLES1`
    FOREIGN KEY (`DAYTABLES_ID`)
    REFERENCES `schnuppertage`.`DAYTABLES` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_LESSONS_SUBJECTS1`
    FOREIGN KEY (`SUBJECTS_ID`)
    REFERENCES `schnuppertage`.`SUBJECTS` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_LESSONS_TEACHERS1`
    FOREIGN KEY (`TEACHERS_ID`)
    REFERENCES `schnuppertage`.`TEACHERS` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `schnuppertage`.`PARTICIPANTS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `schnuppertage`.`PARTICIPANTS` (
  `ID` BIGINT NOT NULL AUTO_INCREMENT,
  `FIRSTNAME` TEXT NOT NULL,
  `LASTNAME` TEXT NOT NULL,
  `PHONE` TEXT NULL,
  `EMAIL` TEXT NULL,
  `SCHOOL_LOCATION` TEXT NOT NULL,
  `SCHOOL_TYP` TEXT NOT NULL,
  `EVENTS_ID` BIGINT NOT NULL,
  PRIMARY KEY (`ID`),
  INDEX `fk_PARTICIPANTS_EVENTS1_idx` (`EVENTS_ID` ASC),
  CONSTRAINT `fk_PARTICIPANTS_EVENTS1`
    FOREIGN KEY (`EVENTS_ID`)
    REFERENCES `schnuppertage`.`EVENTS` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `schnuppertage`.`ADMIN`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `schnuppertage`.`ADMIN` (
  `ID` BIGINT NOT NULL AUTO_INCREMENT,
  `USERNAME` TEXT NOT NULL,
  `PASSWORD` TEXT NOT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;