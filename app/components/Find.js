var React = require('react');

var Find = React.createClass({

	render: function(){
		return (
			<div className="animation">
				<div className="find" onClick={this.props.onFindClick}>
					Find A Picture
				</div>
			</div>
		)
	}

});

module.exports = Find;