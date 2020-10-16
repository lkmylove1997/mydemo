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
      <el-table-column prop="id" label="用户编号" sortable width="180">
      </el-table-column>
       <el-table-column prop="username" label="用户命" sortable width="180">
      </el-table-column>
       <el-table-column prop="rolename" label="所属角色" sortable width="180">
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
        
          <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.uid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
   
    <el-pagination background layout="prev, pager, next" :total="total" :page-size="size"
    @current-change="changePage"
    >
    </el-pagination>


  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqManageDel } from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "manage/list",
      size: "manage/size",
      total: "manage/total",
    }),
  },
  methods: {
    ...mapActions({
      reqListAction: "manage/reqListAction",
       changePageAction:"manage/changePageAction",
       reqTotalAction:"manage/reqTotalAction"
    }),
    g(s) {
      console.log(s);
    },
     changePage(e){
      this.changePageAction(e)
    },
    edit(id) {
      this.$emit("edit", id);
    },
    del(uid) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
       reqManageDel(uid).then((res) => {
          console.log("----------del------");
          if (res.data.code == 200) {
            successAlert(res.data.msg);
            this.reqListAction();
            this.reqTotalAction()
          } else {
            warningAlert(res.data.msg);
          }
        });
      });
    },
  },
  mounted() {
    this.reqListAction();
    this. reqTotalAction();
  },
};
</script>
<style scoped>
</style>