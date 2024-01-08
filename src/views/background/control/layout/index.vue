<template>
  <div class="sclie">
    <el-row class="tac" style="height: 100vh;">
      <el-col :span="3"  style="height: 100vh; background-color: rgb(84, 92, 100); border: 1px rgba(84, 92, 100, 0) solid;">
        <h5 class="mb-2">购物商场管理员后台中心</h5>
        <el-menu
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          default-active="1"
          text-color="#fff"
          @open="handleOpen"
          @close="handleClose"
        >
        <!-- default-openeds="['3']" -->
          <el-menu-item index="1" @click="pushToHead">
            <el-icon><icon-menu /></el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-menu-item index="2" @click="pushToSet">
            <el-icon><setting /></el-icon>
            <span>个人设置</span>
          </el-menu-item>
          <el-menu-item index="3" @click="pushToList">
            <template #title>
              <el-icon><Notification /></el-icon>
              <span>用户设置</span>
            </template>
            <!-- <el-menu-item  @click="pushToList" v-for="(item, index) in counter.AllData.data" :key="index">{{ item.name }}</el-menu-item> -->
          </el-menu-item>
          <el-menu-item index="4" @click="pushTocommodityList">
            <el-icon><Plus /></el-icon>
            <span>商品设置</span>
          </el-menu-item>
          <el-menu-item index="5" @click="pushToOrder">
            <el-icon><House /></el-icon>
            <span>订单管理</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="21"  style="height: 100vh;">
        <div>
          <div class="header">
            {{ data.showTile }}
            <el-button type="primary" @click="LogOut" style="float: right; margin: 10px; padding: 20px;">退出登录</el-button>
          </div>
          <div style="margin-top: 10px;">
            <router-view></router-view>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script  setup>
import router from '@/router';

import { reactive ,onMounted} from 'vue';


onMounted(() => {
  
});

const data = reactive({
  showTile:'后台首页'
})

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};


const pushToList = () => {
  router.push({
    name: 'userlist'
  })
  data.showTile = '用户列表'
}

const pushToSet = () => {
  router.push({
    name:'set'
  })
  data.showTile = '个人设置'
}

const pushToHead = () => {
  router.push({
    name:'head'
  })
  data.showTile = '后台首页'
}

const pushTocommodityList = () => {
  router.push({
    name:'commodityList'
  })
  data.showTile = '商品种类列表'
}

const pushToOrder = ()=>{
  router.push({
    name:'orderList'
  })
  data.showTile = '订单管理'
}

const LogOut = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
  router.push({
    name:'Login'
  })
}


</script>

<style scoped>
el-menu {
  height: 100%;
}

.mb-2 {
  margin-left: 30px;
}

.header{
  height: 7vh;
  background-color: rgb(114, 138, 138);
  text-align: center;
  line-height: 7vh;
  font-size: 20px;
  font-weight: bold;
  color: #333
}
</style>