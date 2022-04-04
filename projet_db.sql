CREATE DATABASE projet_web ;

CREATE USER projet_user WITH PASSWORD '00000000';

CREATE TABLE sauce (
    nom VARCHAR(255) PRIMARY_KEY,
    prix FLOAT

);

CREATE TABLE entree (
    nom VARCHAR(255) PRIMARY_KEY,
    prix FLOAT

);

CREATE TABLE entree_sauce(
    sauce_nom VARCHAR(255) REFERENCES sauce(id),
    entree_nom VARCHAR(255) REFERENCES entree(id),
    PRIMARY_KEY(sauce_id,entree_id)
);

CREATE TABLE boisson(
    nom VARCHAR(255) PRIMARY_KEY,
    prix FLOAT

);


CREATE TABLE pizza(
    nom VARCHAR(255) PRIMARY_KEY,
    taille VARCHAR(2),
    prix FLOAT

);

CREATE TABLE ingrediant(
    nom VARCHAR(255) PRIMARY_KEY,
    prix FLOAT ,

);

CREATE TABLE pizza_ing(
    pizza_nom VARCHAR(255) REFERENCES pizza(nom),
    ing_nom VARCHAR(255) REFERENCES ingrediant(nom),
    PRIMARY_KEY(pizza_nom,ing_nom)
);

