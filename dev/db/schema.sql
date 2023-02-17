DROP DATABASE IF EXISTS emp_db;
CREATE DATABASE emp_db;

USE emp_db;


CREATE TABLE department (
  id AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30)
);

CREATE TABLE employee (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT
);


CREATE TABLE role (
  ID INT PRIMARY KEY,
  title VARCHAR(30),
  department_id INT,
  salary DECIMAL
);

--look into making database more like this from instructional #15
--DROP DATABASE IF EXISTS registrar_db;
-- PRIMARY KEY (id)
-- will have to use FOREIGN KEY (salary_id)
-- REFERENCES salary(id) for example
-- ON DELETE SET NULL


CREATE TABLE courses (
  id INT NOT NULL,
  course_title VARCHAR(30) NOT NULL,
  course_description TEXT NOT NULL,
  active BOOLEAN NOT NULL,
  date_added DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);



