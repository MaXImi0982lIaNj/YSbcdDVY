// 代码生成时间: 2025-08-15 04:07:55
  import { onMount, writable } from 'svelte/store';
  import Resizer from './Resizer.svelte';

  // Stores
  const images = writable([]);
  const resizedImages = writable([]);
  const dimensions = writable({ width: 100, height: 100 });
  const resizeMode = writable('contain');
  const error = writable(null);

  // Function to handle file input changes
  function handleFileInput(event) {
    const files = event.target.files;
    if (!files) return;

    error.set(null);
    images.set([]);
    Array.from(files).forEach(file => {
      if (!file.type.startsWith('image/')) {
        error.set(`Unsupported file type: ${file.name}`);
        return;
      }

      const reader = new FileReader();
      reader.onload = e => {
        const img = new Image();
        img.onload = () => {
          images.update(imgs => [...imgs, { ...img, file }]);
        };
        img.onerror = () => {
          error.set(`Failed to load image: ${file.name}`);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  // Function to resize images
  async function resizeImages() {
    try {
      error.set(null);
      resizedImages.set([]);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      images.update(imgs => {
        return imgs.map(img => {
          canvas.width = dimensions.$.width;
          canvas.height = dimensions.$.height;

          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Draw the image on the canvas
          let dx = 0, dy = 0;
          let dw = img.width;
          let dh = img.height;

          if (resizeMode.$ === 'contain') {
            // Calculate the scaling factor to contain the image within the new dimensions
            const scale = Math.min(dimensions.$.width / img.width, dimensions.$.height / img.height);
            dx = (dimensions.$.width - img.width * scale) / 2;
            dy = (dimensions.$.height - img.height * scale) / 2;
            dw = img.width * scale;
            dh = img.height * scale;
          } else {
            // Calculate the scaling factor to cover the new dimensions
            const scale = Math.max(dimensions.$.width / img.width, dimensions.$.height / img.height);
            dw = img.width * scale;
            dh = img.height * scale;
          }

          ctx.drawImage(img, dx, dy, dw, dh);

          // Return the resized image as a data URL
          return { ...img, src: canvas.toDataURL('image/png') };
        });
      });
    } catch (err) {
      error.set(`An error occurred: ${err.message}`);
    }
  }
</script>

<input type="file" multiple on:change={handleFileInput} />
{#if $error}
  <p>Error: {$error}</p>
{/if}

{#if $images.length > 0}
  <div>
    {#each $images as img}
      <img src="{img.src}" alt="" />
    {/each}
  </div>
  <label for="width">Width:</label>
  <input type="number" bind:value={dimensions.width} />
  <label for="height">Height:</label>
  <input type="number" bind:value={dimensions.height} />

  <select bind:value={resizeMode}>
    <option value="contain">Contain</option>
    <option value="cover">Cover</option>
  </select>

  <button on:click={resizeImages}>Resize Images</button>

  {#if $resizedImages.length > 0}
    <div>
      {#each $resizedImages as resizedImg}
        <img src="{resizedImg.src}" alt="" />
      {/each}
    </div>
  {/if}
{/if}