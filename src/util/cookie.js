import cookie from 'vue-cookies';


export function setToken(payload) {
    cookie.set("to_ken",payload);
}

export function getToken() {
    return cookie.get("to_ken");  //注意获取cookie时，需要return，才能接收到
}

export function removeToken() {
    cookie.remove("to_ken");
}

export function setUsername(payload) {
    cookie.set("username",payload);
}

export function getUsername() {
    return cookie.get("username");  //注意获取cookie时，需要return，才能接收到
}