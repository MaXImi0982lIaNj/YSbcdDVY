// 代码生成时间: 2025-09-15 12:11:02
  // Svelte component code
  import { onMount } from 'svelte';
  import CryptoJS from 'crypto-js';
  
  export default class {
    hashValue = '';
    error = '';
    message = '';
    hashType = 'SHA-256'; // Default hash type
    inputText = '';
    
    onMount(() => {
      this.updateHash();
    });
    
    // Method to update hash value
    updateHash() {
      try {
        const hash = CryptoJS[this.hashType](this.inputText).toString();
        this.hashValue = hash;
        this.error = '';
        this.message = `Hash generated successfully!`;
      } catch (error) {
        this.hashValue = '';
        this.error = `Error generating hash: ${error.message}`;
        this.message = '';
      }
    }
    
    // Method to change hash type
    changeHashType(event) {
      this.hashType = event.target.value;
      this.updateHash();
    }
    
    // Method to handle input text change
    onInputChange(event) {
      this.inputText = event.target.value;
      this.updateHash();
    }
  }
</script>

<!-- Svelte markup -->
<main>
  <h1>Hash Calculator Tool</h1>
  <div class="input-group">
    <label for="inputText">Input Text:</label>
    <input type="text" id="inputText" value="{this.inputText}" on:input="onInputChange" />
  </div>
  <div class="select-group">
    <label for="hashType">Hash Type:</label>
    <select id="hashType" value="{this.hashType}" on:change="changeHashType">
      <option value="SHA-256">SHA-256</option>
      <option value="SHA-512">SHA-512</option>
      <option value="MD5">MD5</option>
    </select>
  </div>
  <div class="hash-output">
    <label for="hashValue">Hash Value:</label>
    <input type="text" id="hashValue" value="{this.hashValue}" readonly />
  </div>
  {#if this.error}
    <div class="error-message">
      Error: {this.error}
    </div>
  {/if}
  {#if this.message}
    <div class="message">
      {this.message}
    </div>
  {/if}
</main>
</body>
</html>