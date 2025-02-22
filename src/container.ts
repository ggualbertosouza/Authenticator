import "reflect-metadata";
import { Container } from "inversify";

import AppServer from "./server/http";
import Database from "./config/db";

import UserRouter from "./server/http/routes/user";
import UserController from "./server/http/controllers/user";
import UserService from "./domain/service/user";
import UserRepository from "./infra/repository/user";

import { User } from "./infra/models/user";
import PasswordService from "./domain/service/password";
import TokenManager from "./domain/service/token";
import AuthUseCase from "./application/useCase/authUseCase";
import AuthController from "./server/http/controllers/authenticate";
import AuthRouter from "./server/http/routes/auth";
import AuthStrategy from "./domain/service/authenticate";
import EmailPasswordStrategy from "./domain/service/authenticate/emailPassword";
import TokenRepository from "./infra/repository/token";
import { RefreshToken } from "./infra/models/token";
import CronJobManager from "./domain/service/cron";

class AppContainer {
  private static instance: Container;

  public static async getInstance(): Promise<Container> {
    if (!AppContainer.instance) {
      const container = new Container();

      AppContainer.setup(container);
      await AppContainer.loadDb(container);
      AppContainer.instance = container;
    }

    return AppContainer.instance;
  }

  private static async setup(container: Container): Promise<void> {
    container.bind(AppServer).toSelf().inSingletonScope();
    container.bind(Database).toSelf().inSingletonScope();

    // User
    container.bind(UserRouter).toSelf().inSingletonScope();
    container.bind(UserController).toSelf().inSingletonScope();
    container.bind(UserService).toSelf().inSingletonScope();
    container.bind(UserRepository).toSelf().inSingletonScope();

    // Authentication
    container.bind(AuthUseCase).toSelf().inSingletonScope();
    container.bind(AuthStrategy).toSelf().inSingletonScope();
    container.bind(EmailPasswordStrategy).toSelf().inSingletonScope();
    container.bind(AuthRouter).toSelf().inSingletonScope();
    container.bind(AuthController).toSelf().inSingletonScope();

    // Password
    container.bind(PasswordService).toSelf().inSingletonScope();

    // Token
    container.bind(TokenManager).toSelf().inSingletonScope();
    container.bind(TokenRepository).toSelf().inSingletonScope();

    // Utils
    container.bind(CronJobManager).toSelf().inSingletonScope();
  }

  private static async loadDb(container: Container): Promise<void> {
    const database = container.get(Database);
    await database.connect();

    const connection = database.getConnection();

    if (connection) {
      User.initializeModel(connection);
      RefreshToken.initializeModel(connection);
    } else {
      console.error("❌ Erro: Conexão com o banco não está disponível.");
    }
  }
}

export default AppContainer;
