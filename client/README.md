# client

## 接口

接口说明：

- rankType：排名类型
  - 30001：买入
  - 30002: 卖出
- timePeriod 查询时间阶段
- 1: 1 小时内
- 2: 一天内
- 3: 一周内
- recIdx: 页码
- recCnt: 页记录数，只能为 50
- pc 端
  - 买入榜
    - 1 天内
      - 前 50: https://simqry2.eastmoney.com/qry_tzzh_v2?type=spo_rank_tiger&plat=2&ver=web20&rankType=30001&timePeriod=2&recIdx=1&recCnt=50
      - 后 50：https://simqry2.eastmoney.com/qry_tzzh_v2?type=spo_rank_tiger&plat=2&ver=web20&rankType=30001&timePeriod=2&recIdx=2&recCnt=50
    - 1 小时内
      - 前 50：https://simqry2.eastmoney.com/qry_tzzh_v2?type=spo_rank_tiger&plat=2&ver=web20&rankType=30001&timePeriod=1&recIdx=1&recCnt=50
      - 后 50：https://simqry2.eastmoney.com/qry_tzzh_v2?type=spo_rank_tiger&plat=2&ver=web20&rankType=30001&timePeriod=1&recIdx=2&recCnt=50
  - 卖出榜
    - 1 天内
      - 前 50:https://simqry2.eastmoney.com/qry_tzzh_v2?type=spo_rank_tiger&plat=2&ver=web20&rankType=30002&timePeriod=2&recIdx=1&recCnt=50
      - 后 50：https://simqry2.eastmoney.com/qry_tzzh_v2?type=spo_rank_tiger&plat=2&ver=web20&rankType=30002&timePeriod=2&recIdx=2&recCnt=50
    - 1 小时内
      - 前 50:https://simqry2.eastmoney.com/qry_tzzh_v2?type=spo_rank_tiger&plat=2&ver=web20&rankType=30002&timePeriod=1&recIdx=1&recCnt=50
      - 后 50：https://simqry2.eastmoney.com/qry_tzzh_v2?type=spo_rank_tiger&plat=2&ver=web20&rankType=30002&timePeriod=1&recIdx=2&recCnt=50
- 手机端
  - 买入榜
    - 1 天内
      - 前 100: q?type=get_zh_charts&rankType=164101&p=0&ps=100&v=03028454355617314
    - 1 小时内
      - 前 100：https://vipmoney.eastmoney.com/collectapi/Portfolio/SimulationRanking?type=get_zh_charts&rankType=164100&p=0&ps=100&v=09446804486485347
  - 卖出榜
    - 1 天内：
      - 前 100：https://vipmoney.eastmoney.com/collectapi/Portfolio/SimulationRanking?type=get_zh_charts&rankType=164104&p=0&ps=100&v=08254920385649824
    - 1 小时内：
      - 前 100：https://vipmoney.eastmoney.com/collectapi/Portfolio/SimulationRanking?type=get_zh_charts&rankType=164103&p=0&ps=20&v=023224110374978046
