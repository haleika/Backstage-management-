import request from '@/utils/request'



export const resSpuList = (page, limit, category3Id) => request({
    url: `/admin/product/${page}/${limit}`,
    method: "GET",
    params: {
        category3Id
    }
})

//获取平台全部销售属性，只有三个
// /admin/product/baseSaleAttrList
export const resGetBaseSaleAttrList = () => request({
    url: '/admin/product/baseSaleAttrList',
    method: "GET"
})

//获取spu信息
// /admin/product/getSpuById/{spuId}
export const resSpu = (spuId) => request({
    url: `/admin/product/getSpuById/${spuId}`,
    method: "GET"
})

//获取品牌信息
// GET /admin/product/baseTrademark/getTrademarkList
export const resTrademarkList = () => request({
    url: `/admin/product/baseTrademark/getTrademarkList`,
    method: "GET"
})
//获取spu图标的接口
// GET /admin/product/spuImageList/{spuId}
export const resSpuImgeList = (spuId) => request({
    url: `/admin/product/spuImageList/${spuId}`,
    method: "GET"
})



export const resAddOrUpdateSpu = (spuInfo) => {
    if (spuInfo.id) {
        return request({
            url: "/admin/product/updateSpuInfo",
            method: 'post',
            data: spuInfo
        })
    } else {
        return request({
            url: "/admin/product/saveSpuInfo",
            method: 'post',
            data: spuInfo
        })
    }
}