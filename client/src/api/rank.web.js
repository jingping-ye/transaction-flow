/**
 * Title: rank.web
 * Author: jingping.ye
 * Date: 2021-02-28 14:19:20
 * Description: 网络版排名
 * LastModifiedDate:2021-02-28 14:19:20
 * LastModifiedDescription: 网络版排名
 */
import http from "axios";

const prefix = "https://simqry2.eastmoney.com"; // 可以在此处写"v1/"，自动拼接路径
const api = {
  list: `${prefix}/qry_tzzh_v2`,
};

/**
 * 获取列表
 * @param {object} argsParams
 * @param {number} argsParams.isDelete 是否删除状态 0-正常[default]|1-删除
 * @param {number} argsParams.recIdx 页码 1-[default]
 * @param {number} argsParams.timePeriod 时间类型 1-小时|2-天[default]
 * @param {number} argsParams.rankType 排名类型 30001-买入[default]|30002-卖出
 * @note 备注
 * @usage 使用示例
 */
function getRankList(argsParams = {}) {
  return http
    .get(api.list, {
      params: {
        type: "spo_rank_tiger",
        plat: 2,
        ver: "web",
        rankType: "30001",
        timePeriod: 2,
        recIdx: 1,
        recCnt: 2,
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

export default {
  getRankList,
};
