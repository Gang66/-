/*
 * @Author: ZHJ
 * @Date: 2022-06-30 10:08:10
 * @LastEditTime: 2022-08-10 09:38:13
 * @LastEditors: ZHJ
 * @Description: 
 * @FilePath: \beifangrenzixitong\src\api\hr\Home.ts
 * 版权声明
 */
import request from "/@/utils/request";
const api = {
    GetRankingsList: "/hr/api/HomePage/GetRankingsList",
};
   // 获取人事系统首页排行榜数据
export function GetRankingsList(): Promise<IResponse> {
    return request({
      url: api.GetRankingsList,
      method: "get",
    });
  }