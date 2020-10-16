<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加菜单' : '编辑菜单'"
      :visible.sync="info.isshow"
    >
      <!-- ------------- -->
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="规格编号">
          <el-input v-model="form.specsname"></el-input>
        </el-form-item>

        <el-form-item
          label="规格属性"
          v-for="(item, index) in attrArr"
          :key="index"
        >
          <div class="con">
            <el-input v-model="item.value" class="wrap"></el-input>
            <el-button type="primary" v-if="index == 0" @click="addAttr"
              >新增属性</el-button
            >
            <el-button type="danger">删除</el-button>
          </div>
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
        <el-button type="primary" @click="add" v-if="info.isAdd"
          >确 定</el-button
        >
        <el-button type="primary" v-else @click="update">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { indexRoutes } from "../../../router/index";
import {
  reqSpecsAdd,
  reqSpecsDetail,
  reqSpecsUpdate,
} from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      isshow: true,
      attrArr: [{ value:"" }, { value:"" }],
      form: {
        specsname: "",
        attrs:"",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      list: "menu/list",
    }),
  },
  methods: {
    ...mapActions({
      reqListAction: "specs/reqListAction",
      reqTotalAction: "specs/reqTotalAction",
    }),
    addAttr() {
      this.attrArr.push({ value:"" });
    },
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
    update() {

      reqSpecsUpdate(this.form).then((res) => {
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
    empty() {
      this.form = {
        specsname: "", 
        attrs: "",
        status: 1,
      };
      this.attrArr=[{ value:"" }, { value:"" }]
     
    },
    look(id) {
      reqSpecsDetail(id).then((res) => {
        console.log(res);
        console.log("----------");
        if (res.data.code == 200) {
          //这个时候form是没有id的
         this.form = res.data.list[0];
          //'['s','l','m']'--->[{value:'s'},{value:'l'},{value:'m'}]
          this.attrArr = JSON.parse(this.form.attrs).map((item) => ({
            value: item,
          }));
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    checkData(){
    if(this.form.specsname==""){
     
      warningAlert("error");
       return false;

    }
    if(this.attrArr.some((item)=>item.value=="")){
      warningAlert("error")
      return false;



    }
    return true;

    },
   
   
    add() {
      //  "['白色','红色‘，’黄色‘]"=[{value:'s'},{}]

      if(!this.checkData()){
       return false;
      }
      
      this.form.attrs = JSON.stringify(this.attrArr.map((item) => item.value));
     
      reqSpecsAdd(this.form).then((res) => {
         
        if (res.data.code == 200) {
          //成功
          successAlert(res.data.msg);

          //数据重置
          this.empty();

          //弹框消失
          this.cancel();

          //list数据要刷新
          this.reqListAction();
          this.reqTotalAction();
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
.con {
  display: flex;
}
.wrap {
  flex: 1;
}
</style>