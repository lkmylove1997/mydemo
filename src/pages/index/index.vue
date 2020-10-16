<template>
  <el-container class="index">
    <el-aside width="200px" class="left">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        background-color="#20222a"
        text-color="#fff"
        active-text-color="#ffd04b"
        unique-opened
        router
      >
        <el-menu-item index="/">
          <i class="el-icon-setting"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <!-- 动态侧边栏 -->
        <div v-for="item in userInfo.menus" :key="item.id">
          <!-- 是目录 -->
          <el-submenu :index="item.id + ''" v-if="item.children">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                v-for="i in item.children"
                :key="i.id"
                :index="i.url"
                >{{ i.title }}</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>

          <!-- 菜单 -->
          <el-menu-item v-else :index="item.url">{{ item.title }}</el-menu-item>
        </div>
        
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="header">
         <div class="header-con">
          <h3>{{userInfo.username}}</h3>
          <el-button type="danger" @click="logOut()">退出登录</el-button>
        </div>
      </el-header>
      <el-main class="main">
        <el-breadcrumb separator-class="el-icon-arrow-right" v-if="$route.name">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ $route.name }}</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- --------------------------- -->
        <router-view class="jk"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      userInfo: "userInfo",
      
    }),
  },
  methods: {
    ...mapActions({
    changeUserInfoAction:"changeUserInfoAction"
    }),
    logOut(){
      this.changeUserInfoAction({});
      this.$router.push("/login")
    }
  },
  mounted() {},
};
</script>
<style scoped>
.jk {
  padding-top: 20px;
}
.index {
  width: 100vw;
  height: 100vh;
}
.left {
  background: #20222a;
}
.header {
  background: #b3c0d1;
}
.header-con{
  float: right;
}
.header-con h3{
  float: left;
  line-height: 60px;
  font-weight: 400;
}
.header-con .el-button{
  float: left;
  margin-top: 10px;
}
</style>