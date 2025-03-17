import ApiClient from "@/services";

class AuthService {
  private apiClient: ApiClient;

  constructor() {
    this.apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_URL || "");
  }

  public async login(data: { email: string; password: string }) {
    return await this.apiClient.post({
      endpoint: "/api/user/login",
      showLoading: true,
      data,
    });
  }

  public async register(data: {
    name: string;
    email: string;
    password: string;
  }) {
    return this.apiClient.post({
      endpoint: "/api/user/signup",
      showLoading: true,
      data,
    });
  }
}

export default AuthService;
