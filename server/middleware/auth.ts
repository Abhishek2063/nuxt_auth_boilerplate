import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
import { verifyToken } from "~/server/utils/session";

export default defineEventHandler(async (req) => {
  try {
    // Get all request headers
    const headers = getRequestHeaders(req);

    const url = getRequestURL(req);

    // Extract the path from the URL
    const path = url.pathname;

    // Paths that do not require authentication
    const publicPaths = ["/api/user/login", "/api/user/create"];

    if (!publicPaths.includes(path)) {
      // If the path is not in the publicPaths array, check for authentication

      const authorizationHeader = headers.authorization;

      if (!authorizationHeader) {
        throw createError({
          message: "Unauthorized - Token not provided",
          statusCode: 401,
          fatal: false,
        });
      }

      // Verify the token
      const decodedToken = await verifyToken(authorizationHeader);

      // Check if the user is authenticated (you may want to add additional checks)
      const authenticatedUser = await prisma.token.findFirst({
        where: {
          user_id: decodedToken.id,
          is_deleted: false,
        },
      });

      if (!authenticatedUser) {
        throw createError({
          message: "Unauthorized - Invalid token",
          statusCode: 401,
          fatal: false,
        });
      }
    }

    // Continue to the next middleware or handler
  } catch (error: any) {
    throw createError({
      message: error.message || "Authentication error",
      statusCode: error.statusCode || 500,
      fatal: false,
    });
  }
});
