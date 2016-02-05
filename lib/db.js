'use strict';

var simpleFetch = require('simple-fetch');
var getJson = simpleFetch.getJson;
var postJson = simpleFetch.postJson;
var putJson = simpleFetch.putJson;

var dbPath = process.env.COUCHDB + 'read/';

module.exports = {
	get: function (entity) {
		return getJson(dbPath + entity || '');
	}
}
// var mongod = require('mongod');
// var DBURL = 'mongodb://mongodb:27017/read';

// module.exports = mongod(DBURL);
