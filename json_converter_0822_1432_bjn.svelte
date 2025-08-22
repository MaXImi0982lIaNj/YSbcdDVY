// 代码生成时间: 2025-08-22 14:32:24
  // 定义组件的初始状态
  let jsonData = '';
  let convertedData = '';
  let error = null;

  // 处理JSON数据转换的函数
  function convertJson(data) {
    try {
      // 尝试解析输入的JSON数据
      const parsedData = JSON.parse(data);
      // 将解析后的对象转换为JSON字符串
      convertedData = JSON.stringify(parsedData, null, 2);
      error = null;
    } catch (e) {
      // 如果解析失败，设置错误消息
      error = e.message;
      convertedData = '';
    }
  }
</script>

<!-- UI部分 -->
<main>
  <h1>JSON Data Converter</h1>
  <label for="json-input">Enter JSON data:</label>
  <textarea id="json-input" bind:value="jsonData"></textarea>
  <button on:click="() => convertJson(jsonData)">Convert</button>
  {#if error}
    <div class="error">Error: {error}</div>
  {/if}
  {#if convertedData}
    <label for="converted-json">Converted JSON:</label>
    <textarea id="converted-json" readonly value={convertedData}></textarea>
  {/if}
</main>

<style>
  .error {
    color: red;
  }
</style>
