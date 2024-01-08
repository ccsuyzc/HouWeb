import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'


import{getAllUsers,getUser,updateUser,deleteUser} from "@/api/users"

export const UsersStore = defineStore('users', () => {
  const store = reactive({
    user: {
    },
    users:[],
    oneUser:{}, 
    towUser:{}
  })

  const setUser = (user) => {
    store.user = user
  }
  const setUsers = (users) => {
    store.users = users
  }
  const setOneUser = (user) => {
    store.oneUser = user
  }
  const setTowUser = (user) => {
    store.towUser = user
  }

  // 得到全部用户信息
  const getAllUsersInfo = async () => {
    let i = await getAllUsers()
    console.log(i);
    if(i.code == 200){
         setUsers(i.obj || [])
    }
  }

  // 得到指定用户的信息
  const getUsersInfo = async (userid) => {
    let user = await getUser(userid)
    if(user.code == 200){
      setOneUser(user.obj || []) 
      setTowUser(user.obj || [])
      return user.obj
    }
    return {}
  }

  // 修改用户信息
  const updateUserInfo = async (id,data) => {
    let user = await updateUser(id,data)
    setUser(user)
  }

  // 删除用户
  const deleteUserInfo = async (id) => {
    let i = await deleteUser(id)
    if(i.code == 200)
    {
      getAllUsersInfo()
    }
    return i
  }

   


  return {
    store,
    setUser,
    setUsers,
    getAllUsersInfo,
    getUsersInfo,
    updateUserInfo,
    deleteUserInfo,
    setTowUser
  }
})









// // 网站相关设置的仓库
// export const useCounterStore = defineStore('counter', () => {
//   const store = reactive({
//     WebsiteName: '',  //网站名字
//     HomeTitleText: '言志志的个人博客',  // 首页标题文字
//     HomeWelcomeText: '我是言志志，一个热爱编程和设计的人。欢迎来到我的个人博客，这里记录了我的学习和思考。希望能够与大家分享我的经验和见解。', // 首页欢迎的文字内容
//   })

//   const setWebsiteName = (name) => {
//     store.WebsiteName = name
//     return true
//   }
//   const setHomeTitleText = (text) => {
//     store.HomeTitleText = text
//     return true

//   }
//   const setHomeWelcomeText = (text) => {
//     store.HomeWelcomeText = text
//     return true

//   }

//   // 修改网站设置
//   const ModifySettings = async () => {
//     let data = {
//       "text":store.HomeWelcomeText,
//       "title":store.HomeTitleText
//     }
//     let i = await SaveSiteSettings(JSON.stringify(data))
//     console.log(i);
//   }

//   async function getStore() {
//     let i = await GetSet()
//     if (i.code == 200) {
//       store.WebsiteName = i.data.WebsiteName
//     }
//   }

//   return { store, setWebsiteName, setHomeTitleText, setHomeWelcomeText, getStore,ModifySettings }
// })


