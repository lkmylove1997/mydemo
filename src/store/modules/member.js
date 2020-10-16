

import { reqMember } from "../../utils/request"
const state = {
    list: []
}
const mutations = {
    changList(state, list) {
        state.list = list
    }
}
const actions = {
    changAction(context) {
        reqMember().then(res => {
            context.commit("changList", res.data.list)
        })
    }

}
const getters = {
    list(state) {
        return state.list
    }
}
// export default {
//     state,
//     mutations,
//     actions,
//     getters,
//     namespaced: true

// }
export default{
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}