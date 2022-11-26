import request from "/@/utils/request";
const api = {
    GetHomeCourseList: "/hr/api/TrainWork/GetHomeCourseList",
    GetHomeUserInfo: "/hr/api/TrainWork/GetHomeUserInfo",
};
// 首页最新课程 推荐课程 精品课程 列表数据
export function GetHomeCourseList(): Promise<IResponse> {
    return request({
      url: api.GetHomeCourseList,
      method: "get",
    });
  }
// 首页排行榜
export function GetHomeUserInfo(): Promise<IResponse> {
    return request({
      url: api.GetHomeUserInfo,
      method: "get",
    });
  }