
USE employee_db;


SELECT * FROM employee;
-- populate all --
SELECT * FROM role;
-- populate all --
SELECT * FROM department;


SELECT employee.first_name AS First_Name,employee.last_name AS Last_Name,role.title AS Title,role.salary AS Salary,department.name AS Department, CONCAT(pikachu.first_name, ' ' ,pikachu.last_name) AS Manager FROM employee INNER JOIN role ON role.id = employee.role_id INNER JOIN department ON department.id = role.department_id LEFT JOIN employee pikachu ON employee.manager_id = pikachu.id;


