import cookie from 'vue-cookies';
import { ApiLogin } from '../../api/loginApi'
import { setToken, setUsername,getToken,getUsername } from "../../util/cookie"

const state = {
    isCollapse: JSON.parse(cookie.get("Collapse")) || false,
    to_ken: getToken() || '',
    user_name: getUsername() || '控制台',
};
const mutations = {
    MuIsCollapse(state,payload) {
        state.isCollapse = !state.isCollapse;
        cookie.set("Collapse", JSON.stringify(state.isCollapse));
        
    },
    set_token(state, payload) {
        state.to_ken = payload
    }, 
    set_username(state, payload) {
        state.user_name = payload
    },

};
const getters = {
    getIsCollapse(state) {
        return state.isCollapse;
    },
    token(state) {
        return state.to_ken;
    },
    username(state) {
        return state.user_name;
    }
};
const actions = {
    login(content, requestData) {
        return new Promise((resolve, reject) => {
            ApiLogin(requestData).then(res => {
                let data = res.data.data;
                // 存储cookie
                setToken(data.token)
                setUsername(data.username)
                // 存储vueX中
                content.commit('set_token', data.token)
                content.commit('set_username', data.username)

                resolve(res);
            }).catch(err => {
                reject(err);
            })
        })
    }
}
// const modules = {};
export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions,

}
