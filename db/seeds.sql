

-- --load department default--

INSERT INTO department (name)
VALUES ("Sales");
INSERT INTO department (name)
VALUES ("Engineering");
INSERT INTO department (name)
VALUES ("Finance");
INSERT INTO department (name)
VALUES ("Legal");


-- load default roles --

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 150000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 225000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 100000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Account Manager", 100000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 120000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Lawyer", 190000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ("Legal Team Lead", 190000, 4);




-- make default employees --

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mike", "Wazowski", 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tucker", "Carlson", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Junghoon","Yoon",3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sarah", "Lord", 4, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sam", "Kash", 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ricky", "Fits", 6, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Rocky", "Balboa", 6, 3);









-- populate all --
SELECT * FROM employee;
-- populate all --
SELECT * FROM role;
-- populate all --
SELECT * FROM department;











