<!-- /components/navbar/index.vue -->

<template>
    <nav class=" fixed top-16 left-0 right-0 bg-gray-800 text-white p-4 flex justify-center items-center">
      <!-- Navigation links -->
      <NuxtLink to="/dashboard" class="nav-link" exact>
        Dashboard
      </NuxtLink>
      <NuxtLink to="/about" class="nav-link">
        About
      </NuxtLink>
      <NuxtLink to="/profile" class="nav-link">
        Profile
      </NuxtLink>
    </nav>
  </template>
  
  <script lang="ts">
  // You can add TypeScript logic here if needed
  export default {
    // Add any necessary logic here
  };
  </script>
  
  <style lang="scss" scoped>
  /* Add your custom styles here */
  /* For example, you can customize the text color, add padding, or define hover styles */
  .nav-link {
    position: relative;
    padding: 8px 16px;
    color: white;
    text-decoration: none;
    margin: 0 8px;
    transition: color 0.3s ease;
  }
  
  .nav-link:hover,
  .nav-link.nuxt-link-exact-active {
    color: #4ea8de; /* Change the color on hover and when the link is active (selected) */
  }
  
  .nav-link:before,
  .nav-link:after {
    content: "";
    position: absolute;
    height: 100%;
    width: 8px;
    background: #2c3e50; /* Set the border color */
  }
  
  .nav-link:before {
    left: -8px;
    clip-path: polygon(0 0, 100% 0, 0% 100%);
  }
  
  .nav-link:after {
    right: -8px;
    clip-path: polygon(100% 0, 0 100%, 100% 100%);
  }
  </style>
  