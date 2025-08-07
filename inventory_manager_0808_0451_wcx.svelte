// 代码生成时间: 2025-08-08 04:51:13
  // 库存数据数组
  let inventory = [];

  // 初始库存数据
  function initializeInventory() {
    inventory = [
      { id: 1, name: 'Product A', quantity: 10 },
      { id: 2, name: 'Product B', quantity: 20 },
      { id: 3, name: 'Product C', quantity: 15 }
    ];
  }

  // 添加库存商品
  function addProduct(product) {
    if (!product.name || !product.quantity) {
      throw new Error('Product name and quantity are required');
    }
    inventory.push(product);
  }

  // 更新库存商品
  function updateProduct(productId, quantity) {
    const product = inventory.find(p => p.id === productId);
    if (!product) {
      throw new Error('Product not found');
    }
    product.quantity = quantity;
  }

  // 删除库存商品
  function deleteProduct(productId) {
    inventory = inventory.filter(p => p.id !== productId);
  }

  // 获取库存商品
  function getProducts() {
    return inventory;
  }

  // 组件初始化时执行
  $: {
    initializeInventory();
  }
</script>

<!-- UI部分 -->
<div>
  <!-- 商品列表 -->
  <h2>Inventory List</h2>
  <ul>
    {#each inventory as product}
      <li>{product.name} - {product.quantity}</li>
    {/each}
  </ul>

  <!-- 添加商品表单 -->
  <h3>Add Product</h3>
  <form on:submit|preventDefault={(event) => addProduct({ id: inventory.length + 1, name: event.target.name.value, quantity: parseInt(event.target.quantity.value) })}>
    <input type="text" name="name" placeholder="Product Name" />
    <input type="number" name="quantity" placeholder="Quantity" />
    <button type="submit">Add Product</button>
  </form>

  <!-- 更新商品表单 -->
  <h3>Update Product</h3>
  <form on:submit|preventDefault={(event) => updateProduct(parseInt(event.target.productId.value), parseInt(event.target.quantity.value))}>
    <input type="number" name="productId" placeholder="Product ID" />
    <input type="number" name="quantity" placeholder="New Quantity" />
    <button type="submit">Update Product</button>
  </form>

  <!-- 删除商品按钮 -->
  <h3>Delete Product</h3>
  <button on:click={() => deleteProduct(parseInt(event.target.productId.value))}>
    <input type="number" name="productId" placeholder="Product ID" />
    Delete Product
  </button>
</div>
