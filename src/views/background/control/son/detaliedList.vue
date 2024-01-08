<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="文章名字">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="作者名字">
      <el-input v-model="form.author" style="width: 200px" />
    </el-form-item>
    <el-form-item label="文章内容">
      <el-button @click="isShow">修改</el-button>
    </el-form-item>
    <el-form-item label="是否展示?">
      <el-switch v-model="form.show" />
    </el-form-item>
    <el-form-item label="是否可评论?">
      <el-switch v-model="form.comment" />
    </el-form-item>
    <el-form-item label="备注">
      <el-input v-model="form.desc" type="textarea" />
    </el-form-item>
    <!-- <el-form-item>
      <el-button type="primary" @click="onSubmit">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item> -->
  </el-form>
  <v-md-editor v-model="form.data" height="400px" v-show="show"></v-md-editor>
    <div style="margin-top: 20px; display: flex; justify-content: flex-end">
      <el-button size="large" type="primary" @click="save">保存</el-button>
      <el-button size="large" type="success" @click="cancel">取消</el-button>
    </div>
  <!-- <quilcomponents :isshow="show" :ParentData="form.data" @onSubmit="onSubmit"></quilcomponents> -->
</template>

<script setup>
// import quilcomponents from "./quilcomponents.vue"
import router from "@/router";
import { reactive,onMounted,ref } from "vue";
import { DatabaseData } from "@/stores/counter";
import {GetOneData} from "@/api/text"
import { ModifyArticleData } from "@/api/detaliedList"

// 后台数据仓库
const DatabaseArticle = DatabaseData();
const show = ref(false)
const form = reactive({
  name: "", //文章名
  author: "言志志", // 作者名
  show: true, // 是否展示
  comment: true, // 是否可以评论
  desc: "", // 备注
  data:""  // 文章的具体内容
});

onMounted(() => {
  // 发条请求得到基本数据，然后进行渲染
   GetOneData(router.currentRoute.value.params.id).then(
    (i)=>{
         console.log("dfsdf",i);
         form.name = i.data.name
         form.author = i.data.author
         form.show = i.data.show
         form.comment = i.data.comment
         form.desc = i.data.desc
         form.data = i.data.data
    }
   )
});


const save = () => {
  ModifyArticleData(router.currentRoute.value.params.id,JSON.stringify(form)).then(
    (i) => {
      if (i.code == 200) {
        router.back(-1);
      }
    }
  );
};


const isShow = ()=>{
      show.value = true
}
// const pushToQuill = () => {
//   //  从路由得到id
//   let id = router.currentRoute.value.params.id;
//   // 跳转界面
//   router.push({
//     name: "Quill",
//     params: {
//       id: id,
//     },
//   });
// };

const cancel = () => {
  router.back(-1);
};
</script>

<style scoped>
</style>