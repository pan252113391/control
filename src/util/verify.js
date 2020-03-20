//密码验证
export function passWord(data) {
    let reg = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/;
    return data.match(reg) ? true : false;
}
//邮箱验证
export function email(data) {
let reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
    return data.match(reg) ? true : false;
}