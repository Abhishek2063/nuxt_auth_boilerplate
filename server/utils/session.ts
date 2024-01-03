import jwt from "jsonwebtoken";

/**
 * Creates a JWT token for the provided user.
 *
 * @param {object} user - The user object for whom the token is created.
 * @returns {Promise<string>} - A promise resolving to the JWT token.
 */
const createToken = async (user: any): Promise<string> => {
  try {
    // Retrieve runtime configuration
    const config = useRuntimeConfig();

    // Sign the user object to create a JWT token
    const token = await jwt.sign(user, config.tokenSecret);

    // Return the generated JWT token
    return token;
  } catch (error) {
    // Handle any unexpected errors during token creation
    throw createError({
      message: `Error during token creation.: ${error}`,
      statusCode: 401,
      fatal: false,
    });
  }
};

/**
 * Verifies the validity of the provided JWT token.
 *
 * @param {string} token - The JWT token to be verified.
 * @returns {Promise<any | string>} - A promise resolving to the decoded token payload or an error message.
 */
const verifyToken = async (token: string): Promise<any | string> => {
  try {
    // Retrieve runtime configuration
    const config = useRuntimeConfig();

    // Verify the JWT token using the provided secret
    const decodedToken = await jwt.verify(token, config.tokenSecret);

    // Return the decoded token payload
    return decodedToken;
  } catch (err) {
    // Handle token verification errors, e.g., expired token
    throw createError({
      message: `Token expired or invalid.: ${err}`,
      statusCode: 401,
      fatal: false,
    });
  }
};

export { createToken, verifyToken };
