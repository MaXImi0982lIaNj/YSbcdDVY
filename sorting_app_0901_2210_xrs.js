// 代码生成时间: 2025-09-01 22:10:36
// sorting_app.js
// This is a Svelte application that demonstrates sorting algorithms

import { onMount } from 'svelte';
import { writable } from 'svelte/store';
# 增强安全性

// A writable store to hold the array and its sorted version
const { subscribe, set } = writable([5, 3, 8, 4, 2, 9, 1, 6, 7]);

// Various sorting algorithms
function bubbleSort(arr) {
# 增强安全性
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
# NOTE: 重要实现细节
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}
# NOTE: 重要实现细节

function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let current = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = current;
  }
  return arr;
}

function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    let temp = arr[minIndex];
# NOTE: 重要实现细节
    arr[minIndex] = arr[i];
    arr[i] = temp;
  }
  return arr;
}

// Function to trigger the sorting and update the store
function sortArray(sortFunc) {
  if (!sortFunc) {
    console.error('No sorting function provided.');
# FIXME: 处理边界情况
    return;
  }
  try {
    const sortedArray = sortFunc(subscribe().slice()); // Clone the array to avoid mutations
    set(sortedArray);
# 改进用户体验
  } catch (error) {
# TODO: 优化性能
    console.error('An error occurred during sorting:', error);
  }
}

// Svelte component
export default function() {
# 增强安全性
  onMount(() => {
    // Initially sort the array using bubble sort
    sortArray(bubbleSort);
  });

  return {
    sortArray,
    subscribe // Expose the subscribe function for accessing the array
  };
}

// Svelte markup (svelte file)
export const markup = `
<!-- SortingApp.svelte -->
<script>
  import SortingApp from './sorting_app.js';
  let array = [5, 3, 8, 4, 2, 9, 1, 6, 7];
</script>

<main>
  <h1>Sorting Algorithm Demonstration</h1>
  <p>The current array is: {$array.join(', ')}</p>
  <button on:click={() => $sortArray(bubbleSort)}>Sort using Bubble Sort</button>
# NOTE: 重要实现细节
  <button on:click={() => $sortArray(insertionSort)}>Sort using Insertion Sort</button>
  <button on:click={() => $sortArray(selectionSort)}>Sort using Selection Sort</button>
</main>
# NOTE: 重要实现细节
`;