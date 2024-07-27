import { startDatabaseServer } from "./src/database";
import { startServer } from "./src/server";
// Main entry point for the application.
startServer();
startDatabaseServer();
