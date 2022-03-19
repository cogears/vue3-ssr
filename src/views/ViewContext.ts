import Application from "../main";

export default class ViewContext {
    private app: Application;
    constructor(app: Application) {
        this.app = app;
    }
}