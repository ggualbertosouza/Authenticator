import useLoadingStore from "@/store/loading";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { toast } from "sonner";

type requestProps = {
  method: "get" | "post" | "put" | "patch" | "delete";
  endpoint: string;
  data?: any;
  config?: AxiosRequestConfig;
  showLoading: boolean;
};

class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.initializeInterceptors();
  }

  private initializeInterceptors() {
    const requestSuccess = (config: InternalAxiosRequestConfig) => {
      return config;
    };
    const requestFail = (error: AxiosError) => {
      return Promise.reject(error);
    };

    const responseSuccess = (response: AxiosResponse) => {
      return response;
    };
    const responseFail = (error: AxiosError) => {
      this.handleError(error);
      return Promise.reject(error);
    };

    this.axiosInstance.interceptors.request.use(requestSuccess, requestFail);
    this.axiosInstance.interceptors.response.use(responseSuccess, responseFail);
  }

  private handleError(error: AxiosError) {
    if (error.request) return toast.error("Check your connection");

    if (error.response) {
      const { data } = error.response;
      const message = (data as any).message || "Something went wrong!";

      return toast.error(message);
    }

    toast.error("Request error");
  }

  private async request<T>({
    method,
    endpoint,
    data,
    config,
    showLoading = false,
  }: requestProps): Promise<T> {
    try {
      if (showLoading) useLoadingStore.getState().setLoading(true);

      const response = await this.axiosInstance.request<T>({
        method,
        url: endpoint,
        data,
        ...config,
      });

      return response.data;
    } catch (error) {
      throw error;
    } finally {
      if (showLoading) useLoadingStore.getState().setLoading(false);
    }
  }

  public async get<T>({
    endpoint,
    showLoading,
    config,
    data,
  }: Omit<requestProps, "method">) {
    return this.request({ method: "get", endpoint, data, config, showLoading });
  }

  public async post<T>({
    endpoint,
    showLoading,
    config,
    data,
  }: Omit<requestProps, "method">) {
    return this.request({
      method: "post",
      endpoint,
      data,
      config,
      showLoading,
    });
  }

  public async put<T>({
    endpoint,
    showLoading,
    config,
    data,
  }: Omit<requestProps, "method">) {
    return this.request({
      method: "put",
      endpoint,
      data,
      config,
      showLoading,
    });
  }

  public async patch<T>({
    endpoint,
    showLoading,
    config,
    data,
  }: Omit<requestProps, "method">) {
    return this.request({
      method: "patch",
      endpoint,
      data,
      config,
      showLoading,
    });
  }

  public async delete<T>({
    endpoint,
    showLoading,
    config,
  }: Omit<requestProps, "method" | "data">) {
    return this.request({
      method: "delete",
      endpoint,
      config,
      showLoading,
    });
  }
}

export default ApiClient;
