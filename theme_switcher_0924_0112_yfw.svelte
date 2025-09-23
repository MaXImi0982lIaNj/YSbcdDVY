// 代码生成时间: 2025-09-24 01:12:23
// 引入Svelte store来管理主题状态
import { writable } from 'svelte/store';

// 创建一个writable store来存储当前的主题
const theme = writable('light'); // 默认主题为'light'

// 切换主题的函数
function toggleTheme() {
  try {
    // 获取当前主题
    const currentTheme = theme();

    // 切换到下一个主题
    theme(currentTheme === 'light' ? 'dark' : 'light');
  } catch (error) {
    // 错误处理
    console.error('Failed to toggle theme:', error);
  }
}
</script>

<!-- 页面内容 -->
<main>
  <!-- 主题切换按钮 -->
  <button on:click='{toggleTheme}'>Toggle Theme</button>

  <!-- 显示当前主题 -->
  <p>Current theme: {$theme}</p>

  <!-- 根据主题改变样式 -->
  <style>
    body:global(.dark) {
      background-color: #333;
      color: #fff;
    }

    body:global(.light) {
      background-color: #fff;
      color: #333;
    }
  </style>
</main>
