import { PrismaClient } from "@prisma/client";
import cors from "@fastify/cors";
import Fastify from "fastify";

const app = Fastify();
app.register(cors);

const prisma = new PrismaClient();

app.get("/habits", async () => {
  const habits = await prisma.habit.findMany();
  return habits;
});

app.listen({ port: 3000 }).then(() => console.info("HTTP server running..."));
