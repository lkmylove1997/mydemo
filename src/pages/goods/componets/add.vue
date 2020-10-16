<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加商品' : '编辑商品'"
      :visible.sync="info.isshow"
      @opened="opened"
    >
      <!-- ------------- -->
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="一级分类">
          <el-select
            v-model="form.first_cateid"
            placeholder="请选择活动区域"
            @change="changeFirst"
          >
            <el-option label="顶级菜单" value=""></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select v-model="form.second_cateid" placeholder="请选择活动区域">
            <el-option label="选择" value=""></el-option>
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="form.goodsname"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="市场价格">
          <el-input v-model="form.market_price"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <div class="my-upload">
            <h3>+</h3>
            <img :src="imgUrl" alt="" class="img" />
            <input
              type="file"
              class="my-input"
              @change="getfile"
              v-if="info.isshow"
            />
          </div>
        </el-form-item>
        <el-form-item label="商品规格">
          <el-select
            v-model="form.specsid"
            placeholder="请选择活动区域"
            @change="changeSpecs"
          >
            <el-option label="顶级菜单" value="0"></el-option>
            <el-option
              v-for="item in specsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品属性">
          <el-select
            v-model="form.specsattr"
            placeholder="请选择活动区域"
            multiple
          >
            <el-option label="顶级菜单" value="" disabled></el-option>
            <el-option
              v-for="item in goodsAttrList"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否热卖">
          <el-radio :label="1" v-model="form.isnew">目录</el-radio>
          <el-radio :label="2" v-model="form.isnew">菜单</el-radio>
        </el-form-item>
        <el-form-item label="是否新品">
          <el-radio :label="1" v-model="form.ishot">目录</el-radio>
          <el-radio :label="2" v-model="form.ishot">菜单</el-radio>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
        <el-form-item label="商品描述">
          <!-- <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            v-model="form.description"
          ></textarea> -->
          <div v-if="info.isshow" id="editor"></div>
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
import E from "wangeditor"
import { mapGetters, mapActions } from "vuex";
import { indexRoutes } from "../../../router/index";
import {
  reqGoodsAdd,
  reqGoodsDetail,
  reqGoodsUpdate,
  reqCateList,
} from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      isshow: true,
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [], //后端要的 '[]',所以 记得在请求前 转换格式
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      secondCateList: [],
      goodsAttrList: [],
      imgUrl: null,
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/list",
      specsList: "specs/list",

      list: "menu/list",
    }),
  },
  methods: {
    ...mapActions({
      reqListAction: "goods/reqListAction",
      reqCateList: "cate/reqListAction",
      reqSpecsList: "specs/reqListAction",
      reqTotalAction:"goods/reqTotalAction"
    }),
    opened() {
      //富文本
      this.editor = new E("#editor");
      this.editor.create();
      //编辑器创建完成以后再赋值
      this.editor.txt.html(this.form.description);
    },
    changeFirst() {
      reqCateList({ pid: this.form.first_cateid }).then((res) => {
        console.log("----");
        this.secondCateList = res.data.list;
      });
    },
    changeSpecs() {
      //商品规格变了，商品属性先置空
      this.form.specsattr = [];

      this.getAttrsArr();
    },
    //获得商品属性数组
    getAttrsArr() {
      // this.form.specsid 颜色 1
      // 在specsList中找到 找到哪一条数据的id和当前this.form.specsid是一样的。
      let obj = this.specsList.find((item) => item.id == this.form.specsid);
      // 把这条数据的attrs赋值给goodsAttrList;
      this.goodsAttrList = obj.attrs;
    },
    getfile(e) {
      let file = e.target.files[0];

      this.imgUrl = URL.createObjectURL(file);
      this.form.img = file;
    },

    // changepid() {
    //   if (this.form.pid == 0) {
    //     this.form.type = 1;
    //   } else {
    //     this.form.type = 2;
    //   }
    // },
    //取消
    cancel() {
      this.info.isshow = false;
    },
    update() {
      // console.log(this.form);
      this.form.description = this.editor.txt.html();
 
      let data = {
        ...this.form,
        specsattr: JSON.stringify(this.form.specsattr),
      };
      reqGoodsUpdate(data).then((res) => {
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
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [], //后端要的 '[]',所以 记得在请求前 转换格式
        isnew: 1,
        ishot: 1,
        status: 1,
      };
      this.secondCateList = [];
      this.goodsAttrList = [];
      this.imgUrl = null;
    },
    look(id) {
      reqGoodsDetail(id).then((res) => {
        if (res.data.code == 200) {
          //这个时候form是没有id的
          this.form = res.data.list;
          this.form.id = id;
          //   ---
          this.changeFirst();
          //   -------
          this.form.specsattr = JSON.parse(this.form.specsattr);
          this.imgUrl = this.$imgPre + this.form.img;
          this.getAttrsArr();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    add() {
      // console.log(this.form);
      this.form.description = this.editor.txt.html();
      let data = {
        ...this.form,
        specsattr: JSON.stringify(this.form.specsattr),
      };
      console.log(data);
        reqGoodsAdd(data).then((res) => {
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
          this.reqTotalAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    if (this.cateList.length == 0) {
      this.reqCateList();
    }
    this.reqSpecsList(true);
  },
};
</script>
<style scoped>
.my-upload {
  width: 150px;
  height: 150px;
  border: 1px dashed #ccc;
  position: relative;
}

.my-upload h3 {
  text-align: center;
  line-height: 150px;
  font-size: 30px;
  font-weight: 400;
}

.my-upload .my-input {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  cursor: pointer;
  opacity: 0;
}

.my-upload .img {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
</style>