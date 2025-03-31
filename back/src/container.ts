import "reflect-metadata";
import { glob } from "glob";
import path from "node:path";
import { Container } from "inversify";
import { Connection } from "mongoose";

import Database from "./config/db";
import { __dirname } from "./utils/dirname";
import { registeredDependencies } from "./utils/inversify";
import { BINDINGSCOPE, METADATA } from "./@types/inverisfy";
import AuthStrategy, { AuthStrategies } from "./domain/service/authenticate";
import EmailPasswordStrategy from "./domain/service/authenticate/emailPassword";
import AzureAuthService from "./domain/service/authenticate/azure";

class AppContainer {
  private static instance: Container;

  public static async getInstance(): Promise<Container> {
    if (!AppContainer.instance) {
      const container = new Container();

      AppContainer.injectDependecies(container, registeredDependencies);
      await AppContainer.loadDb(container);
      AppContainer.instance = container;
    }

    return AppContainer.instance;
  }

  private static injectDependecies(
    container: Container,
    registeredDependencies: any[]
  ): void {
    for (const module of registeredDependencies) {
      const bindingMetadata = Reflect.getMetadata(METADATA.INJECTABLE, module);

      if (bindingMetadata) {
        const { key, name, scope } = bindingMetadata;

        const binding = container.bind(key).to(module);
        if (name) binding.whenTargetNamed(name);
        if (scope) {
          switch (scope) {
            case BINDINGSCOPE.SINGLETON:
              binding.inSingletonScope();
              break;
            case BINDINGSCOPE.REQUEST:
              binding.inRequestScope();
              break;
            case BINDINGSCOPE.TRANSIENT:
              binding.inTransientScope();
              break;
            default:
              binding.inSingletonScope();
              break;
          }
        }
      }
    }

    container
      .bind(AuthStrategies.EMAILPASSWORD)
      .to(EmailPasswordStrategy)
      .inSingletonScope();

    container
      .bind(AuthStrategies.AZURE)
      .to(AzureAuthService)
      .inSingletonScope();

    container
      .bind(AuthStrategy)
      .toFactory((context) => (strategy: AuthStrategies) => {
        return context.container.get(strategy);
      });
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
