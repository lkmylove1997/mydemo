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
      <el-table-column prop="nickname" label="昵称" sortable width="180">
      </el-table-column>
      <el-table-column prop="phone" label="手机号" sortable width="180">
      </el-table-column>
    
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
        
          <el-button type="primary"  @click="edit(scope.row.uid)">编辑</el-button>
        
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
      list: "member/list",
    }),
  },
  methods: {
    ...mapActions({
      reqListAction: "member/changAction",
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