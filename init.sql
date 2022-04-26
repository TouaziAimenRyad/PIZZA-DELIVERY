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

CREATE TABLE boisson(
    nom VARCHAR(255) PRIMARY KEY,
    prix FLOAT

);


CREATE TABLE pizza(
    nom VARCHAR(255) PRIMARY KEY,
    description VARCHAR(512),
    prix FLOAT

);

CREATE TABLE ingrediant(
    nom VARCHAR(255) PRIMARY KEY,
    type VARCHAR(255),
    prix FLOAT 

);

CREATE TABLE pizza_ing(
    pizza_nom VARCHAR(255) REFERENCES pizza(nom),
    ing_nom VARCHAR(255) REFERENCES ingrediant(nom),
    PRIMARY KEY(pizza_nom,ing_nom)
);

CREATE TABLE commande(
    id VARCHAR(255),
    nom VARCHAR(255),
    prenom VARCHAR(255),
    adresse VARCHAR(512),
    produit VARCHAR(255),
    nom_produit VARCHAR(255),
    taille VARCHAR(5),
    prix_unit FLOAT,
    prix_total FLOAT

);

ALTER TABLE sauce OWNER TO projet_user;
ALTER TABLE entree OWNER TO projet_user;
ALTER TABLE pizza OWNER TO projet_user;
ALTER TABLE boisson OWNER TO projet_user;
ALTER TABLE ingrediant OWNER TO projet_user;
ALTER TABLE pizza_ing OWNER TO projet_user;
ALTER TABLE commande OWNER TO projet_user;

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

INSERT INTO pizza(nom,description,prix) VALUES 
('4 Fromages','Sauce tomate à l origan , mozzarella, fromage de chèvre, emmental et Fourme d Ambert AOP',8.5),
('Montagnarde','Crème fraîche légère, mozzarella, jambon cru, fromage à raclette et champignons frais',8.5),
('Suprême','Sauce tomate à l origan, mozzarella, emietté au boeuf, saucisse pepperoni, champignons frais, oignons rouges frais et poivrons verts frais',8.5),
('Raclette','Crème fraîche légère, mozzarella, pommes de terre, lardons et fromage à raclette',8),
('Chicken Barbecue','Sauce barbecue, mozzarella, filet de poulet rôti, oignons rouges frais, champignons frais et poivrons verts frais',8),
('Orientale','Sauce tomate à l origan, mozzarella, merguez et champignons frais',7),
('Margherita','Sauce tomate à l origan et mozzarella',5),
('Nordique','Crème fraîche légère, mozzarella et saumon fumé de Norvège',8.5);

INSERT INTO boisson(nom,prix) VALUES 
('Coca-Cola Original',2.0),
('Coca-Cola sans sucres',2.0),
('Coca-Cola Cherry',2.0),
('Oasis Tropical',2.0),
('Schweeps Agrumes',2.0),
('Sprite Original',2.0),
('Schweeps Orange',2.0);



INSERT INTO ingrediant(nom,type,prix) VALUES 
('sauce tomate','sauce',0.4),
('crème fraîche','sauce',0.4),
('sauce barbecue','sauce',0.4),
('mozzarella','fromage',0.4),
('fromage de chèvre','fromage',0.4),
('Ambert','fromage',0.4),
('raclette','fromage',0.4),
('emmental','fromage',0.4),
('jambon','viande',0.4),
('boeuf','viande',0.4),
('pepperoni','viande',0.4),
('lardons','viande',0.4),
('poulet','viande',0.4),
('saumon','viande',0.4),
('merguez','viande',0.4),
('champignons','legume',0.4),
('oignons rouges','legume',0.4),
('poivrons verts','legume',0.4),
('pommes de terre','legume',0.4);


INSERT INTO pizza_ing(pizza_nom,ing_nom) VALUES 
('4 Fromages','sauce tomate'),
('4 Fromages','mozzarella'),
('4 Fromages','fromage de chèvre'),
('4 Fromages','Ambert'),
('4 Fromages','emmental'),
('Montagnarde','crème fraîche'),
('Montagnarde','mozzarella'),
('Montagnarde','jambon'),
('Montagnarde','raclette'),
('Montagnarde','champignons'),
('Suprême','sauce tomate'),
('Suprême','mozzarella'),
('Suprême','boeuf'),
('Suprême','pepperoni'),
('Suprême','champignons'),
('Suprême','oignons rouges'),
('Suprême','poivrons verts'),
('Raclette','crème fraîche'),
('Raclette','mozzarella'),
('Raclette','pommes de terre'),
('Raclette','lardons'),
('Raclette','raclette'),
('Chicken Barbecue','sauce barbecue'),
('Chicken Barbecue','mozzarella'),
('Chicken Barbecue','poulet'),
('Chicken Barbecue','oignons rouges'),
('Chicken Barbecue','poivrons verts'),
('Chicken Barbecue','champignons'),
('Orientale','sauce tomate'),
('Orientale','mozzarella'),
('Orientale','merguez'),
('Orientale','champignons'),
('Margherita','sauce tomate'),
('Margherita','mozzarella'),
('Nordique','crème fraîche'),
('Nordique','mozzarella'),
('Nordique','saumon');
