<template>
  <div>
    <!-- <el-button type="primary" @click="willAdd">添加</el-button> -->
   
    <v-list @edit="edit"></v-list>

    <v-add :info="info" ref="add"></v-add>
    
     

  </div>
</template>
<script>

import { mapGetters, mapActions } from "vuex";
import vList from "./componets/list.vue"
import vAdd from "./componets/add.vue"
 
export default {
  props: [],
  components: {
      vList,
      vAdd
  },
  data() {
    return {
      info:{
        isAdd:false,
        isshow:false,

      }
    }
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    willAdd(){
      this.info.isAdd=true
      this.info.isshow=true
    },
    edit(id){
       this.info.isshow=true;
       this.info.isAdd=false;
       this.$refs.add.look(id)
    }
  },
  mounted() {},
};
</script>
<style scoped>
</style>