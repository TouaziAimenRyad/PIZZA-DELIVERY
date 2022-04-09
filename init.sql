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
    description VARCHAR(512),
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

INSERT INTO entree(nom,description,prix) VALUES 
('Breadsticks Extra Mozzarella','Comme le Breadsticks Mozzarella, avec en plus de la Mozzarella gratinée par-dessus! Servis avec une sauce au choix.',6.5),
('Breadsticks mozzarella ','8 Bâtonnets de pâte à pizza garnis de mozzarella. Servis avec une délicieuse sauce au choix.',5.0),
('Salade Caesar','Salade verte, tomates fraîches, filet de poulet rôti et mariné, Parmigiano Reggiano AOP, tranche de pain à l’ail et une sauce Caesar',7.0),
('Chicken Wings Epicées','Recette très épicée : 6 ailes de poulet marinées',5.0),
('Chicken Wings','Recette originale : 6 ailes de poulet marinées.',5.0);

INSERT INTO pizza(nom,taille,description,prix) VALUES 
('4 Fromages','S','Sauce tomate à l origan ou crème fraîche légère, mozzarella, fromage de chèvre, emmental et Fourme d Ambert AOP',8.5),
('Montagnarde','S','Crème fraîche légère, mozzarella, jambon cru, fromage à raclette et champignons frais',8.5),
('Suprême','S','Sauce tomate à l origan, mozzarella, emietté au boeuf, saucisse pepperoni, champignons frais, oignons rouges frais et poivrons verts frais',8.5),
('Raclette','S','Crème fraîche légère, mozzarella, pommes de terre, lardons et fromage à raclette',8),
('Chicken Barbecue','S','Sauce barbecue, mozzarella, filet de poulet rôti, oignons rouges frais, champignons frais et poivrons verts frais',8),
('Orientale','S','Sauce tomate à l origan, mozzarella, merguez et champignons frais',7),
('Margherita','S','Sauce tomate à l origan et mozzarella',5),
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


INSERT INTO ingrediant(nom,prix) VALUES 
('A',0.4),
('B',0.3),
('C',1.0),
('D',0.3),
('E',1.5),
('F',0.2),
('G',0.5),
('H',0.6);












