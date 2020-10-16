<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加菜单' : '编辑菜单'"
      :visible.sync="info.isshow"
    >
      <!-- ------------- -->
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="手机号">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <!-- ---------------- -->
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="update">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { indexRoutes } from "../../../router/index";
import {
  reqMenuAdd,
  reqMenuDetail,
  reqMemberInfo,
  reqMemberEdit,
} from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      isshow: true,
      form: {
        nickname: "",
        password: "",
        phone: "",
        status: 1,
      },
    };
    pass:null
  },
  computed: {
    ...mapGetters({
      list: "menu/list",
    }),
  },
  methods: {
    ...mapActions({
     reqListAction: "member/changAction",
    }),
     cancel(){
      this.info.isshow=false;
    },
    empty() {
      this.form = {
        nickname: "",
        password: "",
        phone: "",
        status: 1,
      };
    },
    changepid() {
      if (this.form.pid == 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },

    update() {
        // if(this.form.password==""){
        //     this.form.password=this.pass
        // }
    
      reqMemberEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
        
          this.cancel();
          this.reqListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //数据重置

    look(uid) {
      reqMemberInfo(uid).then((res) => {
        if (res.data.code == 200) {
          //这个时候form是没有id的
          this.form = res.data.list;
          this.form.uid = uid;
        //   this.pass= this.form.password
        //   this.form.password=""
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    console.log(this.indexRoutes);
  },
};
</script>
<style scoped>
</style>