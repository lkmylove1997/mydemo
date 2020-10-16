 <template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加分类' : '编辑分类'"
      :visible.sync="info.isshow"
    >
      <!-- ------------- -->
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="分类名称">
          <el-input v-model="form.catename"> </el-input>
        </el-form-item>

        <el-form-item label="上级分类">
          <el-select v-model="form.pid" placeholder="请选择活动区域">
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="图片" v-if="form.pid != 0">
          <div class="my-upload">
            <h3>+</h3>
            <img :src="imgUrl" alt="" class="img" v-if="imgUrl" />
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
  reqCateAdd,
  reqCateDetail,
  reqCateUpdate,

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
        catename: "",
        img: null,
        status: 1,
      },
      imgUrl: "",
    };
  },
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      reqListAction: "cate/reqListAction",
    }),
  
    getfile(e) {
      let file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) {
        alert("文件最大2m");
        return;
      }
      let imgArr = [".jpg", ".png", ".jpeg", ".gif"];
      let extname = file.name.slice(file.name.lastIndexOf(".")); //'.jpg'
      if (!imgArr.some((item) => item == extname)) {
        warningAlert("文件格式不正确");
        return;
      }
      this.imgUrl = URL.createObjectURL(file);
      this.form.img = file;
    },

    //取消
    cancel() {
      this.info.isshow = false;
    },
    update() {
      reqCateUpdate(this.form).then((res) => {
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
        pid: 0,
        catename: "",
        img: null,
        status: 1,
      };
      this.imgUrl = null;
    },
    look(id) {
      reqCateDetail(id).then((res) => {
        if (res.data.code == 200) {
          //这个时候form是没有id的
          this.form = res.data.list;
          this.form.id = id;
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    add() {
      reqCateAdd(this.form).then((res) => {
        console.log("-------------------");
        if (res.data.code == 200) {
          //成功
          successAlert(res.data.msg);

          //数据重置
          this.empty();

          //弹框消失
          this.cancel();

          // list数据要刷新
          this.reqListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
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