import mongoose, { Connection } from "mongoose";
import { injectable } from "inversify";

import { DB_STRING } from ".";

@injectable()
class Database {
	private instance: Connection | null = null;

	public async connect(): Promise<void> {
		try {
			await mongoose.connect(DB_STRING);

			this.instance = mongoose.connection;
			console.log("✅ MongoDB connected successfully!");

			this.setupEvents();
		} catch (error) {
			console.error("❌ MongoDB connection error:", error);
			throw error;
		}
	}

	public async disconnect() {
		if (!this.instance) console.info("Mongodb already disconnected!");

		await mongoose.disconnect();
		console.log("MongoDB Disconnected!");
	}

	private async setupEvents() {
		if (!this.instance) {
			console.error("Database is down");
		}

		this.instance?.on("connected", () => {
			console.info("Mongoose connected to database");
		});

		this.instance?.on("error", (err) => {
			console.error("Mongoose error:", err);
		});

		this.instance?.on("disconnected", () => {
			console.info("Mongoose disconnected to database");
		});

		process.on("SIGINT", async () => {
			await mongoose.disconnect();
			process.exit(0);
		});
	}

	public getConnection(): Connection | null {
		return this.instance;
	}
}

export default Database;
