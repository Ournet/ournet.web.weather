'use strict';

var utils = require('../utils');
var randomInt = utils.randomInt;
var _ = utils._;

var IMAGES = [{
	id: 'winter-1',
	forecast: 1,
	season: 'winter'
}];

var IMAGES_SIZES = {
	'winter-1': [{
		small: 'https://c2.staticflickr.com/2/1566/24098165594_baac728913.jpg',
		medium: 'https://c2.staticflickr.com/2/1566/24098165594_baac728913_c.jpg',
		large: 'https://c2.staticflickr.com/2/1566/24098165594_baac728913_b.jpg',
		xlarge: 'https://c2.staticflickr.com/2/1566/24098165594_6859281ddc_h.jpg',
		xxlarge: 'https://c2.staticflickr.com/2/1566/24098165594_b39d46e1b8_k.jpg'
	}]
};

exports.get = function(options) {
	var images = _.filter(IMAGES, options);
	var image = randomInt(0, images.length);
	image = images[image];
	var sizes = IMAGES_SIZES[image.id];
	var size = randomInt(0, sizes.length);
	size = sizes[size];

	return size;
};
