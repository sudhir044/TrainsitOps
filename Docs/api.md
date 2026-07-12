# API Documentation

## Authentication Module
### Register User
* **URL:** `/api/auth/register`
* **Method:** `POST`
* **Body:**
    ```json
    {
      "name": "Parth",
      "email": "parth@transitops.com",
      "password": "securepassword",
      "role": "Fleet Manager"
    }
    ```

## Maintenance Module
### Create Maintenance Log
* **URL:** `/api/maintenance`
* **Method:** `POST`
* **Headers:** `Authorization: Bearer <token>`
* **Body:**
    ```json
    {
      "vehicle_id": 1,
      "issue": "Engine oil leakage",
      "description": "Oil leaking near filter housing",
      "cost": 4500
    }
    ```

### Start Maintenance
* **URL:** `/api/maintenance/:id/start`
* **Method:** `PATCH`
* *Action:* Changes maintenance status to `In Progress` and vehicle status to `In Shop`.

### Complete Maintenance
* **URL:** `/api/maintenance/:id/complete`
* **Method:** `PATCH`
* *Action:* Changes maintenance status to `Completed` and sets vehicle back to `Available`.