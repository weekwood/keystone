var assert = require('assert'),
	demand = require('must'),
	UpdateHandler = require('../../../../lib/updateHandler');

exports.initList = function(List) {
	List.add({
		boolean: { type: Boolean, note: 'This is a boolean field' },
		indented: { type: Boolean, indent: true },
		nested: {
			boolean: { type: Boolean }
		},
		defaultFalse: { type: Boolean, default: false },
		defaultTrue: { type: Boolean, default: true },
		required: { type: Boolean, required: true },
		initial: { type: Boolean, initial: true },
		requiredInitial: { type: Boolean, required: true, initial: true },
		initialDefaultTrue: { type: Boolean, initial: true, default: true },
		collapse: { type: Boolean, collapse: true }
	});
}

exports.createData = function(List) {

};

exports.testFilters = function(List) {

};

exports.testFieldType = function(List) {
	var testItem = new List.model();

	it('should be true when passed the boolean true', function() {
		List.fields.bool.updateItem(testItem, {
			bool: true
		});
		demand(testItem.bool).be.true();
		testItem.bool = undefined;
	});
	
	it('should be true when passed the string "true"', function() {
		List.fields.bool.updateItem(testItem, {
			bool: 'true'
		});
		demand(testItem.bool).be.true();
		testItem.bool = undefined;
	});
	
	it('should be false when passed the boolean false', function() {
		List.fields.bool.updateItem(testItem, {
			bool: false
		});
		demand(testItem.bool).be.false();
		testItem.bool = undefined;
	});
	
	it('should be false when passed the string "false"', function() {
		List.fields.bool.updateItem(testItem, {
			bool: 'false'
		});
		demand(testItem.bool).be.false();
		testItem.bool = undefined;
	});
	
	it('should be false when passed undefined', function() {
		List.fields.bool.updateItem(testItem, {});
		demand(testItem.bool).be.false();
		testItem.bool = undefined;
	});
	
	it('should be false when passed an empty string', function() {
		List.fields.bool.updateItem(testItem, {
			bool: ''
		});
		demand(testItem.bool).be.false();
		testItem.bool = undefined;
	});
	
	it('should update nested fields', function() {
		List.fields['nested.bool'].updateItem(testItem, {
			nested: {
				bool: true
			}
		});
		demand(testItem.nested.bool).be.true();
		testItem.nested.bool = undefined;
	});
	
	it('should update nested fields with flat paths', function() {
		List.fields['nested.bool'].updateItem(testItem, {
			'nested.bool': true
		});
		demand(testItem.nested.bool).be.true();
		testItem.nested.bool = undefined;
	});
};
