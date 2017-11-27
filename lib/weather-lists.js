
const getConfig = require('./config');
const utils = require('./utils');

exports.getPaths = function () {
    return utils.SUPPORTED_COUNTRIES.map(country => getConfig(country).lists).filter(lists => !!lists)
        .reduce((result, lists) => {
            lists.forEach(list => result.push(list.id));
            return result;
        }, []).filter((v, i, a) => a.indexOf(v) === i).join('|');
}

exports.getList = function (country, id) {
    const config = getConfig(country);
    return config && config.lists && config.lists.find(list => list.id === id);
}
