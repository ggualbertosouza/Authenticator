import "reflect-metadata";
import path from "node:path";
import { Container } from "inversify";
import { Connection } from "mongoose";
import { glob } from "glob";

import Database from "./config/db";
import { __dirname } from "./utils/dirname";

import UserRepository from "./infra/repository/user";
import TokenRepository from "./infra/repository/token";

import AppServer from "./server/http";
import UserRouter from "./server/http/routes/user";
import AuthRouter from "./server/http/routes/auth";
import UserController from "./server/http/controllers/user";
import AuthMiddleware from "./server/http/middlewares/auth";
import AuthController from "./server/http/controllers/authenticate";

import UserService from "./domain/service/user/index";
import PasswordService from "./domain/service/password";
import AuthStrategy from "./domain/service/authenticate";
import EmailPasswordStrategy from "./domain/service/authenticate/emailPassword";

import AuthUseCase from "./application/useCase/authUseCase";
import TokenManager from "./domain/service/token";
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
    container.bind(AuthMiddleware).toSelf().inSingletonScope();
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
      await AppContainer.initializeModels(connection);
    } else {
      console.error("❌ Erro: Conexão com o banco não está disponível.");
    }
  }

  private static async initializeModels(connection: Connection) {
    const modelsPath = path.resolve(__dirname, "./infra/models/**/*.ts");
    const files = glob.sync(modelsPath);

    for (const file of files) {
      if (file.includes("index")) continue;

      const modelModule = await import(file);
      const modelClass = modelModule.default;

      if (modelClass?.initializeModel) modelClass.initializeModel(connection);
    }
  }
}

export default AppContainer;
