import bcrypt from 'bcrypt';

/**
 * Verifies whether the provided password matches the stored hashed password.
 * Throws a client error if the passwords do not match.
 *
 * @param {string} password - The plaintext password to be verified.
 * @param {string} hash - The hashed password stored in the database.
 * @returns {Promise<boolean>} - A promise resolving to true if the passwords match.
 * @throws {Error} - Throws a client error if the passwords do not match.
 */
export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  try {
    // Compare the provided password with the stored hashed password
    const compare = await bcrypt.compare(password, hash);

    // If passwords do not match, throw a client error
    if (!compare) {
      throw createError({
        message: 'Invalid credentials.',
        statusCode: 401,
        fatal: false,
      });
    }

    // Return true if passwords match
    return compare;
  } catch (error) {
    // Handle any unexpected errors during password verification
    throw createError({
      message: 'Error during password verification.',
      statusCode: 500,
      fatal: true,
    });
  }
};
