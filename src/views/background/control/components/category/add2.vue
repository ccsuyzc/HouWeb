<template>
  <el-button
    type="primary"
    style="
      width: 150px;
      height: 50px;
      font-size: 17px;
      margin-top: 20px;
      margin-left: -23%;
    "
    @click="showaddfrom"
    >商品种类管理</el-button
  >

  <el-dialog
    v-model="dialogFormVisible"
    title="商品种类管理"
    style="width: 400px"
  >
    <el-form :model="form">
      <el-form-item label="种类名" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" style="width: 250px" />
        <el-button type="primary" @click="add">新增</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="form.categoryList" border style="width: 100%">
      <el-table-column
        prop="name"
        label="种类名"
        min-width="100px"
      ></el-table-column>
      <el-table-column label="操作" min-width="100px">
        <template #default="{ row }">
          <el-button
            type="primary"
            @click="pushToDelete(row)"
            style="width: 100%"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>
    
    <script setup>
import { v4 as uuidv4 } from "uuid";
import { reactive, onMounted, ref } from "vue";
import { useGoodsStore } from "@/stores/goods";
import router from "@/router"; // 引入router对象
import axios from "axios";
import { addCategory, getcategories,addCategorys,deleteCategorys } from "@/api/category";

// 商品列表仓库
const useGoodsStores = useGoodsStore();

const dialogFormVisible = ref(false);
const formLabelWidth = "50px";
const form = reactive({
  name: "", // 新增的商品种类
  categoryList: [],
});

onMounted(() => {
  getALLcategories();
});

// 得到所有种类
const getALLcategories = async () => {
  let i = await getcategories();
  if (i.code == 200) {
    form.categoryList = i.obj;
  }
};

// 展示表单
const showaddfrom = () => {
  dialogFormVisible.value = true;
  getALLcategories();
};


// 添加类别
const add =async () => {
  let obj = {
    "id":uuidv4(),
    "name":form.name,
    "is_remove":false
  }
  let i = await addCategorys(obj)
  if (i.code == 200) {
    getALLcategories();
  }
};

// 删除类别
const pushToDelete =async (row) => {
  console.log(row);
  if (confirm("确定要删除吗？")) {
    let i =await deleteCategorys(row.id)
    if (i.code == 200) {
      getALLcategories()
    }else if(i.code ==400){
      alert("商品类别重复")
    }
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

.avatar1 {
  position: relative;
}
.avatar2 {
  position: relative;
}
.avatar3 {
  position: relative;
}

.deletebtn1 {
  width: 100%;
  display: none;
  transition: opacity 0.3s ease-in-out;
  position: absolute;
  top: 85%;
}

.deletebtn2 {
  width: 100%;
  display: none;
  transition: opacity 0.3s ease-in-out;
  position: absolute;
  top: 85%;
}

.deletebtn3 {
  width: 100%;
  display: none;
  transition: opacity 0.3s ease-in-out;
  position: absolute;
  top: 85%;
}

.avatar1:hover .deletebtn1 {
  display: block;
}
.avatar2:hover .deletebtn2 {
  display: block;
}
.avatar3:hover .deletebtn3 {
  display: block;
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