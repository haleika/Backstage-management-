// 平台属性api
import request from '@/utils/request'

//获取一级分类
// /admin/product/getCatgory1
export const reqGetCategory1List = () => request({
    url: `/admin/product/getCategory1`,
    method: "get"
})

export const reqGetCategory2List = (id) => request({
    url: `/admin/product/getCategory2/${id}`,
    method: "get"
})

export const reqGetCategory3List = (id) => request({
    url: `/admin/product/getCategory3/${id}`,
    method: "get"
})

export const reqGetAttrList = (category1Id, category2Id, category3Id) => request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: "get"
})

// 添加属性和属性值接口

export const reqAddAttr = (data) => request({
    url: `/admin/product/saveAttrInfo`,
    method: "post",
    data
})
