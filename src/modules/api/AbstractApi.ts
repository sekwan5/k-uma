import axios, {
  AxiosInstance,
  AxiosError,
  // AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";

export class AbstractApi {
  client: AxiosInstance;
  isLoginAlert: boolean;

  constructor(baseUrl: string) {
    this.client = axios.create();
    this.client.defaults.baseURL = baseUrl;

    this.client.interceptors.request.use(this.onRequest);
    this.client.interceptors.response.use(
      this.onResponse,
      this.onErrorResponse,
    );
    this.client.defaults.paramsSerializer = {
      indexes: null,
    };

    this.isLoginAlert = false;
  }

  logOnDev = (message: string) => {
    if (import.meta.env.MODE === "development") {
      console.log(message);
    }
  };

  onLoading = async (type: string) => {
    console.log(type);
    return Promise.resolve();
  };

  onError = async (message: string) => {
    if (import.meta.env.MODE === "development") {
      alert(message);
    }

    return Promise.resolve();
  };

  onRequest = (
    config: InternalAxiosRequestConfig,
  ): InternalAxiosRequestConfig => {
    const { method } = config;

    config.headers["X-API-Key"] = import.meta.env.VITE_API_KEY;

    if (method === "get") {
      config.params = {
        ...config.params,
        _t: Date.now(),
      };
      config.timeout = config.timeout ? config.timeout : 15000;
    }

    return config;
  };

  onResponse = (response: AxiosResponse) => {
    return response;
  };

  onErrorResponse = async (error: AxiosError | Error): Promise<AxiosError> => {
    if (axios.isAxiosError(error)) {
      // const { message, response } = error;

      // const { status } = (error.response as AxiosResponse) ?? {
      //   status: 0,
      //   statusText: "0",
      // };

      console.log(error);
    } else {
      if (import.meta.env.MODE === "development") {
        alert(`[API] | Error ${error.message}`);
      }
    }

    return Promise.reject(error);
  };
}
