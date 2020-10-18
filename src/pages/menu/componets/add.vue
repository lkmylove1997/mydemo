<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加菜单' : '编辑菜单'"
      :visible.sync="info.isshow"
    >
      <!-- ------------- -->
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="菜单名称" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" prop="pid">
          <el-select
            v-model="form.pid"
            placeholder="请选择活动区域"
            @change="changepid"
          >
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型">
          <el-radio :label="1" v-model="form.type" disabled>目录</el-radio>
          <el-radio :label="2" v-model="form.type" disabled>菜单</el-radio>
        </el-form-item>
        <el-form-item label="菜单图标" v-if="form.type == 1" prop="icon">
          <el-select v-model="form.icon" placeholder="请选择图标">
            <el-option v-for="item in icons" :key="item" :value="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" v-else>
          <el-select v-model="form.url" placeholder="请选择地址">
            <el-option
              v-for="item in indexRoutes"
              :key="item.path"
              :label="item.name"
              :value="'/' + item.path"
            >
            </el-option>
          </el-select>
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
        <el-button @click="info.isshow = false">取 消</el-button>
        <el-button type="primary" @click="add('form')" v-if="info.isAdd"
          >确 定</el-button
        >
        <el-button type="primary" v-else @click="update('form')">修改</el-button>
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
  reqMenuUpdate,
} from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      isshow: true,
      form: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
      rules: {
        title: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        pid: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
        icon: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
 
       
      },
      icons: [
        "el-icon-s-tools",
        "el-icon-user",
        "el-icon-camera",
        "el-icon-message-solid",
      ],
      indexRoutes: indexRoutes,
    };
  },
  computed: {
    ...mapGetters({
      list: "menu/list",
    }),
  },
  methods: {
    ...mapActions({
      reqListAction: "menu/reqListAction",
    }),
    changepid() {
      if (this.form.pid == 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },
    //取消
    cancel() {
      this.info.isshow = false;
    },
    // update() {
    update(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
        reqMenuUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          this.reqListAction();
        } else {
           warningAlert('请输入完整的内容');
        }
      });

            
            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
 






      // reqMenuUpdate(this.form).then((res) => {
      //   if (res.data.code == 200) {
      //     successAlert(res.data.msg);
      //     this.empty();
      //     this.cancel();
      //     this.reqListAction();
      //   } else {
      //     warningAlert(res.data.msg);
      //   }
      // })
 
    //数据重置
    empty() {
      this.form = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      };
    },
    look(id) {

      reqMenuDetail(id).then((res) => {
        if (res.data.code == 200) {
          //这个时候form是没有id的
          this.form = res.data.list;
          this.form.id = id;
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  
   add(formName) {
        this.$refs[formName].validate((valid) => {
        if (valid) {
            // alert('submit!');
        reqMenuAdd(this.form).then((res) => {
        console.log("-------------------");
        if (res.data.code == 200) {
          //成功
          successAlert(res.data.msg);

          //数据重置
          this.empty();

          //弹框消失
          this.cancel();

          //list数据要刷新
          this.reqListAction();
        } else {
          warningAlert(res.data.msg);
        }
      })
      } else {
            
             warningAlert('请输入完整的内容');
            return false;
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