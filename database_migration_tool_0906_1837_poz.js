// 代码生成时间: 2025-09-06 18:37:16
import { onMount } from 'svelte';
import { writable } from 'svelte/store';
import axios from 'axios';

// 创建一个store来存储迁移状态
const migrationStatus = writable(null);

// 定义数据库迁移函数
async function migrateDatabase() {
  try {
    // 设置迁移状态为进行中
    migrationStatus.set('正在迁移...');

    // 使用axios发送请求到后端进行数据库迁移
    const response = await axios.post('/api/migrate');

    // 设置迁移状态为成功
    migrationStatus.set('迁移成功');
  } catch (error) {
    // 出现错误时设置迁移状态为失败
    migrationStatus.set('迁移失败');
    console.error('数据库迁移失败:', error);
  }
}

// Svelte组件
export default function DatabaseMigrationTool() {
  onMount(() => {
    // 组件挂载时执行数据库迁移
    migrateDatabase();
  });

  return {
    // 将迁移状态暴露给组件模板
    migrationStatus
  };
}

// Svelte组件模板
// <script>
//   import DatabaseMigrationTool from './database_migration_tool';
// </script>

// <div>
//   {#if $migrationStatus === '正在迁移...'}
//     <p>数据库迁移进行中...</p>
//   {:else if $migrationStatus === '迁移成功'}
//     <p>数据库迁移成功！</p>
//   {:else if $migrationStatus === '迁移失败'}
//     <p>数据库迁移失败，请检查日志。</p>
//   {/if}
// </div>
