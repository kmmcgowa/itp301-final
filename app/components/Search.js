var React = require('react');

var Search = React.createClass({

	render: function(){

		var styles = {
			textAlign: "center",
			outline: "none",
			width: "296px",
			lineHeight: "96px",
			fontSize: "18px",
			overflow: "hidden"
		}

		return (
			<div className="animation">
				<form onSubmit={this.props.onSearchSubmit} className="searchForm">
					<input type="text" className="searchField" onChange={this.props.onSearchChange} autoFocus style={styles}/>
				</form>
			</div>
		)
	}

});

module.exports = Search;