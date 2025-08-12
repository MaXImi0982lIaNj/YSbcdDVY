// 代码生成时间: 2025-08-13 03:32:32
  // Define a writable store to manage the theme
  import { writable } from 'svelte/store';
  
  const theme = writable('light'); // Default theme is 'light'
  
  // Function to toggle the theme
  function toggleTheme() {
    try {
      const currentTheme = theme();
      theme(currentTheme === 'light' ? 'dark' : 'light');
    } catch (error) {
      console.error('Failed to toggle theme:', error);
    }
  }
</script>

<!-- Style tags to define light and dark themes -->
<style>
  :root {
    --background-color-light: #ffffff;
    --text-color-light: #000000;
    
    --background-color-dark: #333333;
    --text-color-dark: #ffffff;
  }
  
  .light {
    background-color: var(--background-color-light);
    color: var(--text-color-light);
  }
  
  .dark {
    background-color: var(--background-color-dark);
    color: var(--text-color-dark);
  }
</style>

<!-- UI to show the current theme and a button to toggle it -->
<div class="{theme() === 'light' ? 'light' : 'dark'}" bind:this={element}>
  <h1>Theme: <span>'{theme() === 'light' ? 'Light' : 'Dark'}'</span></h1>
  <button on:click={toggleTheme}>Toggle Theme</button>
</div>