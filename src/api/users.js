import requists from './http'

// 得到全部用户
export function getAllUsers() {
    return requists.get('http://localhost:9090/api/users')
}

// 得到指定用户的信息
export function getUser(id) {
    return requists.get('http://localhost:9090/api/users/' + id)
}
// 修改用户信息
export function updateUser(id, data) {
    return requists.put('http://localhost:9090/api/users/' + id, data)
}

// 删除用户
export function deleteUser(id) {
    return requists.delete('http://localhost:9090/api/users/' + id)
}


