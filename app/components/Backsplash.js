var React = require('react');

var Author = require('./Author');

var Backsplash = React.createClass({

	render: function(){
		var styles = {
			background: 'url(' + this.props.imgurl + ')',
			backgroundPosition: "center center",
			backgroundSize: "cover",
			backgroundRepeat: "no-repeat"
		}

		return (
			<div className="backsplash" style={styles}>
				<div className="centerbox">
					{this.props.children}
				</div>
				<Author author={this.props.author} />
			</div>
		)
	}

});

module.exports = Backsplash;