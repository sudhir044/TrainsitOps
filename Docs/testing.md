# Testing Strategy & API Verification

This document outlines the testing protocols used to verify the functional integrity and security configurations of the TransitOps platform.


##  Backend Integration Testing

All primary endpoints were verified using **Postman** to ensure correct status codes, payload validations, and error handling.

### Test Cases & Request Validations

#### 1. Authentication & Middleware Guard
* **Test:** Accessing protected route `/api/maintenance` without a header.
* **Expected Result:** `401 Unauthorized`.
* **Test:** Accessing Fleet Manager routes with a `Driver` JWT token.
* **Expected Result:** `403 Forbidden`.

#### 2. Data Integrity & Validation Triggers
* **Test:** Submitting an empty `issue` string or negative `cost` float to `/api/maintenance`.
* **Expected Result:** `400 Bad Request` containing explicit validation arrays:
  ```json
  {
    "success": false,
    "errors": [
      { "msg": "Issue is required", "param": "issue" },
      { "msg": "Cost must be a positive number", "param": "cost" }
    ]
  }