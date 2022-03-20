import Application from "../Application";

export default class ViewContext {
    private app: Application;
    constructor(app: Application) {
        this.app = app;
    }
}