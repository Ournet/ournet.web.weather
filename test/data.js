'use strict';

const Data = require('../lib/data/index');
const assert = require('assert');

describe('data', function() {

	it('get exchange data', function() {
		return Data.get({
				source: ['exchangeSource', { country: 'md', sourceId: 2 }],
				rates: ['widgetExchangeRates', { keys: ['MD2017-01-11EUR2', 'MD2017-01-11USD2'] }]
			})
			.then(result => {
				// console.log(result);
				assert.ok(result);
				assert.ok(result.source);
				assert.ok(result.rates);
				assert.equal(2, result.rates.length);
			});
	});

});
