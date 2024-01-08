<template>
  <el-form :inline="true" :model="form" class="demo-form-inline" style="margin-left: 70px;">
    <el-form-item label="用户名">
        <el-input v-model="form.user" placeholder="请输入用户名" clearable />
    </el-form-item>
    <el-form-item label="订单号">
        <el-input v-model="form.order" placeholder="请输入订单号" clearable />
    </el-form-item>
    <el-form-item label="手机号">
        <el-input v-model="form.phone" placeholder="请输入手机号" clearable />
    </el-form-item>
    <!-- <el-form-item label="种类">
      <el-select v-model="value" class="m-2" placeholder="Select" size="">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item> -->
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>

  <el-table :data="form.tableData" style="width: 100%" border>
    <el-table-column align="center" type="index" label="序号" width="50" />
    <el-table-column prop="user_id" label="用户ID" min-width="100" />
    <el-table-column prop="commodity_id" label="商品ID" min-width="100" />
    <el-table-column prop="count" label="数量" min-width="100" />
    <el-table-column prop="price" label="总价" min-width="100" />
    <el-table-column prop="address" label="收货地址" min-width="100" />
    <el-table-column prop="orderID" label="订单号" min-width="100" />
    <el-table-column prop="pay_time" label="下单时间" min-width="100" />
    <el-table-column prop="status" label="付款状态" min-width="80"/>
    <el-table-column prop="phone" label="电话号码" min-width="100"/>
    <el-table-column align="center" prop="address" label="操作" width="">
      <template #default="{ row }">
        <el-button type="primary" @click="pushToDelete(row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
  
  <script setup>
import {deleteOrder,getOrders,getOrderById,getOrderByUserName,getOrderByPhone,getOrderByPhone2} from "@/api/orders"
import { ref, reactive,onMounted } from "vue";

const form = reactive({
  user: "",
  order: "",
  phone: "",
  tableData:[]
});

 


onMounted(() => {
    getAllOrders()
    // getOrderByIdInfo("1")
    // getOrderByUserNameInfo("testuser3")
    // getOrderByPhoneInfo("1234567890","testuser3")
})

// 查询所有的订单
const getAllOrders  =async ()=>{
   let i  = await getOrders()
   if(i.code == 200){
    form.tableData = i.data
   }
}

// 根据订单id得到订单信息
const getOrderByIdInfo = async (id) => {
  let i = await getOrderById(id)

  if (i.code == 200) {
    form.tableData = i.data
  }
};

// 根据用户名查找指定订单的信息
const getOrderByUserNameInfo = async (name) => {
  let i = await getOrderByUserName(name)

  if (i.code == 200) {
    form.tableData = i.data
  }
};

// 根据手机号和用户名查找指定订单的信息
const getOrderByPhoneInfo = async (phone,name) => {
  let i = await getOrderByPhone(phone,name)
  console.log("dfasf",i);
  if (i.code == 200) {
    form.tableData = i.data
  }
};


// 根据手机号进行查询
const getOrderByPhone22 = async (phone) => {
  let i = await getOrderByPhone2(phone)
  console.log("dfasf",i);
  if (i.code == 200) {
    form.tableData = i.data
  }
};

const pushToDelete = (row) => {
  console.log("row",row);
  let i = confirm("确定删除吗？")
  if (i) {
    deleteOrder(row.id).then((res) => {
      if (res.code == 200) {
        alert("删除成功")
        getAllOrders()
      }else{
        alert("删除失败")
      }
    })
  }
};



const onSubmit = () => {
    if(form.order){
         getOrderByIdInfo(form.order)
         return
    }
   if(form.phone){
        getOrderByPhone22(form.phone)
        return
   }
   if(form.user){
        getOrderByUserNameInfo(form.user)
        return
   }
   getAllOrders()
//    if(form.order && form.user &&!form.phone){
//         getOrderByPhoneInfo(form.phone,form.user)
//         return
//    }
};
</script>
  