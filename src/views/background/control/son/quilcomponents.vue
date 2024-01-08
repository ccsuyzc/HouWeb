<template>
    <v-md-editor v-model="data.text" height="400px" v-show="props.isshow"></v-md-editor>
    <div style="margin-top: 20px; display: flex; justify-content: flex-end">
      <el-button size="large" type="primary" @click="save">保存</el-button>
      <el-button size="large" type="success" @click="cancel">取消</el-button>
    </div>
  </template>
  
  <script setup>
  import { onMounted, reactive,defineProps } from "vue";
  import { GetOneData } from "@/api/quill";
  import router from "@/router"; // 引入router对象
  import { ModifyArticleData } from "@/api/detaliedList"
  
  const emit = defineEmits(['onSubmit'])

  const props = defineProps({
    isshow:Boolean,
    ParentData:String
  })

  const data = reactive({
    text: props.ParentData || "",
    ResponseData:{}
  });
  onMounted(() => {
    getdata();
  });
  
  const getdata = async () => {
    // 从路由得到文章id
    // let id = router.currentRoute.value.params.id;
    // let i = await GetOneData(id);
    // console.log("this9", i);
    // data.ResponseData = i.data
    // data.text = i.data.data
  };
  
  const save = () => {
    emit('onSubmit',data.text)
    // let form = {
    //   "data":data.text
    // }
    // ModifyArticleData(router.currentRoute.value.params.id,JSON.stringify(form)).then(
    //   (i) => {
    //     if (i.code == 200) {
    //       router.back(-1);
    //     }
    //   }
    // );
  };
  
  // 取消按钮,回到上一页
  const cancel = () => {
    router.back(-1);
  };
  </script>
  
  <style>
  </style>