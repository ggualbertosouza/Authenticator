import cron from "node-cron";
import { Injectable } from "../../presentation/https/utils/inversify";

@Injectable({ key: CronJobManager })
class CronJobManager {
  private jobs: Map<string, cron.ScheduledTask>;

  constructor() {
    this.jobs = new Map();
  }

  public addJob(
    id: string,
    schedule: string,
    task: () => void,
    runOnInit: boolean = false,
  ) {
    if (this.jobs.has(id)) {
      console.error(`Job already running ${id}`);
      return;
    }

    const job = cron.schedule(schedule, task, { runOnInit });
    this.jobs.set(id, job);
    console.info(`Job ${id} scheduled!`);
  }

  public removeJob(id: string) {
    const job = this.jobs.get(id);

    if (job) {
      job.stop();
      this.jobs.delete(id);
      console.info(`Job ${id} removed!`);
      return;
    }

    console.error(`Job ${id} not found!`);
  }

  public listJobs(): string[] {
    return Array.from(this.jobs.keys());
  }

  public startAlljobs(): void {
    this.jobs.forEach((job) => job.start());
    console.info("All jobs are running!");
  }

  public stopAllJobs() {
    this.jobs.forEach((job) => job.stop());
    console.info("All jobs are stopped!");
  }
}

export default CronJobManager;
