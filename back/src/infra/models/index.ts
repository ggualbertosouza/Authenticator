import { getModelForClass } from "@typegoose/typegoose";
import { Model, Connection } from "mongoose";

abstract class BaseModel<T> {
  private static models: Map<string, Model<any>> = new Map();

  public static initializeModel<T>(
    this: new () => T,
    connection: Connection
  ): Model<T> {
    const modelName = this.name;

    if (!BaseModel.models.has(modelName)) {
      const model = getModelForClass(this, {
        existingConnection: connection,
        schemaOptions: { timestamps: true },
      });

      BaseModel.models.set(modelName, model);
    }

    return BaseModel.models.get(modelName) as Model<T>;
  }

  public static getModel<T>(this: new () => T): Model<T> {
    const modelName = this.name;
    if (!BaseModel.models.has(modelName)) {
      throw new Error(
        `Model ${modelName} has not been initialized. Call initializeModels first.`
      );
    }
    return BaseModel.models.get(modelName) as Model<T>;
  }
}

export default BaseModel;
