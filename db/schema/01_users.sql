-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS pins CASCADE;
DROP TABLE IF EXISTS maps CASCADE;
DROP TABLE IF EXISTS user_maps CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255),
  email VARCHAR(255)
);
--actual locations
CREATE TABLE pins (
  id SERIAL PRIMARY KEY NOT NULL,
  location_title TEXT,
  image_url VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL
  -- API (longitude, lattitue)?
);
--map of pins
CREATE TABLE maps (
  id SERIAL PRIMARY KEY NOT NULL,
  latitude float,
  longitude float
);
--user specific creations

