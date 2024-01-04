// Import PrismaClient for database interactions
import { PrismaClient, Todo } from "@prisma/client";

// Create an instance of the Prisma client
const prisma = new PrismaClient();

/**
 * Handles the retrieval of paginated todo records for a user.
 * @param req The request object.
 * @returns Paginated todo records along with metadata.
 */
export default defineEventHandler(async (req: any): Promise<{
  message: string;
  records?: Todo[];
  page: number;
  totalPages: number;
  totalCount: number;
  success: boolean;
  statusCode: number;
}> => {
  try {
    // Extract query parameters, page number, and headers from the request
    const query = getQuery(req);
    const page = Number(query.page) || 1;
    const headers: any = getRequestHeaders(req);
    const limit = 10;


    // Calculate the skip value for pagination
    const skip = (page - 1) * limit;

    // Get the total count of undeleted todo records for the user
    const totalCount = await prisma.todo.count({
      where: {
        is_deleted: false,
        user_id: Number(headers.user_id),
      },
    });

    // Calculate total pages based on the limit
    const totalPages = Math.ceil(totalCount / limit);

    // Validate the requested page number
    if (page > totalPages) {
      throw createError({
        message: "Invalid page number. Page number exceeds total pages.",
        statusCode: 401,
        fatal: false,
      });
    }

    // Fetch paginated todo records for the user
    const records = await prisma.todo.findMany({
      where: {
        is_deleted: false,
        user_id: Number(headers.user_id),
      },
      orderBy: {
        created_at: "desc",
      },
      take: limit,
      skip: skip,
      select: {
        id: true,
        title: true,
        description: true,
        created_at: true,
      },
    });

    // Return the paginated todo records along with metadata
    return {
      message: "Todo records fetched successfully",
      records,
      page,
      totalPages,
      totalCount,
      success: true,
      statusCode: 200,
    };
  } catch (error: any) {
    // Handle any errors that occur during the process and return a client error
    throw createError({
      message: error.message || "An error occurred while processing the request.",
      statusCode: 400,
      fatal: false,
    });
  }
});
