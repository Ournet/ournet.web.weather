
import homeRoute from './home'
import widgetRoute from './widget'
import { Express } from 'express'

export default function (app: Express) {
    app.use(homeRoute);
    app.use(widgetRoute);
}
