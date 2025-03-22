import "reflect-metadata";

import { interfaces } from "inversify";

import { __dirname } from "./dirname";
import { METADATA, CustomInjectable } from "../@types/inverisfy";

export const registeredDependencies: Array<interfaces.Newable<any>> = [];

export function Injectable(options: CustomInjectable) {
  return function (constructor: any) {
    registeredDependencies.push(constructor);

    Reflect.defineMetadata(METADATA.INJECTABLE, options, constructor);
    return constructor;
  };
}
