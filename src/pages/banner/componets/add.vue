<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加菜单' : '编辑菜单'"
      :visible.sync="info.isshow"
    >
      <!-- ------------- -->
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
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
  reqBannerAdd,
  reqBannerInfo,
  reqBannerEdit,
} from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      isshow: true,
      form: {
        title: "",
        img: "",
        status: 1,
      },
      imgUrl: null,
    };
  },
  computed: {
    ...mapGetters({
      list: "menu/list",
    }),
  },
  methods: {
    ...mapActions({
      reqListAction: "banner/reqListAction",
    }),
    getfile(e) {
      let file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) {
        alert("文件最大2m");
        return;
      }

      this.imgUrl = URL.createObjectURL(file);
      this.form.img = file;
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
      reqBannerEdit(this.form).then((res) => {
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
        title: "",
        img: "",
        status: 1,
      };
      imgUrl: null;
    },
    look(id) {
     reqBannerInfo(id).then((res) => {
        if (res.data.code == 200) {
          //这个时候form是没有id的
          this.form = res.data.list;
          this.form.id = id;
          this.imgUrl=this.$imgPre+this.form.img
            
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    add() {
      reqBannerAdd(this.form).then((res) => {
        console.log("-------------------");
        if (res.data.code == 200) {
          //成功
          successAlert(res.data.msg);

          //数据重置
          this.empty();

          //弹框消失
          this.cancel();

          //list数据要刷新
            this.reqListAction()
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
.my-upload {
  width: 150px;
  height: 150px;
  border: 1px dashed black;
  position: relative;
}
.my-upload h3 {
  text-align: center;
  line-height: 150px;
}
.my-upload .img {
  width: 150px;
  height: 150px;
  position: absolute;
  top: 0;
  left: 0;
}
.my-input {
  width: 150px;
  height: 150px;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.4;
}
</style>