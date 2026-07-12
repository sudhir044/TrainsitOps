import express from "express";
import cors from "cors";
import helmet from "helmet";

import authRoutes from "./routes/auth.routes.js";
import vehicleRoutes from "./routes/vehicle.routes.js";
import driverRoutes from "./routes/driver.routes.js";
import tripRoutes from "./routes/trip.routes.js";
app.use("/api/vehicles", vehicleRoutes);

import maintenanceRoutes from "./routes/maintenance.routes.js";
import fuelRoutes from "./routes/fuel.routes.js";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use("/api/fuel", fuelRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "TransitOps API Running ",
    });
});
app.use("/api/drivers", driverRoutes);
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/maintenance", maintenanceRoutes);

export default app;