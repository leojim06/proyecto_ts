import { App } from './config/express'
import { Config } from './config/config'

const app = new App();

app.startServer(Config.PORT);