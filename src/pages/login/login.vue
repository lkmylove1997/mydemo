 <template>
  <div class="login">
      <div class="box">
          <h3>登录</h3>
          <div class="one">
              <el-input placeholder="请输入内容" clearable v-model="form.username"></el-input>
          </div>
          <div class="two">
              <el-input placeholder="请输入密码" show-password clearable v-model="form.password"></el-input>
          </div>
          <div>
               <el-button type="primary" @click="login">登录</el-button>
          </div>


      </div> 
    
  </div>
</template>
 <script>
import { mapGetters, mapActions } from "vuex";
import {reqLogin} from "../../utils/request"
export default {
  props: [],
  components: {},
  data() {
    return {
         form:{
           username:"admin",
           password:123,
         }
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
      changeUserInfoAction:"changeUserInfoAction"
        
    }),
    login(){
      reqLogin(this.form).then(res=>{
       console.log("-----logininfo---");
       console.log(res);
      //  vuex
        this.changeUserInfoAction(res.data.list)
        this.$router.push("/")

      })

    }
  },
  mounted() {},
};
</script>
 <style scoped>
 .login{
     width: 100vw;
     height: 100vh;
     background: linear-gradient(to right,#553443,#303D60);

 }
 .box{
     width: 400px;
     height: 300px;
     background: white;
     position: fixed;
     top: 50%;
     left: 50%;
     transform: translate(-50%,-50%);
     padding: 20px;
     border-radius:20px;
     text-align: center;
    }
    .one{
        margin: 20px 0 20px;
    }
    .two{
        
        margin: 20px 0 20px;

    }
</style>