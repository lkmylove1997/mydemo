 <template>
  <div>
     <div id="main"  class="box"></div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import echarts from "echarts";
 
export default {
  props: [],
  components: {},
  data() {
    return {
       
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    fun(){
        var myChart = echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '您好'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'line',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }
  },
  mounted() {
    this.fun();
  },
};

</script>
 <style scoped>
 .box{
   width: 800px;
   height: 500px;
   border: 1px solid black;
 }
</style>