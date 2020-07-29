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
-- CREATE TABLE pins (
--   id SERIAL PRIMARY KEY NOT NULL,
--   map_id INTEGER REFERENCES map(id) ON DELETE CASCADE,
--   latitude1 float,
--   longitude1 float,
--   latitude2 float,
--   longitude2 float,
--   latitude3 float,
--   longitude3 float,
--   latitude4 float,
--   longitude4 float,
--   latitude5 float,
--   longitude5 float,
--   latitude6 float,
--   longitude6 float
-- );
--map of pins
CREATE TABLE pins (
  id SERIAL PRIMARY KEY NOT NULL,
  mapid INTEGER,
  username VARCHAR(255),
  mapTitle VARCHAR(255),
  mapDes VARCHAR(255),
  pinNote VARCHAR(255),
  latitude float,
  longitude float
);
--user specific creations

