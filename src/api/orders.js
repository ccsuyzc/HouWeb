import requists from './http'

// 得到所有订单信息
export function getOrders() {
  return requists({
    url: 'http://localhost:9090/api/orders',
    method: 'get'
  })
}

// 根据用户id得到该用户所有订单信息
export function getOrdersByUserId(userId) {
  return requists({
    url: 'http://localhost:9090/api/orders/user/' + userId,
    method: 'get'
  })
}


// 修改订单信息
export function updateOrder(orderId, order) {
  return requists({
    url: 'http://localhost:9090/api/orders/' + orderId,
    method: 'put',
    data: order
  })
}


// 删除订单信息
export function deleteOrder(orderId) {
  return requists({
    url: 'http://localhost:9090/api/orders/' + orderId,
    method: 'delete'
  })
}

// 根据订单id得到订单信息
export function getOrderById(orderId) {
  return requists({
    url: 'http://localhost:9090/api/orders/order/' + orderId,
    method: 'get'
  })
}

 // 根据用户名查找指定订单的信息
 export function getOrderByUserName(userName) {
  return requists({
    url: 'http://localhost:9090/api/orders/username/' + userName,
    method: 'get'
  })
}

// 根据手机号和用户名查找指定订单的信息
export function getOrderByPhone(phone, userName) {
  return requists({
    url: 'http://localhost:9090/api/orders/phone/' + phone + '/username/' + userName,
    method: 'get'
  })
}

// 根据手机号查找指定订单的信息
export function getOrderByPhone2(phone) {
  return requists({
    url: 'http://localhost:9090/api/orders/phone/' + phone,
    method: 'get'
  })
}







