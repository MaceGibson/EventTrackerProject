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
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;

CREATE TABLE IF NOT EXISTS `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `username` VARCHAR(255) NULL,
  `password` VARCHAR(255) NULL,
  `enabled` TINYINT NULL,
  `role` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC))
ENGINE = InnoDB;


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
  PRIMARY KEY (`id`, `user_id`),
  INDEX `fk_habit_user_idx` (`user_id` ASC),
  CONSTRAINT `fk_habit_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS project@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'project'@'localhost' IDENTIFIED BY 'project';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'project'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `user`
-- -----------------------------------------------------
START TRANSACTION;
USE `eventtrackerdb`;
INSERT INTO `user` (`id`, `email`, `username`, `password`, `enabled`, `role`) VALUES (1, 'bandit@gmail.com', 'bandit', 'outside', 1, 'standard');
INSERT INTO `user` (`id`, `email`, `username`, `password`, `enabled`, `role`) VALUES (2, 'coco@gmail.com', 'coco', 'mellon', 1, 'admin');

COMMIT;


-- -----------------------------------------------------
-- Data for table `habit`
-- -----------------------------------------------------
START TRANSACTION;
USE `eventtrackerdb`;
INSERT INTO `habit` (`id`, `user_id`, `name`, `description`, `date`, `completed`) VALUES (1, 1, 'Exercise', 'Go for a run in the morning', '2023-02-16 08:00:00', 1);
INSERT INTO `habit` (`id`, `user_id`, `name`, `description`, `date`, `completed`) VALUES (2, 1, 'Read', 'Read a chapter of a book before bed', '2023-02-16 22:00:00', 1);
INSERT INTO `habit` (`id`, `user_id`, `name`, `description`, `date`, `completed`) VALUES (3, 1, 'Meditate', 'Meditate for 10 minutes in the evening', '2023-02-16 20:30:00', 0);
INSERT INTO `habit` (`id`, `user_id`, `name`, `description`, `date`, `completed`) VALUES (4, 2, 'Beg for food', 'Beg owners for food in the morning', '2023-02-20 08:30:00', 1);
INSERT INTO `habit` (`id`, `user_id`, `name`, `description`, `date`, `completed`) VALUES (5, 2, 'Take a nap', 'Take one of many cat naps', '2023-02-20 12:00:00', 1);
INSERT INTO `habit` (`id`, `user_id`, `name`, `description`, `date`, `completed`) VALUES (6, 2, 'Play with toys', 'Play with my bell toy', '2023-02-20 16:00:00', 0);

COMMIT;

