
import { renderToStaticMarkup } from 'react-dom/server';
import { ReactElement } from 'react';
import { Response } from 'express';
import { IPageViewModel } from './view-models/page-view-model';

function render<P extends IPageViewModel>(Page: ReactElement<P>) {
    const stream = renderToStaticMarkup(Page);
    return stream;
}

export function renderPage<P extends IPageViewModel>(res: Response, node: ReactElement<P>) {
    // const html = `<!DOCTYPE html>${render(node)}`;
    let result = render(node);
    result = '<!DOCTYPE html>' + result;
    // stream.pipe(res);
    res.send(result);
}
