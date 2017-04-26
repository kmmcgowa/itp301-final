var React = require('react');



var Results = React.createClass({
	render: function(){

		var goToEdit = this.props.onGoToEdit

		var pics = this.props.pics.map(function(pic){
			return(
				<div className="picItem" key={pic.url}>
					<img src={pic.url} className="picThumb" onClick={goToEdit} />
					<h5>{pic.user}</h5>
				</div>
			)
		})

		return (
			<div>
				<div className="btn backbtn" onClick={this.props.onResultsToSearch}>
						Back to Search
				</div>
				<div className="resultsFull">
					<h2>{this.props.term.toUpperCase()}</h2>
					{pics}
				</div>
			</div>
		)
	}
});

module.exports = Results;