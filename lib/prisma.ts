import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const connectionString =
  process.env.DATABASE_URL ??
  process.env.POSTGRES_PRISMA_URL ??
  process.env.POSTGRES_URL;

const shouldUseSsl = Boolean(
  connectionString &&
    (connectionString.includes("supabase.co") ||
      connectionString.includes("sslmode=require"))
);

const pool = connectionString
  ? new Pool({
      connectionString,
      ssl: shouldUseSsl ? { rejectUnauthorized: false } : undefined,
      connectionTimeoutMillis: 15000,
    })
  : null;

const adapter = pool ? new PrismaPg(pool) : null;

if (!connectionString) {
  console.warn(
    "[prisma] No se encontró DATABASE_URL/POSTGRES_PRISMA_URL/POSTGRES_URL. La app iniciará, pero las consultas a BD fallarán hasta configurar variables de entorno."
  );
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    ...(adapter ? { adapter } : {}),
    log: ["error", "warn"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
