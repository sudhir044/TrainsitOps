
DROP TABLE IF EXISTS expenses CASCADE;
DROP TABLE IF EXISTS fuel_logs CASCADE;
DROP TABLE IF EXISTS maintenance_logs CASCADE;
DROP TABLE IF EXISTS trips CASCADE;
DROP TABLE IF EXISTS drivers CASCADE;
DROP TABLE IF EXISTS vehicles CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS roles CASCADE;



CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO roles (name) VALUES
('Fleet Manager'),
('Driver'),
('Safety Officer'),
('Financial Analyst');


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    role_id INT REFERENCES roles(id),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    status VARCHAR(20) DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE vehicles (
    id SERIAL PRIMARY KEY,
    registration_number VARCHAR(30) UNIQUE NOT NULL,
    vehicle_name VARCHAR(100) NOT NULL,
    model VARCHAR(100),
    vehicle_type VARCHAR(50),
    max_load_capacity DECIMAL(10,2) NOT NULL,
    odometer INT DEFAULT 0,
    acquisition_cost DECIMAL(12,2),
    status VARCHAR(20) DEFAULT 'Available'
        CHECK(status IN ('Available','On Trip','In Shop','Retired')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE drivers (
    id SERIAL PRIMARY KEY,
    user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    license_number VARCHAR(100) UNIQUE NOT NULL,
    license_category VARCHAR(20),
    license_expiry DATE NOT NULL,
    contact_number VARCHAR(20),
    safety_score DECIMAL(5,2) DEFAULT 100,
    status VARCHAR(20) DEFAULT 'Available'
        CHECK(status IN ('Available','On Trip','Off Duty','Suspended')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE trips (
    id SERIAL PRIMARY KEY,
    vehicle_id INT REFERENCES vehicles(id),
    driver_id INT REFERENCES drivers(id),

    source VARCHAR(150) NOT NULL,
    destination VARCHAR(150) NOT NULL,

    cargo_weight DECIMAL(10,2),
    planned_distance DECIMAL(10,2),

    dispatch_date TIMESTAMP,
    completion_date TIMESTAMP,

    fuel_used DECIMAL(10,2),
    final_odometer INT,

    revenue DECIMAL(12,2) DEFAULT 0,

    status VARCHAR(20) DEFAULT 'Draft'
        CHECK(status IN ('Draft','Dispatched','Completed','Cancelled')),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE maintenance_logs (
    id SERIAL PRIMARY KEY,
    vehicle_id INT REFERENCES vehicles(id),

    issue TEXT NOT NULL,
    description TEXT,

    maintenance_cost DECIMAL(12,2) DEFAULT 0,

    start_date DATE,
    end_date DATE,

    status VARCHAR(20) DEFAULT 'Pending'
        CHECK(status IN ('Pending','In Progress','Completed')),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE fuel_logs (
    id SERIAL PRIMARY KEY,
    vehicle_id INT REFERENCES vehicles(id),

    liters DECIMAL(10,2) NOT NULL,
    fuel_cost DECIMAL(12,2) NOT NULL,

    fuel_date DATE DEFAULT CURRENT_DATE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE expenses (
    id SERIAL PRIMARY KEY,
    vehicle_id INT REFERENCES vehicles(id),

    expense_type VARCHAR(30)
        CHECK(expense_type IN ('Fuel','Maintenance','Toll','Other')),

    amount DECIMAL(12,2) NOT NULL,

    description TEXT,

    expense_date DATE DEFAULT CURRENT_DATE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);