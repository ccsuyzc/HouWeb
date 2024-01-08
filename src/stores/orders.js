import { defineStore } from 'pinia'
import { ref, computed, reactive } from 'vue'
import { getOrders, getOrdersByUserId, getOrderById, updateOrder, deleteOrder } from "@/api/orders"


export const ordersStore = defineStore("orders", () => {
    const store = reactive({
        orders: [],
        Oneorders:[]
    })

    function setOrders(data) {
        store.orders = data
    }

    function setOneorders(data) {
        store.Oneorders = data
    }

    // 得到全部订单数据
    const AgetOrders = async () => {
        let i = await getOrders()
        if (i.code === 200) {
            setOrders(i.data)
        }
    }

    // 根据用户id得到该用户所有订单信息
    const AgetOrdersByUserId = async (userId) => {
        let i = await getOrdersByUserId(userId)
        if (i.code === 200) {
            setOneorders(i.data)
        }
    }

    // 根据订单id得到订单信息
    const AgetOrderById = async (orderId) => {
        let i = await getOrderById(orderId)
        if (i.code === 200) {
            setOrders(i.data)
        }
    }

    // 修改订单
    const AupdateOrder = async (orderId, data) => {
        let i = await updateOrder(orderId)
        if (i.code === 200) {
            setOrders(i.data)
        }
    }

    // 删除订单
    const AdeleteOrder = async (orderId) => {
        let i = await deleteOrder(orderId)
        if (i.code === 200) {
            setOrders(i.data)
        }
    }

    return {
        store,
        setOrders,
        AgetOrders,
        AgetOrdersByUserId,
        AgetOrderById,
        AupdateOrder,
        AdeleteOrder

    }
})