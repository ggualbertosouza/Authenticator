import { interfaces } from "inversify";

export enum METADATA {
  INJECTABLE = "injectable:bind",
}

export enum BINDINGSCOPE {
  SINGLETON = "Singleton",
  TRANSIENT = "Transient",
  REQUEST = "Request",
}

export type CustomInjectable = {
  key: string | symbol | interfaces.Newable<any> | interfaces.Abstract<any>;
  name?: string | number | symbol;
  scope?: BINDINGSCOPE | interfaces.BindingScope;
};
