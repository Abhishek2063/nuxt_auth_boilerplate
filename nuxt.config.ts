// nuxt.config.ts
// https://nuxt.com/docs/api/configuration/nuxt-config

import { resolve } from "path";

export default defineNuxtConfig({
  devtools: { enabled: false },
  alias: {
    "@": resolve(__dirname, "/"),
  },
  css: ["~/assets/scss/main.scss"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  head: {
    title: "Nuxt with TypeScript, Prisma, and PostgreSQL - Boilerplate Project",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: `# Nuxt TypeScript Prisma PostgreSQL Boilerplate

**Project Overview:**

This project is a robust boilerplate for building modern web applications using Nuxt.js, TypeScript, Prisma, and PostgreSQL. It serves as a solid foundation for developers looking to kickstart projects with authentication, RESTful APIs, and a well-organized file structure.

**Key Features:**

- **Nuxt.js with TypeScript:** Leverage the power of Nuxt.js for server-side rendering and efficient Vue.js development, enhanced by TypeScript for a statically-typed codebase and improved developer experience.

- **Prisma with PostgreSQL:** Utilize Prisma as the database toolkit to streamline database interactions and seamlessly connect with PostgreSQL, ensuring a scalable and efficient data storage solution.

- **Authentication:** Incorporate a robust authentication system to secure user access, providing a foundation for building user-specific features and ensuring data privacy.

- **RESTful APIs:** Implement RESTful APIs for seamless communication between the frontend and backend, following industry best practices for designing scalable and maintainable API endpoints.

- **Todo App Component:** Included is a Todo application component, demonstrating how to manage CRUD operations, user interactions, and state management within the Nuxt framework.

- **Professional File Structure:** Adopt a professional and scalable file structure, facilitating code organization, maintenance, and collaboration among developers.

**Meta Tags:**

- **Title:** Nuxt TypeScript Prisma PostgreSQL - Boilerplate Project
- **Description:** A comprehensive boilerplate project for building modern web applications using Nuxt.js, TypeScript, Prisma, and PostgreSQL, featuring authentication, RESTful APIs, and a professional file structure.
- **Keywords:** Nuxt, TypeScript, Prisma, PostgreSQL, Auth, API, Todo
- **Author:** [Your Name]

**Social Media Sharing:**

- **Open Graph (og:image):** /path/to/your/og/image.jpg
- **Twitter (twitter:image):** /path/to/your/twitter/image.jpg

This project sets the stage for rapid development, enabling developers to focus on building feature-rich applications without the hassle of setting up foundational components.
`,
      },
      {
        name: "keywords",
        content: "Nuxt, TypeScript, Prisma, PostgreSQL, Auth, API, Todo",
      },
      { name: "author", content: "Your Name" },
      {
        name: "og:title",
        content:
          "Nuxt with TypeScript, Prisma, and PostgreSQL - Boilerplate Project",
      },
      {
        name: "og:description",
        content: `# Nuxt TypeScript Prisma PostgreSQL Boilerplate

**Project Overview:**

This project is a robust boilerplate for building modern web applications using Nuxt.js, TypeScript, Prisma, and PostgreSQL. It serves as a solid foundation for developers looking to kickstart projects with authentication, RESTful APIs, and a well-organized file structure.

**Key Features:**

- **Nuxt.js with TypeScript:** Leverage the power of Nuxt.js for server-side rendering and efficient Vue.js development, enhanced by TypeScript for a statically-typed codebase and improved developer experience.

- **Prisma with PostgreSQL:** Utilize Prisma as the database toolkit to streamline database interactions and seamlessly connect with PostgreSQL, ensuring a scalable and efficient data storage solution.

- **Authentication:** Incorporate a robust authentication system to secure user access, providing a foundation for building user-specific features and ensuring data privacy.

- **RESTful APIs:** Implement RESTful APIs for seamless communication between the frontend and backend, following industry best practices for designing scalable and maintainable API endpoints.

- **Todo App Component:** Included is a Todo application component, demonstrating how to manage CRUD operations, user interactions, and state management within the Nuxt framework.

- **Professional File Structure:** Adopt a professional and scalable file structure, facilitating code organization, maintenance, and collaboration among developers.

**Meta Tags:**

- **Title:** Nuxt TypeScript Prisma PostgreSQL - Boilerplate Project
- **Description:** A comprehensive boilerplate project for building modern web applications using Nuxt.js, TypeScript, Prisma, and PostgreSQL, featuring authentication, RESTful APIs, and a professional file structure.
- **Keywords:** Nuxt, TypeScript, Prisma, PostgreSQL, Auth, API, Todo
- **Author:** [Your Name]

**Social Media Sharing:**

- **Open Graph (og:image):** /path/to/your/og/image.jpg
- **Twitter (twitter:image):** /path/to/your/twitter/image.jpg

This project sets the stage for rapid development, enabling developers to focus on building feature-rich applications without the hassle of setting up foundational components.
`,
      },
      // { name: "og:image", content: "/path/to/your/og/image.jpg" },
      // { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content:
          "Nuxt with TypeScript, Prisma, and PostgreSQL - Boilerplate Project",
      },
      {
        name: "twitter:description",
        content: `# Nuxt TypeScript Prisma PostgreSQL Boilerplate

**Project Overview:**

This project is a robust boilerplate for building modern web applications using Nuxt.js, TypeScript, Prisma, and PostgreSQL. It serves as a solid foundation for developers looking to kickstart projects with authentication, RESTful APIs, and a well-organized file structure.

**Key Features:**

- **Nuxt.js with TypeScript:** Leverage the power of Nuxt.js for server-side rendering and efficient Vue.js development, enhanced by TypeScript for a statically-typed codebase and improved developer experience.

- **Prisma with PostgreSQL:** Utilize Prisma as the database toolkit to streamline database interactions and seamlessly connect with PostgreSQL, ensuring a scalable and efficient data storage solution.

- **Authentication:** Incorporate a robust authentication system to secure user access, providing a foundation for building user-specific features and ensuring data privacy.

- **RESTful APIs:** Implement RESTful APIs for seamless communication between the frontend and backend, following industry best practices for designing scalable and maintainable API endpoints.

- **Todo App Component:** Included is a Todo application component, demonstrating how to manage CRUD operations, user interactions, and state management within the Nuxt framework.

- **Professional File Structure:** Adopt a professional and scalable file structure, facilitating code organization, maintenance, and collaboration among developers.

**Meta Tags:**

- **Title:** Nuxt TypeScript Prisma PostgreSQL - Boilerplate Project
- **Description:** A comprehensive boilerplate project for building modern web applications using Nuxt.js, TypeScript, Prisma, and PostgreSQL, featuring authentication, RESTful APIs, and a professional file structure.
- **Keywords:** Nuxt, TypeScript, Prisma, PostgreSQL, Auth, API, Todo
- **Author:** [Your Name]

**Social Media Sharing:**

- **Open Graph (og:image):** /path/to/your/og/image.jpg
- **Twitter (twitter:image):** /path/to/your/twitter/image.jpg

This project sets the stage for rapid development, enabling developers to focus on building feature-rich applications without the hassle of setting up foundational components.
`,
      },
      // { name: "twitter:image", content: "/path/to/your/twitter/image.jpg" },
    ],
  },
  runtimeConfig: {
    // Will be available in both server and client
    tokenSecret: process.env.TOKEN_SECRET,
    authSecret: process.env.AUTH_SECRET
  },
});
