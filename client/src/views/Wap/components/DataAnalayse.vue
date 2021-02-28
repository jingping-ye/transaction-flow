<template>
  <div class="data-analayse">
    <div class="filter-area">
      <span
        >查询时间：<a-select v-model="query.time" style="width: 120px" @change="changeQueryTime">
          <a-select-option :value="item.value" v-for="item in queryTimeList" :key="item.value">
            {{ item.title }}
          </a-select-option>
        </a-select></span
      >
      <span style="margin-left:10px">
        板块筛选：
        <a-radio-group :options="marketTypeList" v-model="query.marketType" @change="changeMarketType"> </a-radio-group>
      </span>
    </div>
    <a-table
      :columns="columns"
      :data-source="rankList"
      :rowKey="(record) => record.stkCode"
      :pagination="pagination"
      @change="changeTable"
    >
      <template slot="idx" slot-scope="text, record, index">{{
        (pagination.current - 1) * pagination.pageSize + index + 1
      }}</template>
      <template slot="name" slot-scope="text, record"> {{ record.stkName }}({{ record.stkCode }}) </template>
    </a-table>
  </div>
</template>
<script>
//  常量声明
const queryTimeList = [
  {
    title: "1小时",
    value: "1",
  },
  {
    title: "1天",
    value: "2",
  },
  {
    title: "1周",
    value: "3",
  },
];

const columns = [
  {
    title: "#",
    dataIndex: "idx",
    scopedSlots: { customRender: "idx" },
    align: "center",
  },
  {
    title: "名称",
    dataIndex: "name",
    scopedSlots: { customRender: "name" },
    align: "center",
  },
  {
    title: "买入排名",
    dataIndex: "buyRank",
    align: "center",
  },
  {
    title: "买入组合数量（个）",
    dataIndex: "zhCount",
    align: "center",
  },
  {
    title: "卖出排名",
    dataIndex: "sellRank",
    align: "center",
  },
  {
    title: "买卖排名差",
    dataIndex: "rankDeviation",
    align: "center",
  },
  {
    title: "卖出组合数量（个）",
    dataIndex: "sellZhCount",
    align: "center",
  },
  {
    title: "买入平均价（元）",
    dataIndex: "avgPrice",
    align: "center",
  },
  {
    title: "卖出平均价（元）",
    dataIndex: "sellAvgPrice",
    align: "center",
  },
  {
    title: "最新价（元）",
    dataIndex: "newPrice",
    align: "center",
  },
];

const marketTypeList = [
  {
    value: "",
    label: "全部",
  },
  {
    value: "1",
    label: "主板",
  },
  {
    value: "2",
    label: "创业板",
  },
];
//  引入外部资源
import WapRankAPI from "@/api/rank.wap.js";
export default {
  name: "DataAnalayse",
  mixins: [],
  components: {},
  props: {},
  data() {
    return {
      //  常量
      queryTimeList,
      marketTypeList,
      columns,
      pagination: {
        current: 1,
        pageSize: 10,
        showQuickJumper: true,
        showSizeChanger: true,
        showTotal: (total) => `总共${total}记录`,
      },
      //  状态
      flag: true,
      //  变量
      query: {
        time: "2",
        marketType: "",
      },
      rankList: [],
    };
  },
  computed: {},
  watch: {},
  methods: {
    changeMarketType() {
      this.getRankAnalyseListRequest();
    },
    changeTable(pagination) {
      this.pagination = pagination;
    },
    changeQueryTime() {
      this.getRankAnalyseListRequest();
    },
    getRankAnalyseListRequest() {
      const buyMap = {
        1: "164100",
        2: "164101",
        3: "164101",
      };
      const sellMap = {
        1: "164103",
        2: "164104",
        3: "164104",
      };
      let buyParams = { rankType: buyMap[this.query.time] };
      let sellParams = { rankType: sellMap[this.query.time] };
      WapRankAPI.getRankAnalyseList(buyParams, sellParams, this.query.marketType)
        .then((res) => {
          this.rankList = res;
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
  },
  filters: {},
  created() {},
  mounted() {
    this.getRankAnalyseListRequest();
  },
  destoryed() {},
};
</script>
<style scoped>
.data-analayse {
}
.filter-area {
  margin-bottom: 10px;
}
</style>
