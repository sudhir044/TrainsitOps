# Core Business Rules & Validations

To ensure seamless logistics operations, the system enforces the following constraints at the application and database level:

1.  **Vehicle Allocation:** A vehicle cannot be assigned to a new trip if its current status is `On Trip` or `In Shop`.
2.  **Driver Availability:** A driver cannot be assigned to multiple concurrent trips.
3.  **Maintenance Lockouts:** Real-time updates automatically transition a vehicle's status to `In Shop` when a maintenance log enters the `In Progress` stage, instantly removing it from the dispatchable pool.
4.  **Operational Safety:** Cargo weight parameters are validated against vehicle capacity payloads prior to trip initialization.