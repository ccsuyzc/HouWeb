import requists from './http'

// 得到所有商品类别的信息
export function getCategoryList() {
  return requists({
    url: 'http://localhost:9090/api/commoditys',
    method: 'get'
  })
}

// 通过商品id得到指定商品的信息
export function getCategoryById(id) {
    return requists.get('http://localhost:9090/api/commoditys/' + id)
}

// 修改商品的信息
export function updateCategory(id, data) {
    return requists.put('http://localhost:9090/api/commoditys/' + id, data)
}

// 删除商品信息
export function deleteCategory(id) {
    return requists.delete('http://localhost:9090/api/commoditys/' + id)
}

// 添加商品信息
export function addCategory(data) {
    return requists.post('http://localhost:9090/api/commoditys', data)
}

// 得到所有商品种类的信息
export function getcategories() {
    return requists.get('http://127.0.0.1:9090/api/categories')
}

// 新增种类
export function addCategorys(data) {
    return requists.post('http://127.0.0.1:9090/api/categories', data)
}

// 删除种类
export function deleteCategorys(id) {
    return requists.delete(`http://127.0.0.1:9090/api/categories/${id}`)
}


