// 代码生成时间: 2025-09-15 07:24:27
  import { onMount, writable } from 'svelte/store';
\

\
  // JSON数据转换器组件状态
\
  const jsonInput = writable('');
\
  const formattedJson = writable('');
\
  const error = writable(null);
\

\
  // 格式化JSON数据
\
  function formatJson(inputJson) {
\
    try {
\
      const parsedJson = JSON.parse(inputJson);
\
      return JSON.stringify(parsedJson, null, 2);
\
    } catch (e) {
\
      error.set(e.message);
\
      return '';
\
    }
\
  }
\

\
  // 监听JSON输入变化，并格式化
\
  onMount(() => {
\
    jsonInput.subscribe((input) => {
\
      const formatted = formatJson(input);
\
      formattedJson.set(formatted);
\
    });
\
  });
\
</script>
\

\
<!-- 组件模板 -->
\
<div class="json-formatter">
\
  <h2>JSON Data Formatter</h2>
\
  <textarea
\
    class="json-input"
\
    placeholder="Enter JSON..."
\
    value="{jsonInput}"
\
    on:input="jsonInput = event.target.value"
\
  ></textarea>
\

\
  {#if $error}
\
    <p class="error-message">Error: {$error}</p>
\
  {/if}
\

\
  <button on:click={() => formattedJson.set(formatJson($jsonInput))}
\
    >Format JSON</button
\
  >
\

\
  {#if $formattedJson && !$error}
\
    <pre class="formatted-json">{$formattedJson}</pre>
\
  {/if}
\
</div>
\

\
<style scoped>
\
  .json-formatter textarea {
\
    width: 100%;
\
    height: 150px;
\
    margin-bottom: 10px;
\
  }
\

\
  .json-formatter .error-message {
\
    color: red;
\
  }
\

\
  .json-formatter .formatted-json {
\
    background-color: #f4f4f4;
\
    border: 1px solid #ddd;
\
    padding: 10px;
\
    overflow: auto;
\
  }
\
</style>
