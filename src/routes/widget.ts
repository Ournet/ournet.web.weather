
import { Router } from 'express';
import { RootModelBuilder, RootViewModel } from '../view-models/root-view-model';
import { getHost } from 'ournet.links';
import { widget1FrameHandler } from '../controllers/widgets-controller';

const route: Router = Router();

export default route;

route.get('/widget/widget_frame', (req, res, next) =>
    widget1FrameHandler({
        req,
        res,
        bkcolor: req.query.bkcolor,
        days: parseInt(req.query.days),
        htcolor: req.query.htcolor,
        id: req.query.id,
        hbkcolor: req.query.hbkcolor,
        bcolor: req.query.bcolor,
        lcolor: req.query.lcolor,
        textcolor: req.query.textcolor,
        w: parseInt(req.query.w),
    }, next));

route.get('/widget/widget_html_script', function (req, res) {
    const model = new RootModelBuilder({ req, res }).build() as RootViewModel;
    const { config, links, country, project } = model;

    const days = req.query.days && parseInt(req.query.days) || 5,
        height = 29 + days * 42 + days - 1,
        width = req.query.w;
    const scripttype = req.query.scripttype;

    delete req.query.scripttype;

    const data = ['<!-- ' + config.name + ' Weather Widget -->'];

    const host = getHost(project, country);

    if (scripttype === 'iframe') {
        data.push('<iframe src="' + host + links.weather.widget.widgetFrame(req.query) + '" scrolling="no" frameborder="0" style="border:none;overflow:hidden;height:' + height + 'px;width:' + width + 'px;" allowTransparency="true"></iframe>');
        data.push('<noscript><a href="http://' + host + '">' + config.name + '</a></noscript>');
    } else {

        let params = [];

        // req.query.height = height;

        for (var prop in req.query) {
            if (![null, '', undefined].includes(req.query[prop])) {
                params.push(prop + '=' + req.query[prop]);
            }
        }

        data.push('<ins class="ournetweather" style="display:block;max-width:' + width + 'px;height:' + height + 'px" data-type="widget" data-cn="' + country + '" data-params="' + params.join(';') + '" data-h="' + height + '"></ins>');
        data.push('<noscript><a href="http://' + host + '">' + config.name + '</a></noscript>');
        data.push('<script>(ournetweather=window.ournetweather||[]).push({})</script>');
        data.push('<script async src="//assets.ournetcdn.net/ournet/js/weather/widget-ins.js"></script>');
    }

    res.send(data.join('\n'));
});