// 代码生成时间: 2025-08-18 16:00:20
  import { writable } from 'svelte/store';

  // Create a writable store to hold the generated JSON data
  const jsonData = writable('');

  // Function to generate test data
  function generateData() {
    try {
      // Generate random test data
      const data = {
        id: Date.now(),
        name: `User${Math.floor(Math.random() * 10000)}`,
        email: `user${Math.floor(Math.random() * 10000)}@example.com`,
        age: Math.floor(Math.random() * 100),
        gender: Math.random() > 0.5 ? 'Male' : 'Female'
      };

      // Convert the data to JSON string
      jsonData.set(JSON.stringify(data, null, 2));

    } catch (error) {
      // Handle any errors that occur during data generation
      console.error('Error generating test data:', error);
      jsonData.set('Error generating test data.');
    }
  }

  export {
    generateData,
    jsonData
  };
</script>