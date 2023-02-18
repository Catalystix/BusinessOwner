DROP DATABASE IF EXISTS emp_db;
CREATE DATABASE emp_db;

USE emp_db;

CREATE TABLE department (
  id INT PRIMARY KEY,
  department_name VARCHAR(30)
);

CREATE TABLE employee (
  id INT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT NOT NULL
);

CREATE TABLE role (
  id INT PRIMARY KEY,
  title VARCHAR(30),
  department_id INT,
  salary DECIMAL
);

-- look into making database more like this from instructional #15
-- DROP DATABASE IF EXISTS registrar_db;
-- PRIMARY KEY (id)
-- will have to use FOREIGN KEY (salary_id)
-- REFERENCES salary(id) for example
-- ON DELETE SET NULL



