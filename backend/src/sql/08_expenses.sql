CREATE TABLE expenses (

    id SERIAL PRIMARY KEY,

    vehicle_id INTEGER
        REFERENCES vehicles(id)
        ON DELETE CASCADE,

    expense_type VARCHAR(50)
        CHECK(expense_type IN
        (
            'Insurance',
            'Toll',
            'Parking',
            'Other'
        )),

    amount DECIMAL(12,2) NOT NULL,

    description TEXT,

    expense_date DATE DEFAULT CURRENT_DATE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);