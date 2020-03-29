DROP DATABASE IF EXISTS arrtozone;

CREATE DATABASE arrtozone;

USE arrtozone;

CREATE TABLE features (
    productID INT PRIMARY KEY,
    description TEXT NOT NULL
);

CREATE TABLE benefits (
    productID INT,
    description TEXT NOT NULL
);

CREATE TABLE product_details (
    productID INT,
    detail VARCHAR(50),
    description VARCHAR(150) NOT NULL
);