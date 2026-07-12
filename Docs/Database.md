# Database Design

## Entities & Schema
TransitOps utilizes a relational schema optimized for ACID compliance during high-frequency trip and maintenance updates.

* **users & roles:** Handles user credentials and role assignments (`Fleet Manager`, `Driver`, etc.).
* **vehicles:** Tracks fleet assets, registration numbers, and status (`Available`, `On Trip`, `In Shop`).
* **drivers:** Manages driver profiles, contact info, and status.
* **trips:** Core operational table linking a vehicle, driver, route details, and status.
* **maintenance_logs:** Tracks issues, costs, and scheduling for vehicle maintenance.
* **fuel_logs:** Logs fuel intake and costs per vehicle.
* **expenses:** Tracks general overhead expenses.

## Entity Relationships
* `users` ───► `drivers` (1:1 Selection)
* `vehicles` ───► `trips` (1:M)
* `drivers` ───► `trips` (1:M)
* `vehicles` ───► `maintenance_logs` (1:M)
* `vehicles` ───► `fuel_logs` (1:M)
* `vehicles` ───► `expenses` (1:M)