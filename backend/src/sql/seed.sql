INSERT INTO roles (role_name, description)
VALUES
    ('Fleet Manager', 'Manages vehicles and trips'),
    ('Driver', 'Assigned to trips'),
    ('Safety Officer', 'Monitors safety and maintenance'),
    ('Financial Analyst', 'Monitors expenses and reports');

INSERT INTO users (role_id, full_name, email, password, phone, status)
VALUES
    (1, 'Alice Reynolds', 'alice.reynolds@transport.com', '$2b$10$placeholderHashAliceReynolds1234567', '+12025550101', 'Active'),
    (1, 'Marcus Bennett', 'marcus.bennett@transport.com', '$2b$10$placeholderHashMarcusBennett2345678', '+12025550102', 'Active'),
    (4, 'Priya Santhanam', 'priya.santhanam@transport.com', '$2b$10$placeholderHashPriyaSanthanam3456789', '+12025550103', 'Active'),
    (3, 'David Okonkwo', 'david.okonkwo@transport.com', '$2b$10$placeholderHashDavidOkonkwo4567890', '+12025550104', 'Inactive');

INSERT INTO vehicles (registration_number, vehicle_name, model, vehicle_type, capacity, odometer, acquisition_cost, status)
VALUES
    ('TRK-1001', 'Freightliner Cascadia', 'Cascadia 126', 'Truck', 20000.00, 145230, 145000.00, 'Available'),
    ('TRK-1002', 'Peterbilt 579',         '579 Ultraloft','Truck', 22000.00, 98740,  158000.00, 'On Trip'),
    ('VAN-2001', 'Ford Transit 350',      'Transit 350',   'Van',  3500.00,  42010,  52000.00,  'In Shop'),
    ('BUS-3001', 'Mercedes Sprinter',     'Sprinter 2500', 'Bus',  18.00,   8740,   68000.00,  'Retired');

INSERT INTO drivers (user_id, license_number, license_category, expiry_date, safety_score, status)
VALUES
    (NULL, 'DL-CA-998877', 'A', '2028-06-01', 96.50, 'On Trip'),
    (NULL, 'DL-TX-445566', 'A', '2027-11-15', 92.00, 'Available'),
    (NULL, 'DL-FL-112233', 'B', '2029-02-20', 88.75, 'Off Duty'),
    (NULL, 'DL-NY-776655', 'A', '2026-09-30', 70.00, 'Suspended');

INSERT INTO trips (vehicle_id, driver_id, source, destination, cargo_weight, planned_distance, dispatch_date, completion_date, fuel_used, final_odometer, revenue, status)
VALUES
    (2, 1, 'Los Angeles, CA',      'Phoenix, AZ',       18500.00, 372.00,  '2026-07-10 06:00:00', '2026-07-10 13:45:00', 142.50, 145372, 5400.00, 'Completed'),
    (1, 2, 'Dallas, TX',           'Houston, TX',        2200.00, 239.00,  '2026-07-12 05:30:00', NULL,                   NULL,   NULL,   1850.00, 'Dispatched'),
    (1, 3, 'Seattle, WA',          'Portland, OR',       8200.00, 174.00,  '2026-07-14 08:00:00', NULL,                   NULL,   NULL,   NULL,    'Draft');

INSERT INTO maintenance_logs (vehicle_id, issue, description, cost, start_date, end_date, status)
VALUES
    (3, 'Brake pad wear',     'Front brake pads worn below safe limit; replace pads and inspect rotors.', 620.00, '2026-07-08', '2026-07-09', 'Completed'),
    (1, 'Oil change',          'Scheduled preventive oil change.',                                   180.00, '2026-06-20', '2026-06-20', 'Completed'),
    (2, 'Coolant leak',        'Radiator leak detected during pre-trip inspection.',                 NULL,   '2026-07-15', NULL,         'Pending');

INSERT INTO fuel_logs (vehicle_id, liters, fuel_cost, fuel_date)
VALUES
    (2, 142.50, 238.30, '2026-07-10'),
    (1, 95.00,  159.85, '2026-07-11'),
    (3, 60.00,  101.40, '2026-07-08');

INSERT INTO expenses (vehicle_id, expense_type, amount, description, expense_date)
VALUES
    (1, 'Insurance', 1250.00, 'Monthly fleet insurance premium',           '2026-07-01'),
    (2, 'Toll',       47.50,  'Highway 10 toll — LA to Phoenix',           '2026-07-10'),
    (2, 'Parking',    35.00,  'Overnight yard parking, Phoenix depot',      '2026-07-10'),
    (3, 'Other',     220.00,  'Replacement bulbs and minor shop supplies',  '2026-07-09');
        