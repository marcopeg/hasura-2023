CREATE TABLE IF NOT EXISTS bananas (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    origin VARCHAR(50),
    harvest_date DATE,
    quantity INT NOT NULL,
    price DECIMAL(5, 2) NOT NULL
);