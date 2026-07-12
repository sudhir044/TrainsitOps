CREATE TABLE fuel_logs (

    id SERIAL PRIMARY KEY,

    vehicle_id INTEGER
        REFERENCES vehicles(id)
        ON DELETE CASCADE,

    liters DECIMAL(10,2) NOT NULL,

    fuel_cost DECIMAL(12,2) NOT NULL,

    fuel_date DATE DEFAULT CURRENT_DATE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);