import cookie from 'vue-cookies';


const state = {
    isCollapse: JSON.parse(cookie.get("Collapse")) || false
};

const mutations = {
    MuIsCollapse(state, payload) {
        state.isCollapse = payload;
        cookie.set("Collapse", JSON.stringify(payload))
    }
};
const getters = {
    getIsCollapse(state) {
        return state.isCollapse;
    }
};
// const actions = {};
// const modules = {};
export default {
    namespaced:true,
    state,
    mutations,
    getters,
    // actions,
    // modules
}
