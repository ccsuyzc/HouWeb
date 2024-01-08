<template>
  <el-table :data="UsersStores.store.users" border style="width: 100%">
    <el-table-column align="center" type="index" label="序号" width="50" />
    <el-table-column
      align="center"
      prop="username"
      label="用户名"
      min-width="120"
    />
    <el-table-column align="center" prop="phone" label="电话" min-width="120" />
    <el-table-column align="center" prop="email" label="邮箱" min-width="160" />
    <el-table-column align="center" prop="role" label="角色" min-width="120">
      <template #default="{ row }">
        <span v-if="row.role == 2">超级管理员</span>
        <span v-if="row.role == 1">管理员</span>
        <span v-if="row.role == 0">普通用户</span>
      </template>
    </el-table-column>
    <el-table-column align="center" prop="address" label="操作" width="">
      <template #default="{ row }">
        <el-button type="primary" @click="pushToDetail(row)">修改</el-button>
        <el-button type="primary" @click="pushToDelete(row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog
    v-model="dialogFormVisible"
    title="修改用户信息"
    style="width: 900px"
  >
    <el-form :model="form">
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" style="width: 450px" />
      </el-form-item>

      <el-form-item label="电话" :label-width="formLabelWidth">
        <el-input
          v-model="form.phone"
          autocomplete="off"
          style="width: 450px"
        />
      </el-form-item>

      <el-form-item label="邮箱" :label-width="formLabelWidth">
        <el-input
          v-model="form.email"
          autocomplete="off"
          style="width: 450px"
        />
      </el-form-item>

      <el-form-item label="收货地址" :label-width="formLabelWidth">
        <el-input
          v-model="form.address"
          autocomplete="off"
          style="width: 450px"
        />
      </el-form-item>

      <el-form-item label="是否禁用？" :label-width="formLabelWidth">
        <el-switch v-model="form.status" />
      </el-form-item>

      <el-form-item label="更改角色" :label-width="formLabelWidth">
        <el-select
          v-model="form.role"
          class="m-2"
          placeholder="Select"
          size="large"
        >
          <el-option
            v-for="item in form.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <!-- 用户订单列表 -->
    <el-table
      :data="ordersStores.store.Oneorders"
      border
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column align="center" type="index" label="序号" width="50" />
      <el-table-column
        align="center"
        prop="id"
        label="订单号"
        min-width="120"
      />
      <el-table-column
        align="center"
        prop="price"
        label="总金额"
        min-width="120"
      />
      <el-table-column
        align="center"
        prop="address"
        label="收货地址"
        min-width="160"
      />
      <el-table-column
        align="center"
        prop="pay_time"
        label="下单时间"
        min-width="160"
      />
      <el-table-column align="center" label="操作" width="">
        <template #default="{ row }">
          <el-button type="primary" @click="pushToDeletelist(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="Cancel">取消</el-button>
        <el-button type="primary" @click="save"> 保存 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
    
<script  setup>
import router from "@/router"; // 引入router对象

import { v4 as uuidv4 } from "uuid";
import { reactive, onMounted, ref } from "vue";
import { useGoodsStore } from "@/stores/goods";
import axios from "axios";
import{getAllUsers,getUser,updateUser,deleteUser} from "@/api/users"
import { UsersStore } from "@/stores/counter";
import { ordersStore } from "@/stores/orders";

// 后台用户数据仓库
const UsersStores = UsersStore();
// 后台订单数据仓库
const ordersStores = ordersStore();

// 商品列表仓库
const useGoodsStores = useGoodsStore();

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
  password:"",
  options :[
  {
    value: 0,
    label: '普通用户',
  },
  {
    value: 1,
    label: '管理员',
  },
  ]
});

onMounted(() => {
  //   console.log("执行了");
  UsersStores.getAllUsersInfo(); // 获取全部数据
});

// 查看
const pushToDetail =async (row) => {
  console.log("row", row);

  // 赋值数据
  form.id = row.id;
  form.name = row.username;
  form.phone = row.phone;
  form.email = row.email;
  form.password = row.paaddress;
  form.address = row.address;
  if (row.status == 0) {
    form.status = false;
  } else {
    form.status = true;
  }
  form.address = row.address;
  form.role = row.role;
  // 根据用户id得到用户的数据

  UsersStores.getUsersInfo(row.id);

  // 根据id得到用户的所有订单信息
  ordersStores.AgetOrdersByUserId(row.id);
  dialogFormVisible.value = true;
};



// 删除
const pushToDelete =  (row) => {
  UsersStores.deleteUserInfo(row.id)
  UsersStores.getAllUsersInfo()
};


// 保存
const save = async() => {
  let Astates
  if (form.status){
    Astates = 1
  } else{
    Astates = 0
  }
 let obj={
    id:form.id,
    username:form.name,
    password:form.password,
    phone:form.phone,
    email:form.email,
    status:Astates,
    address:form.address,
    role:form.role,
    address:form.address,
  }
  console.log(obj);
  let i =  await updateUser(obj.id,obj)
  if (i.code == 200){
    UsersStores.getAllUsersInfo()
  }
  dialogFormVisible.value = false;
};

// 取消修改
const Cancel = () => {
  dialogFormVisible.value = false;
};
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
    