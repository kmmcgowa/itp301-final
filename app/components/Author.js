var React = require('react');

var Author = React.createClass({
	render: function(){
		return (
			<div className="authorCred">
				<h4><span className="authorName">{this.props.author}</span> &middot; Unsplash</h4>
			</div>
		)
	}
});

module.exports = Author;