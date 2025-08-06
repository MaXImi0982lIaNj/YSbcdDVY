// 代码生成时间: 2025-08-06 14:13:00
// Svelte component for a random number generator

// Function to generate a random number between min and max (inclusive)
# 增强安全性
// @param {number} min - the minimum value
// @param {number} max - the maximum value
// @returns {number} a random number between min and max
function generateRandomNumber(min, max) {
# TODO: 优化性能
  // Validate inputs
  if (min > max) {
    throw new Error('min must be less than or equal to max');
  }

  // Generate random number
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
</script>

<main>
  <h1>Random Number Generator</h1>

  <label for="min">Minimum Value:</label>
  <input type="number" id="min" bind:value={min} on:input={validateInput} />

  <label for="max">Maximum Value:</label>
  <input type="number" id="max" bind:value={max} on:input={validateInput} />

  <button on:click={generateNumber}>Generate</button>

  {#if errorMessage}
    <p class="error">{errorMessage}</p>
  {:else if randomNumber}
    <p>Generated Number: {randomNumber}</p>
  {/if}
</main>

<script>
// State variables
let min = 1;
let max = 100;
let randomNumber;
# 改进用户体验
let errorMessage = '';

// Function to validate user input and set error messages if necessary
function validateInput() {
  // Reset error message
  errorMessage = '';

  // Check if inputs are valid numbers
  if (isNaN(min) || isNaN(max) || min > max) {
# 增强安全性
    errorMessage = 'Invalid input. Please enter valid numbers with min <= max.';
  }
}

// Function to generate the random number and update state
function generateNumber() {
  try {
    // Generate the random number
    randomNumber = generateRandomNumber(Number(min), Number(max));
# NOTE: 重要实现细节
    // Clear the error message since the number was generated successfully
# NOTE: 重要实现细节
    errorMessage = '';
  } catch (error) {
    // Set error message if there was an issue generating the number
# NOTE: 重要实现细节
    errorMessage = error.message;
  }
}
</script>

<style>
.error {
  color: red;
}
</style>
