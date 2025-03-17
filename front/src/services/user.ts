import ApiClient from "@/services";

class UserService {
  private apiClient: ApiClient;

  constructor() {
    this.apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_URL || "");
  }

  public async getUser() {
    return await this.apiClient.get({
      endpoint: "/api/user",
      showLoading: true,
    });
  }
}
