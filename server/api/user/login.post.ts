// Import PrismaClient for database interactions
import { PrismaClient } from "@prisma/client";

// Import utility functions for password verification and token creation
import { verifyPassword } from "~/server/utils/password";
import { createToken } from "~/server/utils/session";

// Import userLoginSchema for request data validation
import { userLoginSchema } from "~/server/validation";

// Create an instance of the Prisma client
const prisma = new PrismaClient();

// Define an event handler for user login
export default defineEventHandler(async (req) => {
  try {
    // Read data from the request body
    const reqData = await readBody(req);

    // Validate the request data using the defined schema
    const { value, error } = await userLoginSchema.validate(reqData);

    if (error) {
      // If validation fails, throw a client error
      throw createError({
        message: error.message.replace(/"/g, ""),
        statusCode: 400,
        fatal: false,
      });
    }

    // Check if the user with the provided email exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: value.email,
        is_deleted: false, // Consider only undeleted users
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        password: true,
      },
    });

    if (!existingUser) {
      // If user does not exist, throw a client error
      throw createError({
        message: "Invalid credentials.",
        statusCode: 401,
        fatal: false,
      });
    }

    // Check if the provided password matches the stored hashed password
    const passwordMatch = await verifyPassword(
      value.password,
      existingUser.password
    );

    if (!passwordMatch) {
      // If password doesn't match, throw a client error
      throw createError({
        message: "Invalid credentials.",
        statusCode: 401,
        fatal: false,
      });
    }

    // Create a JWT token for the authenticated user
    const token = await createToken(existingUser);

    // Check if a token record for the user already exists in the database
    const existingToken = await prisma.token.findFirst({
      where: {
        user_id: existingUser.id,
      },
    });

    if (existingToken) {
      // Update the existing token record in the database
      await prisma.token.update({
        where: { id: existingToken.id },
        data: {
          token,
          is_deleted: false,
        },
      });
    } else {
      // Create a new token record in the database
      await prisma.token.create({
        data: {
          user_id: existingUser.id,
          token,
          is_deleted: false,
        },
      });
    }

    // Return a success response with the created user and token details
    return {
      message: "User login successful",
      user: existingUser,
      token,
      success: true,
      statusCode: 200,
    };
  } catch (error: any) {
    // Handle any errors that occur during the process and return a client error
    throw createError({
      message:
        error.message || "An error occurred while processing the request.",
      statusCode: 400,
      fatal: false,
    });
  }
});
