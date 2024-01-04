// Import PrismaClient for database interactions
import { PrismaClient, Todo } from "@prisma/client";
import { todoCreateSchema } from "~/server/validation";

// Create an instance of the Prisma client
const prisma = new PrismaClient();

/**
 * Handles the update of a specific todo for a user.
 * @param req The request object.
 * @returns A response indicating whether the todo update was successful.
 */
export default defineEventHandler(
  async (
    req: any
  ): Promise<{ message: string; success: boolean; statusCode: number }> => {
    try {
      // Extract todo ID from router parameters
      const todo_id: string = getRouterParam(req, "id") || ""; // Assuming 'id' is a string, adjust accordingly
      const headers: any = getRequestHeaders(req);
      const user_id: number = Number(headers.user_id);

      // Check if the specified todo exists and is not deleted
      const isTodoExist: Todo | null = await prisma.todo.findFirst({
        where: {
          id: Number(todo_id),
          is_deleted: false,
        },
      });

      if (!isTodoExist) {
        // If the todo does not exist, throw a client error
        throw createError({
          message: "Todo does not exist or has been deleted.",
          statusCode: 401,
          fatal: false,
        });
      }

      // Update the specified todo
      await prisma.todo.update({
        where: {
          id: Number(todo_id),
          is_deleted: false,
        },
        data: {
          is_deleted: true,
        },
      });

      // Return a success response
      return {
        message: "Todo deleted successfully",
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
