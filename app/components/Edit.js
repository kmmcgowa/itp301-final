var React = require('react');

var ReactCrop = require('react-image-crop');

require("./ReactCrop.scss");

var Edit = React.createClass({
	render: function(){
		return(
			<div>
				<div className="btn backbtn" onClick={this.props.onBackToSearch}>
					Back to Search
				</div>
				<ReactCrop src={this.props.url} />
			</div>
		)
	}
});

module.exports = Edit;