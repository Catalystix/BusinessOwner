INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Elliot", "Smith", 1),
       ("Amira", "Afzal", 2),
       ("Christoper", "Lee", 3),
       ("Verónica", "Rodriguez", 4),
       ("Igor", "Stein", 5);
       

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Tax Collector" 5000, 1),
       (2, "Teacher", 4000, 2),
       (3, "Labor Force", 3000, 2),
       (4, "Stripper", 10000, 2),
       (5, "Developer", 33000, 1);

INSERT INTO department (id, department_name)
VALUES (1, "Government"),
       (2, "Education"),
       (3, "Constuction"),
       (4, "Self Employed");

-- do we need to do this "seeds thing"?

-- SOURCE db/seeds.sql
-- SELECT * FROM "employee" to see tables with value inputs