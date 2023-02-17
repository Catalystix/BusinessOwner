--some starter code from class to give an idea of how to use queries

SELECT *
FROM emp_db;

SELECT department, COUNT(id) AS number_courses
FROM course_names
GROUP BY department;

SELECT department, SUM(total_enrolled) AS sum_enrolled
FROM course_names
GROUP BY department;