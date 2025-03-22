import "reflect-metadata";
import path from "node:path";
import { Container } from "inversify";
import { Connection } from "mongoose";
import { glob } from "glob";

import Database from "./config/db";
import { __dirname } from "./utils/dirname";
import { registeredDependencies } from "./utils/inversify";
import { BINDINGSCOPE, METADATA } from "./@types/inverisfy";

class AppContainer {
  private static instance: Container;

  public static async getInstance(): Promise<Container> {
    if (!AppContainer.instance) {
      const container = new Container();

      await AppContainer.injectDependecies(container, registeredDependencies);
      await AppContainer.loadDb(container);
      AppContainer.instance = container;
    }

    return AppContainer.instance;
  }

  private static async injectDependecies(
    container: Container,
    registeredDependencies: any[]
  ): Promise<void> {
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
