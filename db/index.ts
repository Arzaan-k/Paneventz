import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from "@shared/schema";

// Connect to the real PostgreSQL database
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });