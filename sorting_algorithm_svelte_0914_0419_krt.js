// 代码生成时间: 2025-09-14 04:19:54
import { onMount } from 'svelte';

// SortingAlgorithm component
export default class SortingAlgorithm extends SvelteComponent {
  // Holds the array to be sorted
  $array = new writable([]);

  // Holds the current state of the array after sorting
  $sortedArray = new writable([]);

  // Holds the index of the current item being sorted
  $currentIndex = new writable(0);

  // Holds the step index for the sorting algorithm
  $stepIndex = new writable(0);

  // Holds an error message if any occurs
  $errorMessage = new writable('');

  // Initializes the component
  onMount(() => {
    this.initializeArray();
  });

  // Initialize the array with random numbers
  initializeArray() {
    try {
      const length = Math.floor(Math.random() * 100) + 1;
      this.$array.update(n => Array.from({ length }, () => Math.floor(Math.random() * 100)));
    } catch (error) {
      this.$errorMessage.set('Error initializing array: ' + error.message);
    }
  }

  // Start the bubble sort algorithm
  startSorting() {
    try {
      this.bubbleSort();
    } catch (error) {
      this.$errorMessage.set('Error during sorting: ' + error.message);
    }
  }

  // Bubble Sort algorithm implementation
  bubbleSort() {
    const array = this.$array;
    const length = array.length;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        this.$stepIndex.set(j);
        this.$currentIndex.set(i);
        // Perform the actual comparison and swap
        if (array[j] > array[j + 1]) {
          const temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
        }
      }
    }
    this.$sortedArray.set([...array]);
  }

  // Render the component UI
  get renderable() {
    return (
      <div>
        <h1>Sorting Algorithm</h1>
        <div className="array-container">
          {this.$array.map((item, index) => (
            <div className="array-item" key={index}>{item}</div>
          ))}
        </div>
        <div className="sorted-array-container">
          {this.$sortedArray.map((item, index) => (
            <div className="sorted-array-item" key={index}>{item}</div>
          ))}
        </div>
        <button on:click={() => this.startSorting()}>Sort</button>
        {#if this.$errorMessage}
          <div className="error-message">{this.$errorMessage}</div>
        {/if}
      </div>
    );
  }
}

// Note: This code assumes you have a Svelte component structure in place and uses Svelte's built-in
// stores for state management. Make sure to include error handling and comments for clarity and maintainability.