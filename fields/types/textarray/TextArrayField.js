var _ = require('underscore'),
	Field = require('../Field'),
	ArrayFieldMixin = require('../../mixins/ArrayField');

module.exports = Field.create({
	mixins: [ArrayFieldMixin]
});
