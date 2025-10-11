import { FastifyInstance } from "fastify";
import { z } from "zod";
import bcrypt from "bcrypt";
import { db } from "../../db";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";

const registerStudentSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

export async function studentRoutes(fastify: FastifyInstance) {
  fastify.post("/students/register", async (request, reply) => {
    const { username, email, password } = registerStudentSchema.parse(
      request.body
    );

    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser) {
      return reply
        .status(409)
        .send({ message: "User with this email already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await db
      .insert(users)
      .values({
        username,
        email,
        passwordHash,
        role: "student",
      })
      .returning();

    return reply.status(201).send({
      message: "Student account successfully created",
      user: newUser[0],
    });
  });
}
