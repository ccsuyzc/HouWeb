<template>
  <el-form :model="UsersStores.store.oneUser" label-width="120px">
    <el-form-item label="用户名">
      <el-input v-model="oneUser.username" />
    </el-form-item>
    <el-form-item label="电话">
      <el-input v-model="oneUser.phone" style="width: 200px" />
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="oneUser.email" style="width: 200px" />
    </el-form-item>
    <el-form-item label="是否禁用">
      <el-switch v-model="oneUser.status" />
    </el-form-item>
  </el-form>
  <div style="margin-top: 20px; display: flex; justify-content: flex-end">
    <el-button size="large" type="primary" @click="save">保存</el-button>
    <el-button size="large" type="success" @click="cancel">取消</el-button>
  </div>
  <!-- 用户订单列表 -->
  <el-table :data="ordersStores.store.Oneorders" border style="width: 100%; margin-top:20px">
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
        <el-button type="primary" @click="pushToDelete(row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
  
  <script setup>
import router from "@/router";
import { reactive, onMounted, ref } from "vue";


const show = ref(false);
const oneUser = reactive({
  name: "", //文章名
  phone: "", // 作者名
  status: true, // 是否禁用该用户
  email: "", // 电子邮件
});
let userid = router.currentRoute.value.params.id;

onMounted(() => {
  // 发条请求得到基本数据，然后进行渲染


  getData()
});

const getData = ()=>{

}


// 保存
const save = () => {
  ModifyArticleData(
    router.currentRoute.value.params.id,
  ).then((i) => {
    if (i.code == 200) {
      router.back(-1);
    }
  });
};

const isShow = () => {
  show.value = true;
};
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