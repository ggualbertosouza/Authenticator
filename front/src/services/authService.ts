import ApiClient from "@/services";

class AuthService {
  private apiClient: ApiClient;

  constructor() {
    this.apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_URL || "");
  }

  public async login(data: { email: string; password: string }) {
    const user = this.apiClient.post({
      endpoint: "/api/user/login",
      showLoading: true,
      data,
    });

    // Criar estado global com zustand para salvar accessToken
    // tanto o estado quanto a função que setta o estado
    // Na classe de requisição, verificar antes de qualquer req se existe salvo no estado global o access Token
    //se existir adicionar
    console.log(user);
  }

  public async register(data: {
    name: string;
    email: string;
    password: string;
  }) {
    const user = this.apiClient.post({
      endpoint: "/api/user/signup",
      showLoading: true,
      data,
    });

    console.log(user);
  }
}

export default AuthService;
