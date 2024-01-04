// Import necessary modules
import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";
import { userCreateSchema } from "~/server/validation";

// Create an instance of the Prisma client
const prisma = new PrismaClient();

// Define an event handler for user creation
export default defineEventHandler(
  async (
    req: any
  ): Promise<{
    message: string;
    createdUser?: User;
    success: Boolean;
    statusCode: Number;
  }> => {
    try {
      // Read data from the request body
      const reqData: any = await readBody(req); // Replace 'any' with the actual type

      // Validate the request data using the defined schema
      const { value, error }: { value: any; error: any } =
        await userCreateSchema.validate(reqData); // Replace 'any' with the actual type

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
        const existingUser: User | null = await prisma.user.findUnique({
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
      const hashedPassword: string = await bcrypt.hash(value.password, 10);

      // Create a new user using Prisma
      const createdUser: User = await prisma.user.create({
        data: {
          first_name: value.first_name,
          email: value.email,
          last_name: value.last_name,
          password: hashedPassword,
          is_deleted: false,
        },
      });

      // Return a success response with the created user
      return {
        message: "User created successfully",
        createdUser,
        success: true,
        statusCode: 200,
      };
    } catch (error: any) {
      // Handle any errors that occur during the process
      throw createError({
        message: error,
        statusCode: 400,
        fatal: false,
      });
    }
  }
);
