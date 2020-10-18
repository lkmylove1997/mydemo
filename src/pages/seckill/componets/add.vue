<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加菜单' : '编辑菜单'"
      :visible.sync="info.isshow"
    >
      <!-- ------------- -->
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>

        <el-form-item label="活动期限">
          <div class="block">
            <span class="demonstration"></span>
            <el-date-picker
              v-model="value1"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="changeTime"

            >
            </el-date-picker>
          </div>
        </el-form-item>

        <el-form-item label="一级分类">
          <el-select
            v-model="form.first_cateid"
            placeholder="请选择活动区域"
            @change="changeFirst"
          >
            <el-option label="顶级菜单" value=""></el-option>
            <el-option
              v-for="item in oneList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select
            v-model="form.second_cateid"
            placeholder="请选择活动区域"
            @change="changeSecond"
          >
            <el-option label="顶级菜单" value=""></el-option>
            <el-option
              v-for="item in secondArr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品">
          <el-select
            v-model="form.goodsid"
            placeholder="请选择活动区域"
            
          >
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in threeArr"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
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
  reqSeckAdd,
  reqSeckInfo,
  reqSeckEdit,
} from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      isshow: true,
      form: {
        title:"",
        begintime:"",
        endtime:"",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      secondArr:[],
      threeArr:[],
      obj:[],
      icons: [
        "el-icon-s-tools",
        "el-icon-user",
        "el-icon-camera",
        "el-icon-message-solid",
      ],
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
    };
  },
  computed: {
    ...mapGetters({
      list: "cate/list",
      oneList: "cate/list",
      goodsList: "goods/list",
      // oneList: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      reqListAction: "seckill/reqListAction",
      reqCateList: "cate/reqListAction",
      reqGoodsList: "goods/reqListAction",
    }),
   changeTime(){
     console.log(this.value1);
    //  var msec = Date.parse("Wed Nov 01 2000 00:00:00 GMT+0800 (中国标准时间)");
    // 
    let m=this.value1[0]
    let msec = Date.parse(m);
    this.form.begintime=msec;
   
     let w=this.value1[1]
     let jk = Date.parse(w);
     this.form.endtime=jk;

    
     
    
    },
    changepid() {
      if (this.form.pid == 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },
    changeFirst() {
      //商品规格变了，商品属性先置空
      // this.form.specsattr = [];

      this.getAttrsArr();
    },
    //获得商品属性数组
    getAttrsArr() {
      // console.log(this.oneList);
      let obj = this.oneList.find((item) => item.id == this.form.first_cateid);
      // console.log(obj);
      this.secondArr = obj.children;
    },
    changeSecond(){
     this.getSec();
    },
    getSec(){
       this.obj2 = this.goodsList.filter((item) => item.second_cateid == this.form.second_cateid);
      //  console.log(this.obj2);
       this.threeArr=this.obj2
    },
    //取消
    cancel() {
      this.info.isshow = false;
    },
    update() {
      reqSeckEdit(this.form).then((res) => {
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
        title:"",
        begintime:"",
        endtime:"",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      };
      this.value1=[new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)]
    },
    look(id) {
      reqSeckInfo(id).then((res) => {
        if (res.data.code == 200) {
          //这个时候form是没有id的
          console.log("-------seckinfo-----");
          console.log(res.data.list);
          this.form = res.data.list;
          this.form.id = id;
          this.changeFirst();
          this.changeSecond();
          this.value1=[new Date(Number(this.form.begintime)),new Date(Number(this.form.endtime))]
        //  value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],

        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    add() {
      reqSeckAdd(this.form).then((res) => {
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
      });
    },
  },
  mounted() {
   this.reqCateList();
   this.reqGoodsList(true);
  },
};
</script>
<style scoped>
</style>