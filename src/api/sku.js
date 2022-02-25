import request from '@/utils/request'

// 获取图片接口
// /admin/product/spuImageList/{spuId}


export const reqSpuImageList = (spuId) => request({
    url: `/admin/product/spuImageList/${spuId}`,
    method: "get"
})


// /admin/product/spuSaleAttrList/{spuId}

export const reqSpuSaleAttrList = (spuId) => request({
    url: `/admin/product/spuSaleAttrList/${spuId}`,
    method: "get"
})

// /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}

export const reqAttrInfoList = (category1Id, category2Id, category3Id) => request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: "get"
})

export const reqAddSku = (skuInfo) => request({
    url: `/admin/product/saveSkuInfo`,
    method: "post",
    data: skuInfo
})

export const reqSpuList = (spuId) => request({
    url: `/admin/product/findBySpuId/${spuId}`,
    method: "get"
})

//sku列表接口

// /admin/product/list/{page}/{limit}
export const reqSkuList = (page, limit) => request({
    url: `/admin/product/list/${page}/${limit}`,
    method: 'get'
})

//上架
// /admin/product/onSle/{skuId}
export const reqSale = (skuId) => request({
    url: `/admin/product/onSale/${skuId}`,
    method: "get"
})



//下架
// /admin/product/cancelSale/{skuId}
export const reqCancel = (skuId) => request({
    url: `/admin/product/cancelSale/${skuId}`,
    method: 'get'
})


// 抽屉  /admin/product/getSkuById/{skuId}

export const reqGetSkuById = (skuId) => request({
    url: `/admin/product/getSkuById/${skuId}`,
    method: 'get'
})