import { Request } from "express";

export type ClientInfo = {
    device: ClientDevice,
}

export enum ClientDevice {
    desktop = 'desktop',
    mobile = 'mobile',
    tablet = 'tablet',
}

export function initClient(req: Request) {
    const client: ClientInfo = {
        device: initClientDevice(req),
    }

    return client;
}

export function initClientDevice(req: Request): ClientDevice {
    const name = req.header('X-Device');
    switch (name) {
        case 'mobile': return ClientDevice.mobile;
        case 'tablet': return ClientDevice.tablet;
    }
    return ClientDevice.desktop;
}
