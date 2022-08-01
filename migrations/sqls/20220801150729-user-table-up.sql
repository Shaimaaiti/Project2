/* Replace with your SQL commands */
CREATE TABLE users (
  Id SERIAL PRIMARY KEY,
  username VARCHAR(50),
  email VARCHAR(50),
  phone VARCHAR(15),
  creation_date TIMESTAMPTZ DEFAULT Now(),
  hash_password VARCHAR(200)
);