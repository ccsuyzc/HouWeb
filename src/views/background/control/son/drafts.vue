<template>
    <div>
      <input type="file" @change="handleFileChange" />
      <button @click="uploadImage">上传图片</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { uploadImage } from '@/api/image'; // 替换为实际的图片上传 API
  
  const selectedImage = ref(null);
  
  const handleFileChange = (event) => {
    selectedImage.value = event.target.files[0];
  };
  
  const uploadImage = async () => {
    if (selectedImage.value) {
      try {
        const formData = new FormData();
        formData.append('image', selectedImage.value);
  
        const response = await uploadImage(formData);
        // 处理上传成功的逻辑，例如保存图片链接或其他信息
        console.log('Image uploaded:', response.data.url);
      } catch (error) {
        // 处理上传失败的逻辑
        console.error('Image upload failed:', error);
      }
    }
  };
  </script>