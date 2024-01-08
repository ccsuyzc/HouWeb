<template>
  <el-table :data="DatabaseArticle.AllData.data" border style="width: 100%">
    <el-table-column align="center" prop="time" label="时间" width="250" />
    <el-table-column align="center" prop="name" label="文章名" width="550" />
    <el-table-column align="center" prop="address" label="操作" width="">
      <template #default="{ row }">
        <el-button type="primary" @click="pushToDetail(row)">查看</el-button>
        <el-button type="primary" @click="pushToEdit(row)">修改</el-button>
        <el-button type="primary" @click="pushToDelete(row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
  
  <script  setup>
import { reactive, onMounted } from "vue";
import { DatabaseData } from "@/stores/counter";
import router from "@/router"; // 引入router对象
import { DeleteOne } from "@/api/list"

const tableData = reactive([
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
]);

// 后台数据仓库
const DatabaseArticle = DatabaseData();

onMounted(() => {
//   console.log("执行了");
  DatabaseArticle.GetALLDataStores(); // 获取全部数据
});

// 查看
const pushToDetail = (row) => {
//   console.log("this is row", row);
  router.push({
    name: "Text",
    params: {
      id: row.uid,
    }
  });
};

// 修改
const pushToEdit = (row) => {
  console.log("this is row", row);
  router.push({
    name: "detaliedList",
    params: {
      id: row.uid,
    }
  });
};

// 删除
const pushToDelete =async (row) => {
  // console.log("this is row", row);
  let i = await DeleteOne(row.uid)
  if(i.code == 200){
    DatabaseArticle.GetALLDataStores(); // 获取全部数据
  }
};
</script>
  