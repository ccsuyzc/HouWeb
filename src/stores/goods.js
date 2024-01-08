import { defineStore } from 'pinia'
import { ref, computed, reactive } from 'vue'
import {getCategoryList,getcategories,getCategoryById,updateCategory,deleteCategory,addCategory} from "@/api/category"

// 商品列表信息的仓库
export const useGoodsStore = defineStore('goods', () => {
    const store = reactive({
        goods: [],
        category:[]

    })

    const setGoods = (goods) => {
        store.goods = goods
    }

    
    // 得到全部数据
    const AgetCategoryList = async () => {
        let i = await getCategoryList()
        if (i.code == 200) {
            setGoods(i.obj || [])
        }
    }

    // 通过商品id得到指定商品的信息
    const AgetCategoryById = async (id) => {
        let i = await getCategoryById(id)
    }
    
    // 修改商品的信息
    const AupdateCategory = async (id, data) => {
        let i = await updateCategory(id, data)
    }
    
    // 删除商品信息
    const AdeleteCategory = async (id) => {
        let i = await deleteCategory(id)
        if (i.code == 200){
            AgetCategoryList()
        }
    }

    // 添加商品信息
    const AaddCategory = async (data) => {
        let i = await addCategory(data)
        if (i.code == 200) {
            AgetCategoryList()
        }
    }

    // 得到商品种类的列表
    const Agetcategories = async ()=>{
        let i = await getcategories()
        console.log("this",i);
        if (i.code == 200){
          store.category = i.obj
        }
        AgetCategoryList()
    }

    return {
        store,
        setGoods,
        AgetCategoryList,
        AgetCategoryById,
        AupdateCategory,
        AdeleteCategory,
        AaddCategory,
        Agetcategories
    }
})
