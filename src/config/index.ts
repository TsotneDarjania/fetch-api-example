import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const DATABASE_PORT = process.env.DATABASE_SERVER_PORT || 3001;
