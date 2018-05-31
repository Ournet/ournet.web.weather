
import { renderToStaticNodeStream } from 'react-dom/server';
import { ReactElement } from 'react';
import { Response } from 'express';
import { PageViewData } from './view-data/page';

export function render<P extends PageViewData>(Page: ReactElement<P>) {
    const stream = renderToStaticNodeStream(Page);
    return stream;
}

export function renderPage<P extends PageViewData>(res: Response, node: ReactElement<P>) {
    // const html = `<!DOCTYPE html>${render(node)}`;
    res.write('<!DOCTYPE html>');
    const stream = render(node);
    stream.pipe(res);
    // res.send(html);
}
