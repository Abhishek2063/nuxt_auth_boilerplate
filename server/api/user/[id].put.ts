import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Handles the logout event for a user.
 * @param req The request object.
 * @returns A message indicating whether the user logout was successful.
 */
export default defineEventHandler(async (req) => {
  try {
    // Extract user ID from router parameters
    const user_id = getRouterParam(req, "id");

    // Check if the user is authenticated (you may want to add additional checks)
    const authenticatedUser = await prisma.token.findFirst({
      where: {
        user_id: Number(user_id),
        is_deleted: false,
      },
    });

    if (!authenticatedUser) {
      // If user does not exist, throw a client error
      throw createError({
        message: "User is not logged in.",
        statusCode: 401,
        fatal: false,
      });
    }

    // Update the token to null, effectively logging the user out
    await prisma.token.update({
      where: {
        id: Number(authenticatedUser.id),
        is_deleted: false,
      },
      data: {
        token: "",
      },
    });

    // Return a success message after successful logout
    return { message: "User Logout successful" };
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
