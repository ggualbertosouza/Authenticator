import "reflect-metadata";

import AppContainer from "./container";
import AppServer from "./server/http";
import CronJobManager from "./domain/service/cron";

const container = await AppContainer.getInstance();

const server = container.get(AppServer);
const crons = container.get(CronJobManager);

await server.start();
server.listen();

crons.startAlljobs();
crons.listJobs();
