/**
 * Title: rank
 * Author: jingping.ye
 * Date: 2021-02-26 17:04:37
 * Description: 移动版排行
 * LastModifiedDate:2021-02-26 17:04:37
 * LastModifiedDescription: 移动版排行 1天和1日
 */
import http from "axios";

const prefix = "https://vipmoney.eastmoney.com"; // 可以在此处写"v1/"，自动拼接路径
const api = {
  list: `${prefix}/collectapi/Portfolio/SimulationRanking`,
};

/**
 * 获取排行列表
 * @param {object} argsParams
 * @param {number} argsParams.rankType  164100-买入时|164101-买入天[default]|164101-买入周|164103-卖出时|164104-卖出天|164104-卖出周
 * @param {number} argsParams.ps 默认100条
 * @note 备注
 * @usage 使用示例
 */
function getRankList(argsParams = {}) {
  return http
    .get(api.list, {
      params: {
        type: "get_zh_charts",
        rankType: 164101,
        p: 0,
        ps: 100,
        v: "03028454355617314",
        ...argsParams,
      },
    })
    .then((res) => {
      return Promise.resolve(res);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

function getRankAnalyseList(buyParams, sellParams, marketType) {
  return Promise.all([
    http.get(api.list, {
      params: {
        type: "get_zh_charts",
        rankType: 164101,
        p: 0,
        ps: 100,
        v: "03028454355617314",
        ...buyParams,
      },
    }),
    http.get(api.list, {
      params: {
        type: "get_zh_charts",
        rankType: 164101,
        p: 0,
        ps: 100,
        v: "03028454355617314",
        ...sellParams,
      },
    }),
  ])
    .then(([res1, res2]) => {
      let buyList = res1.data.listData;
      let sellList = res2.data.listData;
      let buyMap = {};
      buyList.forEach((item, index) => {
        buyMap[item.stkCode] = {
          ...item,
          buyRank: index + 1,
          sellRank: 0,
          sellZhCount: 0,
          rankDeviation: -9999,
          sellAvgPrice: 0,
        };
      });
      sellList.forEach((item, index) => {
        if (buyMap[item.stkCode]) {
          buyMap[item.stkCode]["sellRank"] = index + 1;
          buyMap[item.stkCode]["sellZhCount"] = item.zhCount;
          buyMap[item.stkCode]["rankDeviation"] = buyMap[item.stkCode]["buyRank"] - buyMap[item.stkCode]["sellRank"];
          buyMap[item.stkCode]["sellAvgPrice"] = item.avgPrice;
        }
      });
      let rankList = Object.values(buyMap);
      rankList.sort((a, b) => a.rankDeviation - b.rankDeviation);

      if (marketType == "1") {
        rankList = rankList.filter((item) => item.stkCode.startsWith("0") || item.stkCode.startsWith("6"));
      } else if (marketType == "2") {
        rankList = rankList.filter((item) => item.stkCode.startsWith("3"));
      }
      return Promise.resolve(rankList);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}
export default {
  getRankList,
  getRankAnalyseList,
};
