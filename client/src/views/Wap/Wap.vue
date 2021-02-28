<template>
  <div class="wap">
    <a-tabs v-model="selectedTab">
      <a-tab-pane key="1" tab="买卖榜">
        <SellBuyBillboard />
      </a-tab-pane>
      <a-tab-pane key="2" tab="数据分析">
        <DataAnalayse />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
//  常量声明
const value = { msg: "Hello World!" };
import SellBuyBillboard from "./components/SellBuyBillboard";
import DataAnalayse from "./components/DataAnalayse";
//  引入外部资源
export default {
  name: "Wap",
  mixins: [],
  components: {
    SellBuyBillboard,
    DataAnalayse,
  },
  props: {},
  data() {
    return {
      //  常量
      value,
      //  状态
      flag: true,
      //  变量
      selectedTab: "1",
    };
  },
  computed: {},
  watch: {},
  methods: {
    test() {
      console.log("Hello World!");
    },
  },
  filters: {},
  created() {},
  mounted() {},
  destoryed() {},
};
</script>
<style scoped>
.wap {
}
</style>
