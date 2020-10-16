
import { reqSpecsList, reqSpecsCount } from "../../utils/request"
const state = {
    list: [],
    size: 2,
    total: 0,
    page: 1
}
const mutations = {
    changeList(state, arr) {
        state.list = arr
        console.log(state.list);
    },
    //修改total 
    changeTotal(state, num) {
        state.total = num;
    },
    changePage(state, page) {
        state.page = page
    }


}
const actions = {
    reqListAction(context,bool) {
        let params = bool ? {} : { page: context.state.page, size: context.state.size }
        reqSpecsList(params).then(res => {
            let list = res.data.list ? res.data.list : []
            
            
            list.forEach(item=>{
                item.attrs=JSON.parse(item.attrs)
            })
            context.commit("changeList", list)
        })
    },
    reqTotalAction(context) {
        reqSpecsCount().then(res => {
            context.commit("changeTotal", res.data.list[0].total)
        })
    },
    changePageAction(context, page) {
        context.commit("changePage", page)
        context.dispatch("reqListAction")

    }

}
const getters = {
    list(state) {
        return state.list

    },
    size(state) {
        return state.size
    },
    total(state) {
        return state.total;
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true

}