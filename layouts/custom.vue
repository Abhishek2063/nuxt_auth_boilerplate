<template>
    <div>
   
      <slot />
    </div>
  </template>
  
  <script>
  export default {
    setup() {
      return {};
    },
  };
  </script>
  
  <style lang="scss" scoped>
  body {
    margin: 0;
    padding: 0;
    background-image: url('/assets/images/backgrond.gif'); /* Replace with the actual path to your background image */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  
  /* Add additional styling for your layout if needed */
  </style>
  