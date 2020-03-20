import newAxios from '../util/request'  //引入请求拦截中新创建的axios实例

export function ApiGetSms(data) {
    return newAxios.request({
        method: "post",
        url: "getSms/",
        data: data
    })
}

export function ApiRegister(data) {
    return newAxios.request({
        method: 'post',
        url: 'register/',
        data: data
    })
}

export function ApiLogin(data) {
    return newAxios.request({
        method: 'post',
        url: 'login/',
        data: data
    })
}


