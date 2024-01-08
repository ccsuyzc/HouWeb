<template>
    <div>
      <input type="file" @change="handleFileChange" />
      <button @click="uploadImage">上传图片</button>
    </div>
</template>
  
  <script setup>
  import axios from 'axios';
  import { ref } from 'vue';
  
  const selectedImage = ref(null);
  
  const handleFileChange = (event) => {
    selectedImage.value = event.target.files[0];
  };
  
  const uploadImage = async () => {
    if (selectedImage.value) {
      try {
        const formData = new FormData();
        formData.append('image', selectedImage.value);
  
        const response = await axios.post('http://localhost:9090/foreground/upload-image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        // 触发上传成功的事件，将图片链接传递给父组件
        $emit('image-uploaded', response.data.url);
      } catch (error) {
        // 处理上传失败的逻辑
        console.error('Image upload failed:', error);
      }
    }
  };
  </script>