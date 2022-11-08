CREATE TABLE takkies(
    id SERIAL PRIMARY KEY,
    color TEXT NOT NULL,
    size INT NOT NULL,
    price INT NOT NULL,
    brand TEXT NOT NULL,
    in_stock INT NOT NULL default 1,
);

create table customers(
    id serial primary key,
    named VARCHAR(15) NOT NULL,
    e_mail VARCHAR(15) NOT NULL,
    Code text not null   

);

INSERT INTO takkies(color,size,price,brand) VALUES ('White',4,250,'Nike'), 
('Blue',6,350,'Jordan'),
('Red',5,150,'Bathu')