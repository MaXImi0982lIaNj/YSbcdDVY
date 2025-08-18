// 代码生成时间: 2025-08-19 03:39:14
import { writable } from 'svelte/store';

// Define a store to hold validation state
const validationState = writable({
# FIXME: 处理边界情况
  emailValid: true,
  messageValid: true
});

// Function to validate the form data
function validateFormData(data) {
  // Reset validation state
  validationState.update((state) => ({
# NOTE: 重要实现细节
    ...state,
    emailValid: true,
    messageValid: true
  }));

  try {
    // Check if email is not empty and valid
    if (!data.email.trim()) {
      throw new Error('Email is required.');
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) {
      throw new Error('Invalid email address.');
# 添加错误处理
    }

    // Check if message is not empty
    if (!data.message.trim()) {
      throw new Error('Message is required.');
    }
# 增强安全性

    // If no errors, return true
    return true;
  } catch (error) {
    // Update validation state and throw error
    validationState.update((state) => ({
      ...state,
# TODO: 优化性能
      emailValid: error.message.includes('Email'),
      messageValid: error.message.includes('Message')
    }));
    throw error;
  }
}

// Export the validation state and function
export { validationState, validateFormData };