import axios from "axios"
import qs from "qs"
import Vue from "vue"
import store from "../store"

let baseUrl = "/api";
Vue.prototype.$imgPre = "http://localhost:3000"

axios.interceptors.request.use(req => {
    if (req.url != baseUrl + "/api/userlogin") {
        req.headers.authorization = store.state.userInfo.token;
    }
    return req;
})





//响应拦截
// axios.interceptors.response.use(res => {
//     console.group("---------------本次请求路径是:" + res.config.url)
//     console.log(res);
//     console.groupEnd()
//     //用户掉线了
//     if (res.data.msg == '登录已过期或访问权限受限') {
//         warningAlert(res.data.msg)
//         router.push("/login")
//     }
//     return res;
// })
//添加
export const reqMenuAdd = (params) => {
    return axios({
        url: baseUrl + "/api/menuadd",
        method: "post",
        data: qs.stringify(params)
    })
}
export const reqMenuList = () => {
    return axios({
        url: baseUrl + "/api/menulist",
        method: "get",
        params: {
            istree: true
        }
    })
}
export const reqMenuDel = (id) => {
    return axios({
        url: baseUrl + "/api/menudelete",
        method: "post",
        data: qs.stringify({ id: id })
    })
}
export const reqMenuDetail = (id) => {
    return axios({
        url: baseUrl + "/api/menuinfo",
        method: "get",
        params: {
            id: id
        }
    })
}
export const reqMenuUpdate = (params) => {
    return axios({
        url: baseUrl + "/api/menuedit",
        method: "post",
        data: qs.stringify(params)
    })
}
/*********角色管理***************/
//添加
export const reqRoleAdd = (params) => {
    return axios({
        url: baseUrl + "/api/roleadd",
        method: "post",
        data: qs.stringify(params)
    })
}

//列表
export const reqRoleList = () => {
    return axios({
        url: baseUrl + "/api/rolelist",
        method: "get",
    })
}
//删除
export const reqRoleDel = (id) => {
    return axios({
        url: baseUrl + "/api/roledelete",
        method: "post",
        data: qs.stringify({ id: id })
    })
}

//1条
export const reqRoleDetail = (id) => {
    return axios({
        url: baseUrl + "/api/roleinfo",
        method: "get",
        params: {
            id: id
        }
    })
}

//修改
export const reqRoleUpdate = (params) => {
    return axios({
        url: baseUrl + "/api/roleedit",
        method: "post",
        data: qs.stringify(params)
    })
}
/*********管理员管理***************/
//添加
export const reqManageAdd = (params) => {
    return axios({
        url: baseUrl + "/api/useradd",
        method: "post",
        data: qs.stringify(params)
    })
}

//管理员总数
export const reqManageCount = () => {
    return axios({
        url: baseUrl + "/api/usercount",
    })
}

//列表 params={page:1,size:10}
export const reqManageList = (params) => {
    return axios({
        url: baseUrl + "/api/userlist",
        method: "get",
        params: params
    })
}
//删除
export const reqManageDel = (uid) => {
    return axios({
        url: baseUrl + "/api/userdelete",
        method: "post",
        data: qs.stringify({ uid: uid })
    })
}

//1条
export const reqManageDetail = (uid) => {
    return axios({
        url: baseUrl + "/api/userinfo",
        method: "get",
        params: {
            uid: uid
        }
    })
}

//修改
export const reqManageUpdate = (params) => {
    return axios({
        url: baseUrl + "/api/useredit",
        method: "post",
        data: qs.stringify(params)
    })
}
//添加 params={pid:1,catename:"123",img:File,state:1}
export const reqCateAdd = (params) => {
    let data = new FormData()
    /*
    data.append("pid",1)
    data.append("catename","123")
    data.append("img",File)
    data.append("status",1)
    */
    for (let i in params) {
        data.append(i, params[i])
    }
    return axios({
        url: baseUrl + "/api/cateadd",
        method: "post",
        data: data
    })
}

//列表 params={istree:true}  {pid:0}
export const reqCateList = (params) => {
    return axios({
        url: baseUrl + "/api/catelist",
        method: "get",
        params: params
    })
}
//删除
export const reqCateDel = (id) => {
    return axios({
        url: baseUrl + "/api/catedelete",
        method: "post",
        data: qs.stringify({ id: id })
    })
}

//1条
export const reqCateDetail = (id) => {
    return axios({
        url: baseUrl + "/api/cateinfo",
        method: "get",
        params: {
            id: id
        }
    })
}

//修改
export const reqCateUpdate = (params) => {
    let data = new FormData()
    for (let i in params) {
        data.append(i, params[i])
    }
    return axios({
        url: baseUrl + "/api/cateedit",
        method: "post",
        data: data
    })
}
/*********商品规格管理***************/
//添加
export const reqSpecsAdd = (params) => {
    return axios({
        url: baseUrl + "/api/specsadd",
        method: "post",
        data: qs.stringify(params)
    })
}

//管理员总数
export const reqSpecsCount = () => {
    return axios({
        url: baseUrl + "/api/specscount",
    })
}

//列表 params={page:1,size:10}
export const reqSpecsList = (params) => {
    return axios({
        url: baseUrl + "/api/specslist",
        method: "get",
        params: params
    })
}
//删除
export const reqSpecsDel = (id) => {
    return axios({
        url: baseUrl + "/api/specsdelete",
        method: "post",
        data: qs.stringify({ id: id })
    })
}

//1条
export const reqSpecsDetail = (id) => {
    return axios({
        url: baseUrl + "/api/specsinfo",
        method: "get",
        params: {
            id: id
        }
    })
}

//修改
export const reqSpecsUpdate = (params) => {
    return axios({
        url: baseUrl + "/api/specsedit",
        method: "post",
        data: qs.stringify(params)
    })
}
// -------------------------------------------
export const reqGoodsAdd = (params) => {
    let data = new FormData()
    for (let i in params) {
        data.append(i, params[i])

    }
    return axios({
        url: baseUrl + "/api/goodsadd",
        method: "post",
        data: data

    })
}
export const reqGoodsCount = () => {
    return axios({
        url: baseUrl + "/api/goodscount",

    })
}
export const reqGoodsList = (params) => {
    return axios({
        url: baseUrl + "/api/goodslist",
        method: 'get',
        params: params
    })
}
export const reqGoodsDetail = (id) => {
    return axios({
        url: baseUrl + "/api/goodsinfo",
        method: "get",
        params: {
            id: id
        }


    })
}
export const reqGoodsUpdate = (params) => {
    let data = new FormData();
    for (let i in params) {
        data.append(i, params[i])

    }

    return axios({
        url: baseUrl + "/api/goodsedit",
        method: "post",
        data: data
    })
}
export const reqGoodsDel = (id) => {
    return axios({
        url: baseUrl + "/api/goodsdelete",
        method: "post",
        data: {
            id: id
        }

    })

}
export const reqLogin = (data) => {
    return axios({
        url: baseUrl + "/api/userlogin",
        method: "post",
        data: data
    })
}
// --------------member----------
export const reqMember = () => {
    return axios({
        url: baseUrl + "/api/memberlist"
    })
}
export const reqMemberInfo = (uid) => {
    return axios({
        url: baseUrl + "/api/memberinfo",
        method: 'get',
        params: {
            uid: uid
        }
    })
}
export const reqMemberEdit = (data) => {
    return axios({
        url: baseUrl + "/api/memberedit",
        method: "post",
        data: data
    })
}
// -----------------------------
export const reqBannerAdd = (params) => {
    let data = new FormData();
    for (let i in params) {
        data.append(i, params[i])

    }
    return axios({
        url: baseUrl + "/api/banneradd",
        method: "post",
        data: data
    })
}
export const reqBannerList = () => {
    return axios({
        url: baseUrl + "/api/bannerlist",

    })
}
export const reqBannerInfo = (id) => {
    return axios({
        url: baseUrl + "/api/bannerinfo",
        method: 'get',
        params: {
            id: id
        }
    })
}
export const reqBannerEdit = (params) => {
    let data = new FormData();
    for (let i in params) {
        data.append(i, params[i])
    }
    return axios({
        url: baseUrl + "/api/banneredit",
        method: "post",
        data: data
    })
}
export const reqBannerDel = (id) => {
    return axios({
        url: baseUrl + "/api/bannerdelete",
        method: 'post',
        data: {
            id: id
        }
    })
}
// -------------------------
export const reqSeckAdd = (data) => {
    return axios({
        url: baseUrl + "/api/seckadd",
        method: "post",
        data: data
    })
}
export const reqSeckList = () => {
    return axios({
        url: baseUrl + '/api/secklist'
    })
}
export const reqSeckInfo = (id) => {
    return axios({
        url: baseUrl + "/api/seckinfo",
        method: "get",
        params: {
            id: id
        }

    })
}
export const reqSeckEdit = (data) => {
    return axios({
        url: baseUrl + "/api/seckedit",
        method: "post",
        data: data
    })
}
export const reqSeckDel = (id) => {
    return axios({
        url: baseUrl + "/api/seckdelete",
        method: "post",
        data: {
            id: id
        }
    })
}