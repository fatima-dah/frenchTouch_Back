


CREATE DATABASE `frenchtouch`;

USE frenchtouch;

CREATE TABLE `admin_login` (
`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
`email` VARCHAR(150) NOT NULL,
`password` VARCHAR(150) NOT NULL 
);


CREATE TABLE `book` (
`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
`title` VARCHAR(155) NOT NULL,
`picture` VARCHAR(255) NOT NULL
);

CREATE TABLE `user` (
`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
`lastname` VARCHAR(16) NOT NULL,
`firstname` VARCHAR(45) NOT NULL,
`email` VARCHAR(255) NOT NULL,
`password` VARCHAR(45) NOT NULL
);


CREATE TABLE `category` (
`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
`name` VARCHAR(45) NOT NULL
);

CREATE TABLE `sub_category` (
`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
`name` VARCHAR(45) NOT NULL,
`category_id` INT NOT NULL,
FOREIGN KEY (`category_id`) REFERENCES `category`(`id`)
);


CREATE TABLE `product` (
`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
`name` VARCHAR(45) NOT NULL,
`description` TEXT NOT NULL,
`price` INT NOT NULL,
`sub_category_id` INT NOT NULL,
`sub_category_category_id` INT NOT NULL,
FOREIGN KEY (`sub_category_id`) REFERENCES `sub_category`(`id`),
FOREIGN KEY (`sub_category_category_id`) REFERENCES `sub_category`(`category_id`)
);




CREATE TABLE `buy` (
`user_id` INT NOT NULL,
`product_id` INT NOT NULL,
`order_number` INT NOT NULL,
FOREIGN KEY (`user_id`) REFERENCES `user`(`id`),
FOREIGN KEY (`product_id`) REFERENCES `product`(`id`),
`date` TIME NOT NULL
);

CREATE INDEX `order_number` ON `buy` (`order_number`);


CREATE TABLE `gift` (
`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
`titleGift` VARCHAR(155) NOT NULL,
`imageGift` VARCHAR(255) NOT NULL,
`imageCarousel_id` INT,
`image` TEXT NOT NULL,
`message` TEXT NOT NULL,
`title` VARCHAR(155) NOT NULL,
`price` DECIMAL NOT NULL,
`firstname` VARCHAR(155) NOT NULL,
`lastname` VARCHAR(155) NOT NULL,
`email` VARCHAR(200) NOT NULL,
 `titlePrestationGift` VARCHAR(155),
FOREIGN KEY (`imageCarousel_id`) REFERENCES `imageCarouselGift`(`id`)
);

CREATE TABLE `home` (
`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
`picture_about` VARCHAR(255) NOT NULL,
`content_about` TEXT NOT NULL
);

CREATE TABLE `notice` (
`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
`description` TEXT NOT NULL,
`user_id` INT NOT NULL,
FOREIGN KEY (`user_id`) REFERENCES `user`(`id`)
);

CREATE TABLE `palette` (
`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
`name` VARCHAR(150) NOT NULL,
`picture` VARCHAR(250) NOT NULL,
`ref_palette` VARCHAR(100) NOT NULL
);

CREATE TABLE `service` (
`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
`name` VARCHAR(45) NOT NULL,
`description` TEXT NOT NULL,
`price` VARCHAR(45) NOT NULL,
`duration` VARCHAR(10)NOT NULL,
`image` VARCHAR(255) NOT NULL,
`category` VARCHAR(155) NOT NULL,
`sub_category_id` INT NOT NULL,
FOREIGN KEY (`sub_category_id`) REFERENCES `sub_category`(`id`)
);

CREATE TABLE `reserve` (
`user_id` INT NOT NULL,
`service_id` INT NOT NULL,
`date_reserve` VARCHAR(45) NOT NULL,
`hour_reserve` VARCHAR(45) NOT NULL,
FOREIGN KEY (`user_id`) REFERENCES `user`(`id`),
FOREIGN KEY (`service_id`) REFERENCES `service`(`id`)
);

CREATE TABLE `service_presentation` (
`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
`title` VARCHAR(150) NOT NULL,
`image_service` VARCHAR(255) NOT NULL,
`description` TEXT NOT NULL
);

CREATE TABLE `about` (
`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
`title` VARCHAR(150) NOT NULL,
`description` TEXT NOT NULL,
`text1` TEXT NOT NULL,
`text2` TEXT NOT NULL,
`text3` TEXT NOT NULL,
`image_text1` VARCHAR(255) NOT NULL,
`image_text2` VARCHAR(255) NOT NULL,
`image_text3` VARCHAR(255) NOT NULL
);


 CREATE TABLE `imageCarouselGift` (
`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
`image` TEXT NOT NULL
);




CREATE TABLE `reserve_visitor` (
`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
`firstname` VARCHAR(50) NOT NULL,
`lastname` VARCHAR(80) NOT NULL,
`email` VARCHAR(155) NOT NULL,
`phone` INT NOT NULL,
`age` int NOT NULL,
`service_id` INT,
 FOREIGN KEY (`service_id`) REFERENCES `service`(`id`)
);
