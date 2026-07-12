CREATE TABLE maintenance_logs (

    id SERIAL PRIMARY KEY,

    vehicle_id INTEGER
        REFERENCES vehicles(id)
        ON DELETE CASCADE,

    issue TEXT NOT NULL,

    description TEXT,

    cost DECIMAL(12,2),

    start_date DATE,

    end_date DATE,

    status VARCHAR(20)
        DEFAULT 'Pending'
        CHECK(status IN
        (
            'Pending',
            'In Progress',
            'Completed'
        )),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);