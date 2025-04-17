import AppContainer from "../src/container";
import AppServer from "../src/server/http/index";

export default async () => {
  const container = await AppContainer.getInstance();
  const server = container.get(AppServer);
  server.closeServer();
};
