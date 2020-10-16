<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="商品编号" sortable width="180">
      </el-table-column>
      <el-table-column
        prop="firstcatename"
        label="商品名称"
        sortable
        width="180"
      >
      </el-table-column>
      <el-table-column prop="price" label="商品价格" sortable width="180">
      </el-table-column>
      <el-table-column label="菜单图标">
        <template slot-scope="scope">
          <img :src="$imgPre + scope.row.img" class="dur" alt="" />
        </template>
      </el-table-column>
      <el-table-column label="是否热卖">
        <template slot-scope="scope">
          <el-button v-if="scope.row.ishot == 1" type="primary">是</el-button>
          <el-button v-else type="danger">否</el-button>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 1" type="primary"
            >启用</el-button
          >
          <el-button v-else type="warning">禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>
<script>

import { mapGetters, mapActions } from "vuex";
import { reqGoodsDel } from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "goods/list",
      total: "goods/total",
      size: "goods/size",
    }),
  },
  methods: {
    ...mapActions({
      reqListAction: "goods/reqListAction",
      reqTotalAction:"goods/reqTotalAction",
      changePageAction:"goods/changePageAction"
    }),
    g(s) {
      console.log(s);
    },
    edit(id) {
      this.$emit("edit", id);
    },
    changePage(e){
    this.changePageAction(e)
    },
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        reqGoodsDel(id).then((res) => {
          console.log("----------del------");
          if (res.data.code == 200) {
            successAlert(res.data.msg);
            this.reqListAction();
            this.reqTotalAction();
          } else {
            warningAlert(res.data.msg);
          }
        });
      });
    },
  },
  mounted() {
    this.reqListAction();
    this.reqTotalAction();
  },
};
</script>
<style scoped>
.dur {
  width: 100px;
  height: 100px;
}
</style>