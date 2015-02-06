var React = require('react'),
	Field = require('../Field'),
	Note = require('../../components/Note'),
	CodeMirror = require('codemirror');

// See CodeMirror docs for API:
// http://codemirror.net/doc/manual.html

// TODO:
// Bring forward mime-type language support and features (needs review)

module.exports = Field.create({
	
	getInitialState: function() {
		return {
			isFocused: false
		};
	},
	
	componentDidMount: function() {
		if (this.refs.codemirror) {
			var options = {
				lineNumbers: true,
				readOnly: this.shouldRenderField() ? false : true
			};
			this.codeMirror = CodeMirror.fromTextArea(this.refs.codemirror.getDOMNode(), options);
			this.codeMirror.on('change', this.codemirrorValueChanged);
			this.codeMirror.on('focus', this.focusChanged.bind(this, true));
			this.codeMirror.on('blur', this.focusChanged.bind(this, false));
			this._currentCodemirrorValue = this.props.value;
		}
	},
	
	componentWillUnmount: function() {
		// todo: is there a lighter-weight way to remove the cm instance?
		if (this.codeMirror) {
			this.codeMirror.toTextArea();
		}
	},
	
	componentWillReceiveProps: function(nextProps) {
		if (this.codeMirror && this._currentCodemirrorValue !== nextProps.value) {
			this.codeMirror.setValue(nextProps.value);
		}
	},
	
	focus: function() {
		if (this.codeMirror) {
			this.codeMirror.focus();
		}
	},
	
	focusChanged: function(focused) {
		this.setState({
			isFocused: focused
		});
	},
	
	codemirrorValueChanged: function(doc, change) {
		var newValue = doc.getValue();
		this._currentCodemirrorValue = newValue;
		this.props.onChange({
			path: this.props.path,
			value: newValue
		});
	},
	
	renderCodemirror: function() {
		var className = 'CodeMirror-container';
		if (this.state.isFocused && !this.shouldRenderField()) {
			className += ' is-focused';
		}
		return (
			<div className={className}>
				<textarea ref="codemirror" name={this.props.path} value={this.props.value} onChange={this.valueChanged} autoComplete="off" className="form-control" />
			</div>
		);
	},
	
	renderValue: function() {
		return this.renderCodemirror();
	},
	
	renderField: function() {
		return this.renderCodemirror();
	}
	
});
