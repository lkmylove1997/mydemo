<template>
  <div>
    <el-dialog :title="info.isAdd?'添加菜单':'编辑菜单'" :visible.sync="info.isshow">
      <!-- ------------- -->
      <el-form ref="form" :model="form" label-width="80px">
        
        <el-form-item label="所属角色">
          <el-select v-model="form.roleid" placeholder="请选择活动区域" @change="changepid">
            <el-option label="请选择"  :value="0" disabled></el-option>
            <el-option v-for="item in  roleList" :key="item.id" :label="item.rolename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        
        
        

        <el-form-item label="状态">
          <el-switch v-model="form.status"
            :active-value="1"
            :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <!-- ---------------- -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.isshow = false">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">确 定</el-button>
        <el-button type="primary" v-else @click="update">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { indexRoutes } from "../../../router/index";
import { reqManageAdd,reqManageDetail,reqManageUpdate} from "../../../utils/request";
import {successAlert,warningAlert} from "../../../utils/alert"
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      isshow: true,
      form: {
       roleid:"",
       username:"",
       password:"",
       status:1

      },
     
    };
  },
  computed: {
    ...mapGetters({
       roleList: "role/list",
    }),
  },
  methods: {
    ...mapActions({
      reqRoleListAction:"role/reqListAction",
       reqTotalAction:"manage/ reqTotalAction",
      reqListAction: "manage/reqListAction",
    }),
    changepid(){
    if(this.form.pid==0){
      this.form.type=1

    }else{
      this.form.type=2
    }
    
    },
    	 //取消
    cancel(){
      this.info.isshow=false;
    },
    update(){
        console.log(this.form);

      reqManageUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          this.reqListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });

    },
    //数据重置
    empty(){
      this.form={
         roleid:"",
       username:"",
       password:"",
       status:1
      }
    },
    look(uid){
      reqManageDetail(uid).then(res=>{
         if (res.data.code == 200) {
          //这个时候form是没有id的
          console.log("-----");
          console.log(res);
          this.form = res.data.list;
        //   this.form.id = id;
         this.form.password=""
        } else {
          warningAlert(res.data.msg);
        }
      })
   
    },
    add(){
     reqManageAdd(this.form).then(res=>{
        console.log("-------------------")
        if(res.data.code==200){
          //成功
          successAlert(res.data.msg)
          this.reqTotalAction()
          //数据重置
          this.empty()

          //弹框消失
          this.cancel()

          //list数据要刷新
          this.reqListAction()
        }else{
          warningAlert(res.data.msg)
        }
       })

    }
  },
  mounted() {
    if(this.roleList.length==0){
      this.reqRoleListAction()
    }
  },
};
</script>
<style scoped>
</style>