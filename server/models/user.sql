
DROP DATABASE IF EXISTS userdb;
CREATE DATABASE userdb;

CREATE TABLE user_info (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  occupation VARCHAR,
  age INTEGER,
  sex VARCHAR
);

INSERT INTO user_info(name, occupation, age, sex)
  VALUES ('Reema', 'Teacher', 28, 'M');