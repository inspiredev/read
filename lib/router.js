'use strict';

var P = require('bluebird');

exports.route = function (req, res, next, controller) {
	return P.promisify(controller)(req.params).then(function (result) {
		res.json(result);
		return next();
	}, function (err) {
		console.error(err);
		return next(err);
	});
};
