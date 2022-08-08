/* Replace with your SQL commands */

CREATE TABLE orders (
  Id SERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT Now(),
  userId INTEGER REFERENCES users (Id),
  status BOOLEAN 
);