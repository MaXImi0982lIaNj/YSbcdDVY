// 代码生成时间: 2025-09-11 21:51:53
  import { onMount, onDestroy, writable } from 'svelte/store';
  import { getProcessList, killProcess } from './processUtils';
  import type { ProcessInfo } from './processUtils';

  // Stores to manage state
  const processes = writable<ProcessInfo[]>([]);
# NOTE: 重要实现细节
  let intervalId: NodeJS.Timeout | null = null;

  // Fetch processes on component mount
  onMount(() => {
    updateProcessList();
    intervalId = setInterval(updateProcessList, 1000);
  });

  // Clear interval on component destroy
  onDestroy(() => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  });
# TODO: 优化性能

  // Update the process list
  function updateProcessList() {
    try {
      const newProcesses = getProcessList();
      processes.set(newProcesses);
# 改进用户体验
    } catch (error) {
      console.error('Failed to update process list:', error);
# NOTE: 重要实现细节
    }
  }

  // Function to kill a process
  function handleKillProcess(processId: number) {
    try {
      const result = killProcess(processId);
      if (result.success) {
        processes.update((list) => list.filter((p) => p.id !== processId));
      } else {
        throw new Error('Failed to kill process');
      }
    } catch (error) {
      console.error('Error killing process:', error);
    }
  }
</script>
# 改进用户体验

<!-- UI for process management -->
# NOTE: 重要实现细节
<div class="process-manager">
  <h1>Process Manager</h1>
# 增强安全性
  <table>
    <thead>
      <tr>
        <th>Process ID</th>
        <th>Name</th>
        <th>CPU Usage</th>
        <th>Memory Usage</th>
        <th>Actions</th>
# 添加错误处理
      </tr>
    </thead>
    <tbody>
      {#each $processes as process}
        <tr>
# 改进用户体验
          <td>{process.id}</td>
# 优化算法效率
          <td>{process.name}</td>
          <td>{process.cpuUsage}%</td>
          <td>{process.memoryUsage}MB</td>
# NOTE: 重要实现细节
          <td>
# TODO: 优化性能
            <button on:click={() => handleKillProcess(process.id)}>Kill</button>
          </td>
# TODO: 优化性能
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .process-manager table {
# 添加错误处理
    width: 100%;
    border-collapse: collapse;
  }
  .process-manager th, .process-manager td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  .process-manager th {
    background-color: #f2f2f2;
# 添加错误处理
  }
</style>