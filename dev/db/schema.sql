DROP DATABASE IF EXISTS emp_db;
CREATE DATABASE emp_db;

USE emp_db;

CREATE TABLE department (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(30)
);

CREATE TABLE employee (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NOT NULL
);

CREATE TABLE role (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  department_id INT NOT NULL,
  salary DECIMAL NOT NULL
);

-- look into making database more like this from instructional #15
-- DROP DATABASE IF EXISTS registrar_db;
-- PRIMARY KEY (id)
-- will have to use FOREIGN KEY (salary_id)
-- REFERENCES salary(id) for example
-- ON DELETE SET NULL



