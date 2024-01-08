<template>
  <!-- 表单 -->
  <el-form :inline="true" :model="form" class="demo-form-inline">
    <el-form-item label="文章名">
      <el-input v-model="form.ArticleName" clearable />
    </el-form-item>
    <el-form-item label="作者名">
      <el-input v-model="form.Author" placeholder="言志志" clearable />
    </el-form-item>
    <el-form-item label="备注">
      <el-input v-model="form.desc" clearable />
    </el-form-item>
  </el-form>
  <!-- 富文本输入框 -->
  <v-md-editor
    v-model="text"
    height="450px"
    :disabled-menus="[]"
    @upload-image="handleUploadImage"
  ></v-md-editor>
  <div class="btn">
    <el-button type="primary" class="elbtn" size="large">保存为草稿</el-button>
    <el-button
      type="primary"
      class="elbtn"
      size="large"
      @click="DirectPublishing"
      >直接发布</el-button
    >
  </div>
</template>
 
 <script setup>
import { getCount, AddArticle, uploadImg } from "@/api/add";
import { v4 as uuidv4 } from "uuid";
import { ref, reactive } from "vue";
import dayjs from "dayjs";

const handleUploadImage = async (event, insertImage, files) => {
  // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
  for (const file of files) {
  const formData = new FormData();
  formData.append("image", file);
  try {
    const response = await uploadImg(formData);
    // 假设你的后端在"url"属性中返回图像URL
    const imageUrl = response.url;
    insertImage({
      url: "http://localhost:9090/foreground/images/"+imageUrl,
      desc: "图像描述",
    });
  } catch (error) {
    console.error("上传图像时发生错误:", error);
  }}

  // 此处只做示例
  // insertImage({
  //   url: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1269952892,3525182336&fm=26&gp=0.jpg",
  //   desc: "七龙珠",
  //   // width: 'auto',
  //   // height: 'auto',
  // });
};

const text = ref("");
const form = reactive({
  ArticleName: "请填写", // 文章名
  Author: "言志志", // 作者名
  desc: "", // 备注
});

// 直接发布
const DirectPublishing = () => {
  let count = rconut();
  console.log("this is count", count);
  let data = {
    aid: Number(count) + 1,
    uid: String(uuidv4()),
    name: form.ArticleName,
    author: form.Author,
    data: text.value,
    time: Number(dayjs()),
    show: true, // 标志是否展示
    isDelete: false, // 标志是否删除
    isDraft: false, // 标志是否是草稿
    comment: true, // 标志是否开启评论功能
  };

  let i = add(data);
  if (i.code == 200) {
    text.value = "";
    form.ArticleName = "请填写";
    form.Author = "言志志";
    form.desc = "";
  }
  console.log("is this", i);
};

const add = async (data) => {
  let i = await AddArticle(JSON.stringify(data));
  return i;
};

// 计算数量
const rconut = () => {
  let i = 0;
  getCount()
    .then((data) => {
      if (data.code == 200) {
        i = data.data.count;
      }
    })
    .catch();
  return i;
};
</script>
 
 <style scoped lang="less">
.btn {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  .elbtn {
    margin-left: 20px;
  }
}
.demo-form-inline .el-input {
  --el-input-width: 220px;
}
</style>