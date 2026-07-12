CREATE TABLE vehicles (

    id SERIAL PRIMARY KEY,

    registration_number VARCHAR(30)
        UNIQUE NOT NULL,

    vehicle_name VARCHAR(100),

    model VARCHAR(100),

    vehicle_type VARCHAR(50),

    capacity DECIMAL(10,2) NOT NULL,

    odometer INTEGER DEFAULT 0,

    acquisition_cost DECIMAL(12,2),

    status VARCHAR(20)
        DEFAULT 'Available'
        CHECK(status IN
        (
            'Available',
            'On Trip',
            'In Shop',
            'Retired'
        )),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);