import { BINDINGSCOPE } from "../../@types/inverisfy";
import { Injectable } from "../../utils/inversify";
import { CreateUserInputDto } from "../dto/input/user";
import { UserOutputDto } from "../dto/output/user";

@Injectable({
  key: UserUseCase,
  scope: BINDINGSCOPE.SINGLETON,
})
class UserUseCase {
  create(user: CreateUserInputDto): Promise<UserOutputDto | null> {
    // Validar
    // 1 - Verificar se email já existe
    // 2 - Validar força da senha
    // Sanitizar
    // 1 - Remover espaços em branco
    // 2 - Normalizar email ??
    // Transformar
    const userEntity = new 
    // 1 - Criar hash da senha
    // 2 - Definir valores padrões: Role, active
    // Orquestrar
    // 1 - Chamar repository
    // 2 - Enviar email de confirmação
  }
}

export default UserUseCase;
