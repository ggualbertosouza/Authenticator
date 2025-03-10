import "reflect-metadata";
import cors from "cors";
import http from "node:http";
import cookieParser from "cookie-parser";
import { injectable } from "inversify";
import express, { Express } from "express";

import i18n from "../../config/i18n";
import { SERVER } from "../../config";
import AppContainer from "../../container";
import UserRouter from "./routes/user";
import { ErrorHandler } from "./middlewares/errorHandler";

import { NODE_ENV } from "../../config";
import AuthRouter from "./routes/auth";

@injectable()
class AppServer {
  private app: Express;
  private server: http.Server | null = null;

  constructor() {
    this.app = express();
  }

  public async start() {
    const container = await AppContainer.getInstance();

    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(i18n.init);
    this.setupCors();

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

  private setupCors() {
    // Domínios permitidos - Prod
    const allowedProdOrigins = [""];

    // Domínios permitidos - Dev
    const allowedDevOrigins = [
      `http://${SERVER.HOSTNAME}:${SERVER.PORT}`,
      `http://127.0.0.1:${SERVER.PORT}`,
      "http://localhost:2300",
      "*",
    ];

    const isOriginAllowed = (
      origin: string | undefined,
      allowedOrigins: string[]
    ): boolean => {
      return !origin || allowedOrigins.includes(origin);
    };

    this.app.use(
      cors({
        origin: "*",
        // origin: (
        //   origin: string | undefined,
        //   callback: (err: Error | null, allow?: boolean) => void
        // ) => {
        //   if (
        //     NODE_ENV === "development" &&
        //     isOriginAllowed(origin, allowedDevOrigins)
        //   ) {
        //     return callback(null, true);
        //   }

        //   if (
        //     NODE_ENV === "production" &&
        //     origin &&
        //     allowedProdOrigins.includes(origin)
        //   ) {
        //     return callback(null, true);
        //   }

        //   callback(new Error("Not allowed by CORS"));
        // },
        // methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        // allowedHeaders: [
        //   "Origin",
        //   "X-Requested-With",
        //   "Content-Type",
        //   "Accept",
        //   "Authorization",
        // ],
        // credentials: true,
        // preflightContinue: false,
        // optionsSuccessStatus: 204,
      })
    );
  }
}

export default AppServer;
