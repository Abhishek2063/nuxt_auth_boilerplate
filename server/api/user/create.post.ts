// Import necessary modules
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { userCreateSchema } from "~/server/validation";
// Create an instance of the Prisma client
const prisma = new PrismaClient();

// Define an event handler for user creation
export default defineEventHandler(async (req) => {
  try {
    // Read data from the request body
    const reqData = await readBody(req);

    // Validate the request data using the defined schema
    const { value, error } = await userCreateSchema.validate(reqData);

    if (error) {
      // If validation fails, throw a client error
      throw createError({
        message: error.message.replace(/"/g, ""),
        statusCode: 400,
        fatal: false,
      });
    }

    // Check if the email already exists in the database
    if (value.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email: value.email },
      });
      if (existingUser) {
        throw createError({
          message: "Email is already exist. Please use a different email.",
          statusCode: 400,
          fatal: false,
        });
      }
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(value.password, 10);

    // Create a new user using Prisma
    const createdUser = await prisma.user.create({
      data: {
        first_name: value.first_name,
        email: value.email,
        last_name: value.last_name,
        password: hashedPassword,
        is_deleted: false,
      }, // Explicitly define the type of 'data'
    });

    // Return a success response with the created user
    return { message: "User created successfully", createdUser };
  } catch (error: any) {
    // Handle any errors that occur during the process
    throw createError({
      message: error,
      statusCode: 400,
      fatal: false,
    });
  }
});
