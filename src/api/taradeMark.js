import request from '@/utils/request'


export const reqTradeMark = (page, limit) => request({
    url: `/admin/product/baseTrademark/${page}/${limit}`,
    method: 'get'
})

