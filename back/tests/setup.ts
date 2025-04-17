import dotenv from "dotenv";

import AppContainer from "../src/container";
import AppServer from "../src/server/http/index";

dotenv.config({
  path: ".env.test",
});

declare global {
  var __SERVER__: AppServer;
}

before(async () => {
  const container = await AppContainer.getInstance();
  const server = container.get(AppServer);

  await server.start();
  server.listen();

  global.__SERVER__ = server;
});
