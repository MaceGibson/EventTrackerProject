-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema eventtrackerdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `eventtrackerdb` ;

-- -----------------------------------------------------
-- Schema eventtrackerdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `eventtrackerdb` DEFAULT CHARACTER SET utf8 ;
USE `eventtrackerdb` ;

-- -----------------------------------------------------
-- Table `habit`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `habit` ;

CREATE TABLE IF NOT EXISTS `habit` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `name` VARCHAR(500) NOT NULL,
  `description` VARCHAR(1000) NOT NULL,
  `date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `completed` TINYINT NOT NULL DEFAULT 0,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS project@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'project'@'localhost' IDENTIFIED BY 'project';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'project'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
