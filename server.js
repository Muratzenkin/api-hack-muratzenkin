import express from "express";
// Ermöglicht den Zugriff auf die Daten in der .env-Datei über process.env.
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import { connect } from "./db.js";

dotenv.config();

connect();

const app = express();
app.use(express.json());

// Diese Struktur umfasst die Routen in den Dateien authRoutes und userRoutes in der Hauptanwendung. Zum Beispiel:
// POST /auth/login
// GET /users/:benutzername
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

const port = 4000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
