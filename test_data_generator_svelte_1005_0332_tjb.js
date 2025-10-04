// 代码生成时间: 2025-10-05 03:32:22
import { writable } from 'svelte/store';
import faker from '@faker-js/faker';

// 创建一个可写store来存储生成的测试数据
const testData = writable([]);

// 生成随机测试数据的函数
function generateTestData(count) {
  // 检查count是否为正整数
  if (typeof count !== 'number' || count < 1 || !Number.isInteger(count)) {
    throw new Error('Invalid count: count must be a positive integer.');
  }

  // 生成测试数据
  const data = Array.from({ length: count }, () => ({
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    address: faker.address.streetAddress(),
    // 添加更多字段以模拟更复杂的数据结构
  }));

  // 更新store中的数据
  testData.set(data);
}

// 导出store和生成函数，以便在Svelte组件中使用
export { testData, generateTestData };

// Svelte组件示例
// <script>
//   import { testData } from './test_data_generator_svelte.js';
//   import { onMount } from 'svelte';

//   onMount(async () => {
//     try {
//       await generateTestData(10);
//     } catch (error) {
//       console.error('Error generating test data:', error);
//     }
//   });
// </script>

// <pre>{JSON.stringify($testData, null, 2)}</pre>