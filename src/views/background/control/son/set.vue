<template>
    <el-form :model="form" label-width="140px">
    <el-form-item label="网站标题名字">
      <el-input v-model="form.WebsiteName" style="width: 400px;"/>
    </el-form-item>
    <el-form-item label="首页标题文字">
        <el-input v-model="form.HomeTitleText" style="width: 400px;"/>
    </el-form-item>
    <el-form-item label="首页欢迎的文字内容">
        <el-input v-model="form.HomeWelcomeText" style="width: 600px;"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :plain="true" @click="onSubmit">保存</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { SaveSiteSettings} from "@/api/set"
import { reactive,onMounted } from 'vue'
import { useCounterStore } from '@/stores/counter';
const counter = useCounterStore()

const form = reactive({
  WebsiteName:'',
  HomeTitleText:'',
  HomeWelcomeText:''
})

onMounted(() => {
  form.WebsiteName = counter.store.WebsiteName
  form.HomeTitleText = counter.store.HomeTitleText
  form.HomeWelcomeText = counter.store.HomeWelcomeText
})

const onSubmit = () => {
    let name = counter.setWebsiteName(form.WebsiteName)
    let text1 =  counter.setHomeTitleText(form.HomeTitleText)
    let text2 =  counter.setHomeWelcomeText(form.HomeWelcomeText)
    if (name && text1 && text2) {
      counter.ModifySettings()
      console.log(counter.store);
      success()
    }
}

const success = () => {
  console.log('保存成功!');
}
</script>

<style scoped>

</style>