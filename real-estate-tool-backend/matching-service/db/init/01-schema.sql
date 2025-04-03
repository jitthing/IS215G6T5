CREATE TABLE IF NOT EXISTS buyers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    contact VARCHAR(255) NOT NULL,
    preferences TEXT NOT NULL,
    embedded_string TEXT,
    agent_id INTEGER
);

CREATE TABLE IF NOT EXISTS sellers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    contact VARCHAR(255) NOT NULL,
    agent_id INTEGER
);

CREATE TABLE IF NOT EXISTS properties (
    id SERIAL PRIMARY KEY,
    seller_id INTEGER NOT NULL REFERENCES sellers(id),
    property_type VARCHAR(50) NOT NULL,
    floor_area_sqm FLOAT NOT NULL,
    remaining_lease_years INTEGER NOT NULL,
    remaining_lease_months INTEGER NOT NULL,
    flat_type VARCHAR(50) NOT NULL,
    floor_category VARCHAR(50) NOT NULL,
    town VARCHAR(100) NOT NULL,
    block VARCHAR(50) NOT NULL,
    street_name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    asking_price FLOAT NOT NULL
);
