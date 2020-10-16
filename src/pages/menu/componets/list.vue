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
      <el-table-column prop="id" label="角色" sortable width="180">
      </el-table-column>
      <el-table-column prop="title" label="角色名称" sortable width="180">
      </el-table-column>
      <el-table-column label="菜单图标">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="地址"> </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 1" type="primary"
            >启用</el-button
          >
          <el-button v-else  type="warning">禁用</el-button>
           </template>
      </el-table-column>
      <el-table-column prop="status" label="操作">
        <template slot-scope="scope">
          <button @click="g(scope)">jkl</button>
          <el-button type="primary"  @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger"   @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {reqMenuDel} from "../../../utils/request"
import {successAlert,warningAlert} from "../../../utils/alert" 
export default {
  props: [],
  components: {},
  data() {
    return {};
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
    g(s){
    console.log(s);
    },
    edit(id){
     this.$emit("edit",id)
    },
    del(id){
     this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          reqMenuDel(id).then(res=>{
            console.log("----------del------");
            if(res.data.code==200){
               successAlert(res.data.msg)
               this.reqListAction();

            }else{
              warningAlert(res.data.msg)
            }
          })

        })


    }
  },
  mounted() {
    this.reqListAction();
  },
};
</script>
<style scoped>
</style>