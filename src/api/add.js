import requists from './http'

// 上传图片
export function uploadImg(data){
    console.log("imge",data);
    return requists.post('http://localhost:9090/api/upload-image', data,  {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
}

