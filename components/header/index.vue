<!-- /components/header/index.vue -->

<template>
    <header class="fixed top-0 left-0 right-0 bg-black bg-opacity-75 text-white p-4 flex justify-between items-center">
      <!-- Left side - Logo or Image -->
      <div>
        <img src="/assets/images/logo.png" alt="Logo" class="h-12 w-auto" />
      </div>
  
      <!-- Right side - Logout button -->
      <button @click="logout" class="bg-red-500 hover:bg-red-600 px-4 py-2 rounded">
        Logout
      </button>
    </header>
  </template>
  
  <script lang="ts">
  // You can add TypeScript logic here if needed
  export default {
    methods: {
      logout() {
        // Implement your logout logic here
        console.log('Logout clicked');
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  /* Add your custom styles here */
  /* For example, you can customize the logo size or add additional styling */
  </style>
  