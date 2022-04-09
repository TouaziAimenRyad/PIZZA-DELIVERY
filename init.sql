DROP DATABASE IF EXISTS projet_web;
DROP USER IF EXISTS projet_user;

CREATE USER projet_user WITH PASSWORD '00000000';
CREATE DATABASE projet_web WITH OWNER projet_user ;
GRANT ALL PRIVILEGES ON DATABASE projet_web TO postgres;

\c projet_web ;

DROP TABLE IF EXISTS ing_nom;
DROP TABLE IF EXISTS pizza_ing;
DROP TABLE IF EXISTS sauce;
DROP TABLE IF EXISTS entree;
DROP TABLE IF EXISTS pizza;
DROP TABLE IF EXISTS boisson;
DROP TABLE IF EXISTS ingrediant;


CREATE TABLE sauce  (
    nom VARCHAR(255) PRIMARY KEY,
    prix FLOAT

);

CREATE TABLE entree (
    nom VARCHAR(255) PRIMARY KEY,
    prix FLOAT

);

CREATE TABLE entree_sauce(
    sauce_nom VARCHAR(255) REFERENCES sauce(nom),
    entree_nom VARCHAR(255) REFERENCES entree(nom),
    PRIMARY KEY(sauce_nom,entree_nom)
);

CREATE TABLE boisson(
    nom VARCHAR(255) PRIMARY KEY,
    prix FLOAT

);


CREATE TABLE pizza(
    nom VARCHAR(255) PRIMARY KEY,
    taille VARCHAR(2),
    description VARCHAR(512),
    prix FLOAT

);

CREATE TABLE ingrediant(
    nom VARCHAR(255) PRIMARY KEY,
    prix FLOAT 

);

CREATE TABLE pizza_ing(
    pizza_nom VARCHAR(255) REFERENCES pizza(nom),
    ing_nom VARCHAR(255) REFERENCES ingrediant(nom),
    PRIMARY KEY(pizza_nom,ing_nom)
);

ALTER TABLE sauce OWNER TO projet_user;
ALTER TABLE entree OWNER TO projet_user;
ALTER TABLE pizza OWNER TO projet_user;
ALTER TABLE boisson OWNER TO projet_user;
ALTER TABLE ingrediant OWNER TO projet_user;
ALTER TABLE pizza_ing OWNER TO projet_user;
ALTER TABLE entree_sauce OWNER TO projet_user;

INSERT INTO sauce(nom,prix) VALUES 
('Sauce Barbecue',0.3),
('Sauce Curry',0.3),
('Ketchup',0.3);

INSERT INTO entree(nom,prix) VALUES 
('Breadsticks Extra Mozzarella',6.5),
('Breadsticks mozzarella ',5.0),
('Breadsticks mozzarella ',5.0),
('Chicken Wings Epicées',5.0),
('Chicken Wings',5.0);

INSERT INTO pizza(nom,taille,description,prix) VALUES 
('4 Fromages','S','Sauce tomate à l origan ou crème fraîche légère, mozzarella, fromage de chèvre, emmental et Fourme d Ambert AOP',8.5),
('Montagnarde','S','Crème fraîche légère, mozzarella, jambon cru, fromage à raclette et champignons frais',8.5),
('Suprême','S','Sauce tomate à l origan, mozzarella, emietté au boeuf, saucisse pepperoni, champignons frais, oignons rouges frais et poivrons verts frais',8.5),
('Raclette','S','Crème fraîche légère, mozzarella, pommes de terre, lardons et fromage à raclette',8),
('Chicken Barbecue','Sauce barbecue, mozzarella, filet de poulet rôti, oignons rouges frais, champignons frais et poivrons verts frais','S',8),
('Orientale','Sauce tomate à l origan, mozzarella, merguez et champignons frais','S',7),
('Margherita','Sauce tomate à l origan et mozzarella','S',5),
('Nordique','S','Crème fraîche légère, mozzarella et saumon fumé de Norvège',8.5);

INSERT INTO boisson(nom,prix) VALUES 
('Coca-Cola Original 1,25L',3.4),
('Coca-Cola Original 33cl',2.0),
('Coca-Cola sans sucres 1,25L',3.4),
('Coca-Cola sans sucres 33cl',2.0),
('Coca-Cola Cherry 1,25L',3.4),
('Coca-Cola Cherry 33cl',2.0),
('Oasis Tropical 2L',3.4),
('Oasis Tropical 33cl',2.0);


INSERT INTO ingediant(nom,prix) VALUES 
('A',0.4),
('B',0.3),
('C',1.0),
('D',0.3),
('E',1.5),
('F',0.2),
('G',0.5),
('H',0.6);













