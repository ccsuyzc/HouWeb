<template>
<el-button type="primary" style="width:150px;height: 50px;font-size: 17px; margin-top: 20px;margin-left: 88%;" @click="showaddfrom">新增商品</el-button>

  <el-dialog v-model="dialogFormVisible" title="添加商品信息">
    <el-form :model="form">
      <el-form-item label="商品名" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="商品价格" :label-width="formLabelWidth">
        <el-input-number
          v-model="form.price"
          :precision="2"
          :step="0.1"
          :min="0"
        />
      </el-form-item>
      <el-form-item label="库存" :label-width="formLabelWidth">
        <el-input-number v-model="form.stock" :step="1" :min="0" />
      </el-form-item>
      <el-form-item label="是否推荐上首页？" :label-width="formLabelWidth">
        <el-switch v-model="form.home_page_on_recommend" />
      </el-form-item>
      <el-form-item label="是否上架？" :label-width="formLabelWidth">
        <el-switch
          v-model="form.status"
          class="ml-2"
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
        />
      </el-form-item>
      <el-form-item label="商品种类" :label-width="formLabelWidth">
        <el-select
          v-model="form.category_id"
          :placeholder="form.category_id"
          @click="getcategories"
        >
          <el-option
            v-for="item in form.categoryArray"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="商品描述">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item label="修改图片">
        <div class="avatar-uploader avatar1">
          <el-image
            v-if="form.image1"
            :src="'http://localhost:9090/api/images/' + form.image1"
            class="avatar avatar1"
          />
          <el-icon
            v-else
            class="avatar-uploader-icon"
            @click="openFilePicker(1)"
            ><Plus
          /></el-icon>
          <input
            type="file"
            ref="fileInput1"
            @change="uploadImage(1)"
            style="display: none"
          />
          <el-button class="deletebtn1" v-show="form.image1" type="danger" style="width: 100%;" @click="deleteImage(1)">删除</el-button>
        </div>
        <div class="avatar-uploader avatar2">
          <el-image
            v-if="form.image2"
            :src="'http://localhost:9090/api/images/' + form.image2"
            class="avatar"
          />
          <el-icon
            v-else
            class="avatar-uploader-icon"
            @click="openFilePicker(2)"
            ><Plus
          /></el-icon>
          <input
            type="file"
            ref="fileInput2"
            @change="uploadImage(2)"
            style="display: none"
          />
          <el-button class="deletebtn2" v-show="form.image2" type="danger" style="width: 100%;" @click="deleteImage(2)">删除</el-button>


        </div>
        <div class="avatar-uploader avatar3">
          <el-image
            v-if="form.image3"
            :src="'http://localhost:9090/api/images/' + form.image3"
            class="avatar avatar3"
          />
          <el-icon
            v-else
            class="avatar-uploader-icon"
            @click="openFilePicker(3)"
            ><Plus
          /></el-icon>
          <input
            type="file"
            ref="fileInput3"
            @change="uploadImage(3)"
            style="display: none"
          />
          <el-button class="deletebtn3" v-show="form.image3" type="danger" style="width: 100%;" @click="deleteImage(3)">删除</el-button>
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="Cancel">取消</el-button>
        <el-button type="primary" @click="add"> 新增 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>

import { v4 as uuidv4 } from 'uuid';
import { reactive, onMounted, ref } from "vue";
import { useGoodsStore } from "@/stores/goods";
import router from "@/router"; // 引入router对象
import axios from "axios";
import { addCategory } from "@/api/category";

// 商品列表仓库
const useGoodsStores = useGoodsStore();

const dialogFormVisible = ref(false);
const formLabelWidth = "150px";
const form = reactive({
  id: "",
  name: "", // 商品名称
  price: "", // 商品价格
  stock: "", // 是否禁用
  category_id: "", // 商品种类
  home_page_on_recommend: false, // 是否推荐上首页
  status: true, // 是否上架
  image1: "",
  image2: "",
  image3: "",
  images: [],
  desc: "", // 商品描述
  categoryArray: [],
});


// 展示新增的表格
const showaddfrom = () => {
    dialogFormVisible.value = true;
}

// 得到商品的种类的所有
const getcategories = () => {
  useGoodsStores.Agetcategories();
  console.log("form", form.category_id);
  form.categoryArray = useGoodsStores.store.category;
};

// 取消修改
const Cancel = () => {
  dialogFormVisible.value = false;
};

// 删除图片
const deleteImage = (value)=>{
  if(value == 1){
    axios.delete(`http://localhost:9090/api/images/${form.image1}`).then(res=>{
      console.log(res);
      if(res.status == 200){
        form.image1 = '';
        obj1 = {
          "id":form.id,
          "val":1,
          "image":""
        }
        axios.put("http://localhost:9090/api/commoditys",obj1).then(
          (rep)=>{
              if(rep.status == 200){
                console.log("这是删除图片之后返回的",rep);
              }
          }
        )
      }
    })
  }else if (value == 2) {
    axios.delete(`http://localhost:9090/api/images/${form.image2}`).then(res=>{
      console.log(res);
      if(res.status == 200){
        form.image2 = '';
        if(res.status == 200){
        form.image1 = '';
        obj1 = {
          "id":form.id,
          "val":2,
          "image":""
        }
        axios.put("http://localhost:9090/api/commoditys",obj1).then(
          (rep)=>{
              if(rep.status == 200){
                console.log("这是删除图片之后返回的",rep);
              }
          }
        )
      }
      }
    })
  }else {
    axios.delete(`http://localhost:9090/api/images/${form.image3}`).then(res=>{
      console.log(res);
      if(res.status == 200){
        form.image3 = '';
        if(res.status == 200){
        form.image1 = '';
        obj1 = {
          "id":form.id,
          "val":3,
          "image":""
        }
        axios.put("http://localhost:9090/api/commoditys",obj1).then(
          (rep)=>{
              if(rep.status == 200){
                console.log("这是删除图片之后返回的",rep);
              }
          }
        )
      }
      }
    })
  }


}

// 修改之后保存
const add = () => {
  let Shome_page_on_recommend;
  if (form.home_page_on_recommend) {
    Shome_page_on_recommend = 1;
  } else {
    Shome_page_on_recommend = 0;
  }

  let Sstatus;
  if (form.status) {
    Sstatus = 0;
  } else {
    Sstatus = 1;
  }
  let obj = {
    id: uuidv4(),
    name: form.name,
    price: form.price,
    stock: form.stock,
    category_id: form.category_id,
    status: Sstatus,
    image1: form.image1,
    image2: form.image2,
    image3: form.image3,
    desc: form.desc,
    home_page_on_recommend: Shome_page_on_recommend,
    on_ter_recommend: 1,
    is_remove: false,
  };

  useGoodsStores.AaddCategory(obj);
  dialogFormVisible.value = false;
  useGoodsStores.AgetCategoryList(); // 获取全部数据
};

// 上传图片
const uploadImage = async (index) => {
  let file;
  if (index == 1) {
    file = fileInput1.value.files[0];
  } else if (index == 2) {
    file = fileInput2.value.files[0];
  } else {
    file = fileInput3.value.files[0];
  }

  if (!file) return;

  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await axios.post(
      "http://127.0.0.1:9090/api/upload-image",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("响应:", response.data);
    if (index == 1) {
      form.image1 = response.data.url;
    } else if (index == 2) {
      form.image2 = response.data.url;
    } else {
      form.image3 = response.data.url;
    }
  } catch (error) {
    console.error("上传图片失败:", error);
  }
};
</script>

<style scoped>
.avatar-uploader {
  border: 1px dashed black;
  margin-left: 10px;
  border-radius: 10px;
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar1{
  position: relative;
}
.avatar2{
  position: relative;
}
.avatar3{
  position: relative;
}

.deletebtn1{
  width: 100%;
  display: none;
      transition: opacity 0.3s ease-in-out;
      position:absolute;
      top:85%;
      
}

.deletebtn2{
  width: 100%;
  display: none;
      transition: opacity 0.3s ease-in-out;
      position:absolute;
      top:85%;
}

.deletebtn3{
  width: 100%;
  display: none;
      transition: opacity 0.3s ease-in-out;
      position:absolute;
      top:85%;
}

.avatar1:hover .deletebtn1{
  display: block;
}
.avatar2:hover .deletebtn2{
  display: block
}
.avatar3:hover .deletebtn3{
  display: block
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>