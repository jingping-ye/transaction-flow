<template>
  <div class="sell-buy-billboard">
    <div class="filter-area">
      查询时间：<a-select v-model="query.time" style="width: 120px" @change="changeQueryTime">
        <a-select-option :value="item.value" v-for="item in queryTimeList" :key="item.value">
          {{ item.title }}
        </a-select-option>
      </a-select>
    </div>
    <a-row :gutter="16">
      <a-col class="gutter-row" :span="12">
        <a-card title="买入榜">
          <a-table
            :columns="buyColumns"
            :data-source="buyList"
            :rowKey="(record) => record.stkCode"
            :pagination="buyPagination"
            @change="changeBuyTable"
          >
            <template slot="idx" slot-scope="text, record, index">{{
              (buyPagination.current - 1) * buyPagination.pageSize + index + 1
            }}</template>
            <template slot="name" slot-scope="text, record"> {{ record.stkName }}({{ record.stkCode }}) </template>
          </a-table>
        </a-card>
      </a-col>
      <a-col class="gutter-row" :span="12">
        <a-card title="卖出榜">
          <a-table
            :columns="sellColumns"
            :data-source="sellList"
            :rowKey="(record) => record.stkCode"
            :pagination="sellPagination"
            @change="changeSellTable"
          >
            <template slot="idx" slot-scope="text, record, index">{{
              (sellPagination.current - 1) * sellPagination.pageSize + index + 1
            }}</template>
            <template slot="name" slot-scope="text, record"> {{ record.stkName }}({{ record.stkCode }}) </template>
          </a-table>
        </a-card>
      </a-col>
    </a-row>
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

const buyColumns = [
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
    title: "买入组合数量（个）",
    dataIndex: "zhCount",
    align: "center",
  },
  {
    title: "买入平均价（元）",
    dataIndex: "avgPrice",
    align: "center",
  },
  {
    title: "最新价（元）",
    dataIndex: "newPrice",
    align: "center",
  },
];

const sellColumns = [
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
    title: "卖出组合数量（个）",
    dataIndex: "zhCount",
    align: "center",
  },
  {
    title: "卖出平均价（元）",
    dataIndex: "avgPrice",
    align: "center",
  },
  {
    title: "最新价（元）",
    dataIndex: "newPrice",
    align: "center",
  },
];

//  引入外部资源
import WapRankAPI from "@/api/rank.wap.js";
export default {
  name: "SellBuyBillboard",
  mixins: [],
  components: {},
  props: {},
  data() {
    return {
      //  常量
      queryTimeList,
      buyColumns,
      sellColumns,
      buyPagination: {
        current: 1,
        pageSize: 10,
        showQuickJumper: true,
        showSizeChanger: true,
      },
      sellPagination: {
        current: 1,
        pageSize: 10,
        showQuickJumper: true,
        showSizeChanger: true,
      },
      //  状态
      //  变量
      query: {
        time: "2",
      },
      buyList: [],
      sellList: [],
    };
  },
  computed: {},
  watch: {},
  methods: {
    changeBuyTable(sellPagination) {
      this.buyPagination = sellPagination;
    },
    changeSellTable(sellPagination) {
      this.sellPagination = sellPagination;
    },
    changeQueryTime() {
      this.getBuyRankRequest();
      this.getSellRankRequest();
    },
    /***
     * HTTP REQEUST
     * 获取买入排名
     */
    getBuyRankRequest() {
      const buyMap = {
        1: "164100",
        2: "164101",
        3: "164101",
      };
      const params = {
        rankType: buyMap[this.query.time],
      };
      WapRankAPI.getRankList(params)
        .then((res) => {
          this.buyList = res.data.listData;
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
    /***
     * HTTP REQUEST
     * 获取卖出排名
     */
    getSellRankRequest() {
      const sellMap = {
        1: "164103",
        2: "164104",
        3: "164104",
      };
      const params = {
        rankType: sellMap[this.query.time],
      };
      WapRankAPI.getRankList(params)
        .then((res) => {
          this.sellList = res.data.listData;
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
  },
  filters: {},
  created() {},
  mounted() {
    this.getSellRankRequest();
    this.getBuyRankRequest();
  },
  destoryed() {},
};
</script>
<style scoped>
.sell-buy-billboard {
}
.filter-area {
  margin-bottom: 10px;
}
</style>
