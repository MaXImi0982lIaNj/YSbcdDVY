// 代码生成时间: 2025-09-23 20:14:07
import { writable } from 'svelte/store';

// 定义购物车状态
const cartStore = writable([]);

// 添加商品到购物车
function addToCart(product) {
  cartStore.update(cart => {
    // 检查商品是否已经存在于购物车中
    const exists = cart.some(item => item.id === product.id);
    if (exists) {
      // 如果存在，增加商品数量
      return cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      // 如果不存在，添加新商品并设置初始数量为1
      return [...cart, { ...product, quantity: 1 }];
    }
  });
}

// 从购物车中移除商品
function removeFromCart(productId) {
  cartStore.update(cart => cart.filter(item => item.id !== productId));
}

// 清空购物车
function clearCart() {
  cartStore.set([]);
}

// 获取购物车中的商品总数
function getCartTotal(cart) {
  return cart.reduce((total, item) => total + (item.quantity * item.price), 0);
}

// Svelte 组件
export default function CartComponent() {
  let cart = cartStore;
  // 用于更新商品数量的方法
  function updateQuantity(productId, newQuantity) {
    cartStore.update(cart => {
      return cart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  }

  return {
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity,
    getCartTotal,
    cart
  };
}

// 使用示例
// let myProduct = { id: 1, name: 'Apple', price: 0.99 };
// addToCart(myProduct);
