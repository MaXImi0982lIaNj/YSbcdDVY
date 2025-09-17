// 代码生成时间: 2025-09-17 19:32:38
  // 引入svelte store来管理状态
  import { writable } from 'svelte/store';

  // 创建库存状态store
  const inventory = writable([]);

  // 添加商品到库存
  function addProduct(product) {
    try {
      const currentInventory = inventory.read();
      inventory.set([...currentInventory, product]);
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  }

  // 删除商品从库存
  function removeProduct(productId) {
    try {
      const currentInventory = inventory.read();
      inventory.set(currentInventory.filter(product => product.id !== productId));
    } catch (error) {
      console.error('Failed to remove product:', error);
    }
  }

  // 更新库存中的商品数量
  function updateProductQuantity(productId, quantity) {
    try {
      const currentInventory = inventory.read();
      const updatedInventory = currentInventory.map(product => {
        if (product.id === productId) {
          return { ...product, quantity };
        }
        return product;
      });
      inventory.set(updatedInventory);
    } catch (error) {
      console.error('Failed to update product quantity:', error);
    }
  }

  // 获取库存总量
  function getTotalQuantity() {
    try {
      const currentInventory = inventory.read();
      return currentInventory.reduce((total, product) => total + product.quantity, 0);
    } catch (error) {
      console.error('Failed to get total quantity:', error);
      return 0;
    }
  }

  // 外部组件可以通过导出的函数与库存交互
  export { inventory, addProduct, removeProduct, updateProductQuantity, getTotalQuantity };
</script>

<!-- 组件的UI部分 -->
<div>
  <h1>Inventory Manager</h1>
  <button on:click={() => addProduct({id: 1, name: 'Product 1', quantity: 10})}>Add Product 1</button>
  <button on:click={() => removeProduct(1)}>Remove Product 1</button>
  <button on:click={() => updateProductQuantity(1, 5)}>Update Product 1 Quantity</button>
  <p>Total Quantity: {getTotalQuantity()}</p>
  <!-- 显示库存列表 -->
  <ul>
    {#each inventory as product (product.id)}
    <li>
      Product ID: {product.id}, Name: {product.name}, Quantity: {product.quantity}
    </li>
    {/each}
  </ul>
</div>