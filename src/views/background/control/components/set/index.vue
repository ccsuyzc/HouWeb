<template>
  <el-form :model="form">
    <el-form-item label="用户名" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off" style="width: 450px" />
    </el-form-item>

    <el-form-item label="电话" :label-width="formLabelWidth">
      <el-input v-model="form.phone" autocomplete="off" style="width: 450px" />
    </el-form-item>

    <el-form-item label="邮箱" :label-width="formLabelWidth">
      <el-input v-model="form.email" autocomplete="off" style="width: 450px" />
    </el-form-item>

    <el-form-item label="收货地址" :label-width="formLabelWidth">
      <el-input
        v-model="form.address"
        autocomplete="off"
        style="width: 450px"
      />
    </el-form-item>
    <el-form-item label="密码" :label-width="formLabelWidth">
      <el-button type="primary" @click="putPassword">修改密码</el-button>

      <el-dialog
    v-model="dialogVisible"
    title="Tips"
    width="30%"
    :before-close="handleClose"
  >
  <el-input
    v-model="form.oldpassword"
    type="password"
    placeholder="请输入旧密码"
    show-password
  />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="ChangePassword">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
    </el-form-item>



  </el-form>
  <span class="dialog-footer" style="margin-left: 87%;">
    <el-button type="primary" @click="save" style="padding: 25px 30px; font-size: 15px; "> 保存 </el-button>
  </span>
</template>
      
  <script  setup>
import router from "@/router"; // 引入router对象

import { v4 as uuidv4 } from "uuid";
import { reactive, onMounted, ref } from "vue";
import { useGoodsStore } from "@/stores/goods";
import axios from "axios";
import { getAllUsers, getUser, updateUser, deleteUser } from "@/api/users";
import { UsersStore } from "@/stores/counter";
import { ordersStore } from "@/stores/orders";

// 后台用户数据仓库
const UsersStores = UsersStore();
// 后台订单数据仓库
const ordersStores = ordersStore();

// 商品列表仓库
const useGoodsStores = useGoodsStore();
const dialogVisible = ref(false)
const dialogFormVisible = ref(false);
const formLabelWidth = "150px";
const form = reactive({
  id: "", // 用户id
  name: "", // 用户姓名
  phone: "", // 用户手机号
  stock: "", //
  email: "", // 商品种类
  status: false, // 禁用
  address: "",
  role: "",
  password: "",
  oldpassword:"",
  newpassword:"",
  options: [
    {
      value: 0,
      label: "普通用户",
    },
    {
      value: 1,
      label: "管理员",
    },
  ],
});

onMounted(() => {
  //   console.log("执行了");
  UsersStores.getAllUsersInfo(); // 获取全部数据
  let u = JSON.parse(localStorage.getItem("user"))
  if (u) {
    form.id = u.id;
    form.name = u.username;
    form.phone = u.phone;
    form.email = u.email;
    form.password = u.password;
    form.address = u.address;
    form.role = u.role;
    if (u.status == 1) {
      form.status = false;
    } else {
      form.status = true;
    }
  }
  
});

// 保存
const save = async () => {
  let Astates;
  if (form.status) {
    Astates = 0;
  } else {
    Astates = 1;
  }
  let obj = {
    id: form.id,
    username: form.name,
    password: form.newpassword,
    phone: form.phone,
    email: form.email,
    status: Astates,
    address: form.address,
    role: form.role,
    address: form.address,
  };
  console.log(obj);
  let i = await updateUser(obj.id, obj);
  if (i.code == 200) {
    getOne(obj.id)
    alert("修改成功！")
  }
};

// 得到单个用户的信息
const getOne = async (id)=>{
      let i = await getUser(id)
      if (i.code == 200) {
        form.id = i.obj.id;
        form.name = i.obj.username;
        form.phone = i.obj.phone;
        form.email = i.obj.email;
        form.password = i.obj.password;
        form.address = i.obj.address;
        form.role = i.obj.role;
        if (i.obj.status == 1) {
          form.status = false;
        } else {
          form.status = true;
        }
        localStorage.setItem("user",JSON.stringify(i.obj))      
      }
}

// 修改按钮
const putPassword = ()=>{
    dialogVisible.value = true
}

// 进行密码的比对
const ChangePassword = ()=>{
    if(form.oldpassword != form.password){
      form.oldpassword = ""
      alert("旧密码错误！请重新输入")
    }else{
      let i = prompt('请输入新密码')
      form.newpassword = i
      dialogVisible.value = false
    }
}
</script>
  
  
  <style scoped>
.avatar-uploader {
  border: 1px dashed black;
  margin-left: 10px;
  border-radius: 10px;
}
.avatar-uploader .avatar {
  width: 158px;
  height: 158px;
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
      