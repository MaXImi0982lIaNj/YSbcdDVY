// 代码生成时间: 2025-09-02 14:31:13
  import Papa from 'papaparse';
  import { onMount, writable } from 'svelte/store';
  
  const options = writable({});
  let file, result;
  
  onMount(() => {
    options.set({});
  });
  
  function handleFileChange(event) {
    file = event.target.files[0];
  }
  
  async function cleanData() {
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const csvData = e.target.result;
        const { data, errors } = await Papa.parse(csvData, {
          header: true,
          dynamicTyping: true
        });
        
        if (errors.length > 0) {
          throw new Error('Failed to parse CSV');
        }
        
        const cleanedData = cleanDataset(data, $options);
        result = Papa.unparse(cleanedData);
      } catch (error) {
        console.error('Error:', error.message);
        result = 'Error: ' + error.message;
      }
    };
    reader.readAsText(file);
  }
  
  function cleanDataset(data, options) {
    const cleanedData = data.map(row => {
      const newRow = {};
      for (const key in row) {
        const value = row[key];
        if (options.trim) newRow[key] = value.trim();
        if (options.removeEmptyRows && value === '') continue;
        if (options.convertCase) newRow[key] = value.toLowerCase();
        else newRow[key] = value;
      }
      return newRow;
    }).filter(row => Object.values(row).some(val => val !== ''));
    return cleanedData;
  }
</script>

<style>
  .container {
    max-width: 600px;
    margin: auto;
    padding: 20px;
  }
  .options {
    margin-bottom: 20px;
  }
  .result {
    background-color: #f4f4f4;
    padding: 10px;
    border-radius: 5px;
    white-space: pre-wrap;
  }
</style>

