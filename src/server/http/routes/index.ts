import { Router } from "express";

abstract class AbstractRouter {
	protected router: Router;

	constructor() {
		this.router = Router();
	}

	protected abstract initializeRoute(): void;

	public load() {
		return this.router;
	}
}

export default AbstractRouter;
