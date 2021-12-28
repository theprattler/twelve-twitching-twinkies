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

INSERT INTO employee (first_name, last_name, role_id)
VALUES
  ('Michael', 'Scott', 1),
  ('Dwight', 'Schrute', 2),
  ('Jim', 'Halpert', 2),
  ('Stanley', 'Hudson', 2),
  ('Phyllis', 'Smith', 2),
  ('Angela', 'Martin', 3),
  ('Oscar', 'Nunez', 3),
  ('Kevin', 'Malone', 3),
  ('Pam', 'Beesly', 6),
  ('Toby', 'Flenderson', 5),
  ('Creed', 'Bratton', 7),
  ('Meredith', 'Palmer', 8),
  ('Ryan', 'Howard', 9),
  ('Kelly', 'Kapoor', 4);