import axios from "axios";
import { Loading, Message } from "element-ui";
import router from "../router";

let loading;

function startLoading() {
  loading = Loading.service({
    lock: true,
    text: "拼命加载中...",
    background: "rgba(0,0,0,.7)",
  });
}

function endLoading() {
  loading.close();
}

// 请求拦截
axios.interceptors.request.use(
  (config) => {
    startLoading();
    if (localStorage.authorization) {
      config.headers.authorization = localStorage.authorization;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截
axios.interceptors.response.use(
  (config) => {
    endLoading();
    return config;
  },
  (error) => {
    endLoading();
    const { status } = error.response;
    if (status === 401) {
      Message.error("token失效，请重新登录");
      localStorage.removeItem("authorization");
      router.push("/login");
    }
    return Promise.reject(error);
  }
);

export default axios;
