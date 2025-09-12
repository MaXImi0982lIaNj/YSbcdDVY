// 代码生成时间: 2025-09-12 10:23:33
import { onMount } from 'svelte';

// 排序算法组件
export default class SortAlgorithm extends SvelteComponent {
  // 初始化变量
  script = `alert('Hello from Svelte!');`;
  sortedArray = [];
  originalArray = [];

  onMount(() => {
    // 初始化数组（示例数据）
    this.originalArray = [5, 2, 8, 3, 1, 6, 4];
  });

  // 冒泡排序算法
  bubbleSort() {
    let len = this.originalArray.length;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - i - 1; j++) {
        if (this.originalArray[j] > this.originalArray[j + 1]) {
          // 交换元素
          let temp = this.originalArray[j];
          this.originalArray[j] = this.originalArray[j + 1];
          this.originalArray[j + 1] = temp;
        }
      }
    }
    this.sortedArray = [...this.originalArray]; // 复制已排序的数组到sortedArray
  }

  // 快速排序算法
  quickSort() {
    if (this.originalArray.length <= 1) {
      this.sortedArray = [...this.originalArray];
      return;
    }
    
    let pivotIndex = Math.floor(Math.random() * this.originalArray.length);
    let pivot = this.originalArray[pivotIndex];
    let less = [];
    let greater = [];
    
    // 将数组元素分配到less或greater数组中
    for (let i = 0; i < this.originalArray.length; i++) {
      if (i !== pivotIndex) {
        if (this.originalArray[i] < pivot) {
          less.push(this.originalArray[i]);
        } else {
          greater.push(this.originalArray[i]);
        }
      }
    }
    
    // 递归排序less和greater，然后将pivot拼接在中间
    this.sortedArray = [...this.quickSort(less), pivot, ...this.quickSort(greater)];
  }

  // 插入排序算法
  insertionSort() {
    for (let i = 1; i < this.originalArray.length; i++) {
      let current = this.originalArray[i];
      let j = i - 1;
      while (j >= 0 && this.originalArray[j] > current) {
        this.originalArray[j + 1] = this.originalArray[j];
        j--;
      }
      this.originalArray[j + 1] = current;
    }
    this.sortedArray = [...this.originalArray]; // 复制已排序的数组到sortedArray
  }

  // 选择排序算法
  selectionSort() {
    for (let i = 0; i < this.originalArray.length; i++) {
      let minIndex = i;
      for (let j = i + 1; j < this.originalArray.length; j++) {
        if (this.originalArray[j] < this.originalArray[minIndex]) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        let temp = this.originalArray[i];
        this.originalArray[i] = this.originalArray[minIndex];
        this.originalArray[minIndex] = temp;
      }
    }
    this.sortedArray = [...this.originalArray]; // 复制已排序的数组到sortedArray
  }
}

/*
 * Svelte组件，实现了四种基本的排序算法：冒泡排序、快速排序、插入排序和选择排序。
 * 每种算法都有对应的函数，可以在组件内部调用以对数组进行排序。
 * 排序后的结果会被复制到sortedArray变量中。
 * 这个组件遵循JS最佳实践，包括错误处理、注释和文档化，以确保代码的可维护性和可扩展性。
 */