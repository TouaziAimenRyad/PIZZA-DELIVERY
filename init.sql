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
DROP TABLE IF EXISTS users;

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





CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255),
    prenom VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(512)
    
);

ALTER TABLE sauce OWNER TO projet_user;
ALTER TABLE entree OWNER TO projet_user;
ALTER TABLE pizza OWNER TO projet_user;
ALTER TABLE boisson OWNER TO projet_user;
ALTER TABLE ingrediant OWNER TO projet_user;
ALTER TABLE pizza_ing OWNER TO projet_user;
ALTER TABLE users OWNER TO projet_user;


INSERT INTO sauce(nom,prix) VALUES 
('Sauce Barbecue',0.3),
('Sauce Curry',0.3),
('Ketchup',0.3);

INSERT INTO entree(nom,description,prix) VALUES 
('Breadsticks Extra Mozzarella','Comme le Breadsticks Mozzarella, avec en plus de la Mozzarella gratinée par-dessus! Servis avec une sauce au choix.',6.5),
('Breadsticks mozzarella','8 Bâtonnets de pâte à pizza garnis de mozzarella. Servis avec une délicieuse sauce au choix.',5.0),
('Salade Caesar','Salade verte, tomates fraîches, filet de poulet rôti et mariné, Parmigiano Reggiano AOP, tranche de pain à lail et une sauce Caesar',7.0),
('Chicken Wings Epicées','Recette très épicée : 6 ailes de poulet marinées',5.0),
('Chicken Wings','Recette originale : 6 ailes de poulet marinées.',5.0),
('Potatoes','Des Potatoes cuites au four. Servies avec une sauce au choix.',3.0),
('Chicken Croqs','8 Bouchées Panées au Poulet. Servis avec une délicieuse sauce au choix.',5.0),
('Salade Méditerranéenne','Salade verte, tomates fraîches, champignons frais, Parmigiano Reggiano AOP, olives noires, tranche de pain à lail et vinaigrette balsamique',7.0);



INSERT INTO pizza(nom,description,prix) VALUES 
('4 Fromages','Sauce tomate à l origan , mozzarella, fromage de chèvre, emmental et Fourme d Ambert AOP',8.5),
('Montagnarde','Crème fraîche légère, mozzarella, jambon cru, fromage à raclette et champignons frais',8.5),
('Suprême','Sauce tomate à l origan, mozzarella, emietté au boeuf, saucisse pepperoni, champignons frais, oignons rouges frais et poivrons verts frais',8.5),
('Raclette','Crème fraîche légère, mozzarella, pommes de terre, lardons et fromage à raclette',8),
('Chicken Barbecue','Sauce barbecue, mozzarella, filet de poulet rôti, oignons rouges frais, champignons frais et poivrons verts frais',8),
('Orientale','Sauce tomate à l origan, mozzarella, merguez et champignons frais',7),
('Margherita','Sauce tomate à l origan et mozzarella',5),
('Nordique','Crème fraîche légère, mozzarella et saumon fumé de Norvège',8.5),
('BPM','Sauce barbecue, mozzarella, emietté au boeuf, filet de poulet rôti et merguez',8.5),
('Pepperoni Lovers','Sauce tomate à lorigan, mozzarella et saucisse pepperoni',8.0),
('Queen','Sauce tomate à lorigan, mozzarella, jambon et champignons frais',7.0),
('Chevre Miel','Crème fraîche légère, mozzarella, fromage de chèvre, miel',7.0),
('Texane Barbecue','Sauce barbecue, mozzarella, jambon, emietté au boeuf, lardons, champignons frais et oignons rouges frais',8.0),
('Campagnarde','Crème fraîche légère, mozzarella, lardons, oignons rouges frais et champignons frais',8.0),
('Kasbah','Sauce tomate à lorigan, mozzarella, émincé de poulet kebab, tomates fraîches, oignons rouges frais et sauce blanche kebab',8.0),
('Samouraï','Sauce tomate à lorigan, mozzarella, merguez, filet de poulet rôti, oignons rouges frais, Sauce Samouraï',8.0),
('Chicken Parmesan','Sauce tomate à lorigan, mozzarella, filet de poulet rôti, tomates fraîches, parmigiano reggiano AOP',8.5);








INSERT INTO boisson(nom,prix) VALUES 
('Coca-Cola Original',2.0),
('Coca-Cola sans sucres',2.0),
('Coca-Cola Cherry',2.0),
('Oasis Tropical',2.0),
('Schweeps Agrumes',2.0),
('Sprite Original',2.0),
('Fuze Tea',2.0),
('Orangina',2.0),
('Oasis Pomme Cassis Framboise',2.0);


INSERT INTO ingrediant(nom,type,prix) VALUES 
('sauce tomate','sauce',0),
('crème fraîche','sauce',0),
('sauce barbecue','sauce',0),
('mozzarella','fromage',2.0),
('fromage de chèvre','fromage',0.5),
('Ambert','fromage',1.0),
('sauce blanche','fromage',0.5),
('parmigiano','fromage',2.0),
('raclette','fromage',1.0),
('emmental','fromage',0.5),
('jambon','viande',1.0),
('boeuf','viande',1.0),
('kebab','viande',1.0),
('pepperoni','viande',2.0),
('lardons','viande',0.5),
('poulet','viande',1.0),
('saumon','viande',1.5),
('merguez','viande',1.0),
('miel','legume',1.5),
('tomate','legume',0.5),
('champignons','legume',0.5),
('oignons rouges','legume',0.5),
('poivrons verts','legume',0.5),
('pommes de terre','legume',0.5);


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
('Nordique','saumon'),

('BPM','sauce barbecue'),
('BPM','boeuf'),
('BPM','poulet'),
('BPM','merguez'),
('BPM','mozzarella'),

('Pepperoni Lovers','sauce tomate'),
('Pepperoni Lovers','mozzarella'),
('Pepperoni Lovers','pepperoni'),

('Queen','sauce tomate'),
('Queen','jambon'),
('Queen','champignons'),
('Queen','mozzarella'),

('Chevre Miel','crème fraîche'),
('Chevre Miel','fromage de chèvre'),
('Chevre Miel','mozzarella'),
('Chevre Miel','miel'),

('Texane Barbecue','sauce barbecue'),
('Texane Barbecue','jambon'),
('Texane Barbecue','boeuf'),
('Texane Barbecue','mozzarella'),
('Texane Barbecue','lardons'),
('Texane Barbecue','champignons'),
('Texane Barbecue','oignons rouges'),

('Campagnarde','crème fraîche'),
('Campagnarde','mozzarella'),
('Campagnarde','lardons'),
('Campagnarde','oignons rouges'),
('Campagnarde','champignons'),

('Kasbah','sauce tomate'),
('Kasbah','mozzarella'),
('Kasbah','merguez'),
('Kasbah','kebab'),
('Kasbah','tomate'),
('Kasbah','oignons rouges'),
('Kasbah','sauce blanche'),

('Samouraï','sauce tomate'),
('Samouraï','mozzarella'),
('Samouraï','merguez'),
('Samouraï','poulet'),
('Samouraï','oignons rouges'),

('Chicken Parmesan','sauce tomate'),
('Chicken Parmesan','mozzarella'),
('Chicken Parmesan','poulet'),
('Chicken Parmesan','parmigiano'),
('Chicken Parmesan','tomate');

