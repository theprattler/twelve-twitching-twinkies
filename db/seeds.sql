INSERT INTO department (name)
VALUES
  ('Admin'),
  ('Sales'),
  ('Accounting'),
  ('Customer Service'),
  ('Human Resources'),
  ('Quality Assurance'),
  ('Supplier Relations'),
  ('Temp');

INSERT INTO role (title, salary, department_id)
VALUES
  ('Manager', 50000, 1),
  ('Sales Rep', 35000, 2),
  ('Accountant', 40000, 3),
  ('Customer Service Rep', 30000, 4),
  ('Human Resources Rep', 40000, 5),
  ('Office Adminstrator', 30000, 1),
  ('Quality Assurance Officer', 35000, 6),
  ('Supplier Relations Rep', 35000, 7),
  ('Temporary Worker', 25000, 8);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Michael', 'Scott', 1, NULL),
  ('Dwight', 'Schrute', 2, 1),
  ('Jim', 'Halpert', 2, 1),
  ('Stanley', 'Hudson', 2, 1),
  ('Phyllis', 'Smith', 2, 1),
  ('Angela', 'Martin', 3, 1),
  ('Oscar', 'Nunez', 3, 1),
  ('Kevin', 'Malone', 3, 1),
  ('Pam', 'Beesly', 6, 1),
  ('Toby', 'Flenderson', 5, 1),
  ('Creed', 'Bratton', 7, 1),
  ('Meredith', 'Palmer', 8, 1),
  ('Ryan', 'Howard', 9, 1);