CREATE TABLE trips (

    id SERIAL PRIMARY KEY,

    vehicle_id INTEGER
        REFERENCES vehicles(id),

    driver_id INTEGER
        REFERENCES drivers(id),

    source VARCHAR(150) NOT NULL,

    destination VARCHAR(150) NOT NULL,

    cargo_weight DECIMAL(10,2),

    planned_distance DECIMAL(10,2),

    dispatch_date TIMESTAMP,

    completion_date TIMESTAMP,

    fuel_used DECIMAL(10,2),

    final_odometer INTEGER,

    revenue DECIMAL(12,2),

    status VARCHAR(20)
        DEFAULT 'Draft'
        CHECK(status IN
        (
            'Draft',
            'Dispatched',
            'Completed',
            'Cancelled'
        )),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);