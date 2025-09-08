// 代码生成时间: 2025-09-09 07:59:08
  import { onMount } from 'svelte';
  import Resizer from './Resizer.js'; // Assuming Resizer.js contains the image resizing logic

  // State to hold images for resizing
  export let images = [];
  let resizedImages = [];

  // Function to handle image upload
  function handleImageUpload(event) {
    const files = event.target.files;
    if (files) {
      const imagesArray = Array.from(files);
      imagesArray.forEach(file => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            images.push({
              src: e.target.result,
              width: 0,
              height: 0,
              resizeFactor: 0.5 // Default resize factor
            });
          };
          reader.readAsDataURL(file);
        } else {
          console.error('Uploaded file is not an image.');
        }
      });
    }
  }

  // Function to resize images
  function resizeImages() {
    resizedImages = images.map(image => Resizer.resizeImage(image.src, image.resizeFactor));
  }

  // Function to download resized images
  function downloadResizedImages() {
    resizedImages.forEach((resizedImage, index) => {
      const link = document.createElement('a');
      link.download = `resized_image_${index}.png`;
      link.href = resizedImage.src;
      link.click();
    });
  }

  // On mount, set up the UI
  onMount(() => {
    // Initialization code if needed
  });
</script>

<!-- UI for the image resizer app -->
<div class="image-resizer-app">
  <h1>Image Resizer App</h1>
  <input type="file" multiple accept="image/*" on:change={handleImageUpload} />
  <div class="resized-images-container">
    {#each resizedImages as resizedImage}
      <img src="{resizedImage.src}" alt="Resized Image" />
    {/each}
  </div>
  <button on:click={resizeImages}>Resize Images</button>
  <button on:click={downloadResizedImages}>Download Resized Images</button>
</div>

<style>
  .image-resizer-app {
    text-align: center;
  }
  .resized-images-container img {
    margin: 10px;
    max-width: 200px;
  }
</style>