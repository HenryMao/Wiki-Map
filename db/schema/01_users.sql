-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS pins CASCADE;
DROP TABLE IF EXISTS maps CASCADE;
DROP TABLE IF EXISTS user_maps CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
);
--actual locations
CREATE TABLE pins (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES user(id) ON DELETE CASCADE,
  map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE,
  location_title TEXT,
  image_url VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL
  -- API (longitude, lattitue)?
)
--map of pins
CREATE TABLE maps (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES user(id) ON DELETE CASCADE,
  map_title VARCHAR(255) NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE
)
--user specific creations
CREATE TABLE user_maps (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES user(id) ON DELETE CASCADE,
  map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE,
  date TIMESTAMP
)

