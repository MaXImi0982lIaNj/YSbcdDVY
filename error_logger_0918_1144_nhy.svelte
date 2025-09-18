// 代码生成时间: 2025-09-18 11:44:30
  // ErrorLogger component for collecting error logs
  // 负责收集错误日志的组件
  import { writable } from 'svelte/store';

  const errors = writable([]);
  // 可写状态，用于存储错误日志

  function logError(error) {
    // 添加错误日志到状态
    errors.update(list => {
      list.push(error);
      return [...list];
    });
  }

  function clearErrors() {
    // 清空所有错误日志
    errors.set([]);
  }
</script>

<!-- ErrorLogger.svelte -->
<!-- 错误日志收集器组件 -->
<div>
  <button on:click={clearErrors}>Clear Errors</button>
  <!-- 点击按钮清空错误日志 -->
  <ul>
    {#each $errors as error (error.id)}
      <!-- 遍历错误日志并显示 -->
      <li>{error.message}</li>
    {/each}
  </ul>
</div>

<script context="module">
  // 错误边界，用于捕获组件内部的错误
  // 错误边界，用于捕获组件内部的错误
  export function onError(error, event) {
    logError({
      id: Date.now(),
      message: error.message,
      stack: error.stack,
      location: event.target.tagName,
    });
  }
</script>