// Import PrismaClient for database interactions
import { PrismaClient, Todo } from "@prisma/client"; // Assuming Todo is the type of your 'todo' model
import { todoCreateSchema } from "~/server/validation";

// Create an instance of the Prisma client
const prisma = new PrismaClient();

// Define an event handler for todo
export default defineEventHandler(
  async (
    req
  ): Promise<{
    message: string;
    createdtodo?: Todo;
    success: Boolean;
    statusCode: Number;
  }> => {
    try {
      // Read data from the request body
      const reqData: any = await readBody(req); 

      const headers: any = getRequestHeaders(req); 

      // Validate the request data using the defined schema
      const { value, error }: { value: any; error: any } =
        await todoCreateSchema.validate(reqData); 

      if (error) {
        // If validation fails, throw a client error
        throw createError({
          message: error.message.replace(/"/g, ""),
          statusCode: 400,
          fatal: false,
        });
      }

      // Create a new user using Prisma
      const createdtodo: Todo = await prisma.todo.create({
        data: {
          user_id: Number(headers.user_id),
          title: value.title,
          description: value.description,
          is_deleted: false,
        },
      });

      // Return a success response with the created user
      return {
        message: "Todo created successfully",
        createdtodo,
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
  }
);
