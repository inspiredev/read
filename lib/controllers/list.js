'use strict';

var db = require('../db');
var restify = require('restify');
var nano = require('nano')(process.env.COUCHDB);

var noListError = new restify.errors.ResourceNotFoundError('No such list was found');

exports.showAll = function (params, callback) {
	var lists = nano.use('lists');
	lists.list(function (err, body) {
		if (err) {
			return callback(err);
		}
		callback(null, body.rows);
	});
};

exports.showList = function (params) {
	var lists = nano.use('lists');
	return db.collection('lists').findOne({name: params.list}).then(function (list) {
		if (!list) {
			throw noListError;
		}
		return db.collection(params.list).find().sort({timestamp: -1}).then(function (articles) {
			list.articles = articles;
			return list;
		});
	});
};

exports.newList = function (params) {
	var newList = {
		name: params.name,
		tags: [],
		users: []
	};

	return db.collection('lists').insert(newList);
};
