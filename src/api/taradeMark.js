import request from '@/utils/request'


export const reqTradeMark = (page, limit) => request({
    url: `/admin/product/baseTrademark/${page}/${limit}`,
    method: 'get'
})


export const reqAddOrUpdateTradeMark = (tradeMark) => {
    if (tradeMark.id) {
        return request({
            url: `/admin/product/baseTrademark/upadte`,
            method: 'put',
            data: tradeMark
        })
    } else {
        return request({
            url: `/admin/product/baseTrademark/save`,
            method: 'post',
            data: tradeMark
        })
    }
}