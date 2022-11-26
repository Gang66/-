import { useLayoutStore } from "/@/store/modules/layout";
import axios from "axios";
import { AxiosResponse, AxiosRequestConfig } from "axios";
import { ElLoading, ElNotification } from "element-plus";

let loading: { close(): void };
let whiteList=['/hr/api/QRCode/GetQRCodeLogEntity','/hr/api/TrainWork/PostSaveStudyTime','/hr/api/TrainWork/GetPlanInfoForUser','/hr/api/TrainWork/PostSaveTestFormPaper','/hr/api/TrainWork/PostGetNextTestFromPaper']
// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: import.meta.env.VUE_APP_API_BASE_URL as string | undefined,
  timeout: 60000, // 请求超时时间
});

// 异常拦截处理器
const errorHandler = (error: { message: string; response: any }) => {
  loading.close();
  console.log(`err${error}`);
  if (Number((error.response || {}).status || 0) === 401) {
    const { getStatus, getNewToken } = useLayoutStore();
    if (getStatus.REFRESH_TOKEN) {
      // 刷新Token
      getNewToken()
        .then(() => {
          // 重新访问一次
          error.response.config.__isRetryRequest = true;
          error.response.config.headers.Authorization = `Bearer ${getStatus.ACCESS_TOKEN}`;

          // error.config 包含了当前请求的所有信息
          return axios(error.response.config);
        })
        .catch((e) => {
          console.log(`errorHandler_getNewToken${e}`);
          return Promise.reject(error);
        });
    } else {
      ElNotification({
        title: "请求失败",
        message: error.message,
        type: "error",
      });
      return Promise.reject(error);
    }
  } else {
    ElNotification({
      title: "请求失败",
      message: error.message,
      type: "error",
    });

    return Promise.reject(error);
  }
};

// 请求 request interceptor
request.interceptors.request.use((config:any) => {
  const { getStatus } = useLayoutStore();
  var isReturn=false;
  whiteList.forEach((v:any)=>{
    if(config.url.indexOf(v)!=-1)
    {
      isReturn=true;
    }
  })
  if(isReturn==false){
    loading = ElLoading.service({
      lock: true,
      text: "Loading",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.1)",
    });
  }
  const token = getStatus.ACCESS_TOKEN;
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (token) {
    // config.headers['Access-Token'] = token
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
}, errorHandler);

// 响应 response interceptor
request.interceptors.response.use((response: AxiosResponse<IResult>) => {
  const { data, config } = response;
  const { getStatus, logout, getNewToken } = useLayoutStore();
  loading.close();
  if (data.StatusCode !== 200) {
    let title = "请求失败";
    if (data.StatusCode === 401) {
      title = "身份认证失败";
      if (getStatus.REFRESH_TOKEN) {
        // 刷新Token
        getNewToken()
          .then(() => {
            // 重新访问一次
            config.headers.Authorization = `Bearer ${getStatus.ACCESS_TOKEN}`;
            // error.config 包含了当前请求的所有信息
            // return axios(config)
          })
          .catch((e) => {
            console.log(`errorHandler_getNewToken${e}`);
            ElNotification({
              title,
              message: data.Errors,
              type: "error",
            });
            return Promise.reject(new Error(data.Errors || "Error"));
          });
      } else if ((getStatus.ACCESS_TOKEN || "").length < 36) {
        logout(); //退出重新登录
      }
    } else {
      ElNotification({
        title,
        message: data.Errors,
        type: "error",
      });
      return Promise.reject(new Error(data.Errors || "Error"));
    }
  } else {
    // return data.Data
    return response;
  }
}, errorHandler);

// export default request

// 使返回格式统一，防止TS解析报错 20220412
let isInvalidToken = false;
export default function Request(params: AxiosRequestConfig): Promise<IResponse> {
  return new Promise((resolve) => {
    request(params).then((response) => {
      if (params.url.indexOf("PostRefreshToAccessToken") > -1) {
        if ((response || { data: { StatusCode: 401 } }).data.StatusCode === 200) resolve(((response || { data: {} }).data || {}).Data);
      } else {
        if (!isInvalidToken) {
          if ((response || { data: { StatusCode: 401 } }).data.StatusCode === 200) resolve(((response || { data: {} }).data || {}).Data);
          else {
            isInvalidToken = false;
            let int = setInterval(() => {
              if (!isInvalidToken) {
                request(params).then((res) => {
                  if ((res || { data: { StatusCode: 401 } }).data.StatusCode === 200) resolve(((res || { data: {} }).data || {}).Data);
                });
                window.clearInterval(int);
              }
            }, 500);
          }
        } else {
          let int = setInterval(() => {
            if (!isInvalidToken) {
              request(params).then((res) => {
                if ((res || { data: { StatusCode: 401 } }).data.StatusCode === 200) resolve(((res || { data: {} }).data || {}).Data);
              });
              window.clearInterval(int);
            }
          }, 500);
        }
      }
    });
  });
}
