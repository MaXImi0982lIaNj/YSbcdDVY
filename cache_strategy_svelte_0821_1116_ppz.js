// 代码生成时间: 2025-08-21 11:16:30
import { writable } from 'svelte/store';

// 创建一个缓存策略的store，用于存储和检索缓存数据
const cacheStore = writable({});

// 缓存策略函数
export const cacheStrategy = {
  // 将数据添加到缓存
  add: (key, value) => {
    try {
      const currentCache = cacheStore.get();
      currentCache[key] = value;
      cacheStore.set(currentCache);
    } catch (error) {
      console.error('Failed to add data to cache:', error);
    }
  },

  // 从缓存中获取数据
  get: (key) => {
    try {
      const currentCache = cacheStore.get();
      return currentCache[key] || null;
    } catch (error) {
      console.error('Failed to get data from cache:', error);
      return null;
    }
  },

  // 从缓存中移除数据
  remove: (key) => {
    try {
      const currentCache = cacheStore.get();
      delete currentCache[key];
      cacheStore.set(currentCache);
    } catch (error) {
      console.error('Failed to remove data from cache:', error);
    }
  },

  // 清除缓存
  clear: () => {
    cacheStore.set({});
  }
};

// 使用示例
// cacheStrategy.add('user', { name: 'John Doe' });
// const userData = cacheStrategy.get('user');
// console.log(userData);
// cacheStrategy.remove('user');
// cacheStrategy.clear();