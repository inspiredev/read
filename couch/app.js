// 'use strict';

var ddoc = {
	_id: '_design/read',
	views: {}
};

ddoc.views.listByName = {
	map: function (doc) {
		if (doc.type === 'list') {
			emit(doc.name, doc);
		}
	}
};

module.exports = ddoc;
