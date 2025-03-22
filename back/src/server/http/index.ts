import "reflect-metadata";
import cors from "cors";
import http from "node:http";
import cookieParser from "cookie-parser";
import { Injectable } from "../../utils/inversify";
import express, { Express } from "express";

import i18n from "../../config/i18n";
import { SERVER } from "../../config";
import AppContainer from "../../container";
import UserRouter from "./routes/user";
import { ErrorHandler } from "./middlewares/errorHandler";

import AuthRouter from "./routes/auth";
import { BINDINGSCOPE } from "../../@types/inverisfy";


@Injectable({
  key: AppServer,
  scope: BINDINGSCOPE.SINGLETON,
})
class AppServer {
  private app: Express;
  private server: http.Server | null = null;

  constructor() {
    this.app = express();
  }

  public async start() {
    const container = await AppContainer.getInstance();

    this.app.use(
      cors({
        origin: ["*", "http://localhost:3000"],
        credentials: true,
      })
    );
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(i18n.init);

    const userRouter = container.get(UserRouter).load();
    const authRouter = container.get(AuthRouter).load();
    this.app.use(userRouter);
    this.app.use(authRouter);

    this.app.use(ErrorHandler);
    this.server = http.createServer(this.app);
  }

  public listen() {
    if (!this.server) return;

    this.server.listen(SERVER.PORT, () => {
      console.info(`Server running at: ${SERVER.HOSTNAME}:${SERVER.PORT}`);
    });
  }

  public closeServer(): void {
    if (this.server) this.server.close();
  }
}

export default AppServer;
