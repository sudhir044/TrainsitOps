CREATE TABLE drivers (

    id SERIAL PRIMARY KEY,

    user_id INTEGER UNIQUE
        REFERENCES users(id)
        ON DELETE CASCADE,

    license_number VARCHAR(100)
        UNIQUE NOT NULL,

    license_category VARCHAR(20),

    expiry_date DATE NOT NULL,

    safety_score DECIMAL(5,2)
        DEFAULT 100,

    status VARCHAR(20)
        DEFAULT 'Available'
        CHECK(status IN
        (
            'Available',
            'On Trip',
            'Off Duty',
            'Suspended'
        )),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);