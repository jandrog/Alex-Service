DROP DATABASE IF EXISTS arrtozone;

CREATE DATABASE arrtozone;

USE arrtozone;

CREATE TABLE features (
    product_id INT PRIMARY KEY,
    description TEXT NOT NULL
);

CREATE TABLE benefits (
    product_id INT,
    description TEXT NOT NULL
);

CREATE TABLE product_details (
    product_id INT,
    detail VARCHAR(50),
    description VARCHAR(150) NOT NULL
);