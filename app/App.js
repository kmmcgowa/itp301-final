var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var Loading = require('./components/Loading')
var Backsplash = require('./components/Backsplash');
var Find = require('./components/Find');
var Search = require('./components/Search');
var Results = require('./components/Results');
var Edit = require('./components/Edit');

require('style-loader!./styles/styles.scss');

const unsplashURL = "https://api.unsplash.com/";
const appID 			= "bbdc1d137a070483f7d82e725d472b62e87e268f7abaa1b81dc34af2559bedc2";
const appSecret 	= "5e61a60abb88ffcbd94dfee6065b164a7f0db04031f421557bdbb1a7ec7f3110";


var App = React.createClass({

	getInitialState: function() {
		return {
			position: "find",
			loading: true,
			imgUrl: 'https://www.nasa.gov/sites/default/files/thumbnails/image/nasa-snow_slide1.png',
			Author: 'NASA',
			query: '',
			invalidQuery: false,
			results: [],
			editUrl: ''
		}
	},

	componentDidMount: function() {
		// Details to console
		console.log('Kevin McGowan - ITP 301 Final Project \nbuilt using React, Unsplash API, Darkroom.js')

		// Save component into var for scope
		var x = this;
		// create request W/ headers
		var request = new Request(unsplashURL + 'photos/random', {
			headers: new Headers({
				'Authorization': 'Client-ID ' + appID
			})
		});
		// REQUEST with fetch - NOT AJAX

		fetch(request)
			.then(function(res){
				return res.json()
			})
			.then(function(json){
				// load img from src before changing off of loading gif
				var img = new Image();
				img.onload = function() {
					x.setState({
						imgUrl: json.urls.regular,
						Author: json.user.name,
						loading: false
					})
				}
				img.src = json.urls.regular
			})
			.catch(function(error){
				console.log(error)
				x.setState({loading: false})
			})

		// Temporary fix other than fetch to not use up API rate-limiting
		// var img = new Image();
		// img.onload = function() {
		// 	x.setState({
		// 		loading: false
		// 	})
		// }
		// img.src = this.state.imgUrl
	},

	handleFindClick: function(){
		this.setState({position: "search"})
		// console.log('clicked here')
	},

	handleSearchChange: function(e){
		this.setState({query: e.target.value})

		// TODO: add a regexp to test for letters only
	},

	handleSearchSubmit: function(e){
		e.preventDefault()

		var x = this
		var request = new Request(unsplashURL + 'search/photos?per_page=9&query=' + this.state.query, {
			headers: new Headers({
				'Authorization': 'Client-ID ' + appID
			})
		})

		fetch(request)
			.then(function(res){
				return res.json()
			})
			.then(function(json){
				var picsArray = json.results.map(function(pic){
					return {
						url: pic.urls.small,
						user: pic.user.name,
						full: pic.urls.raw
					}
				})
				// console.log(picsArray)
				x.setState({
					position: 'results',
					results: picsArray
				})
			})
			.catch(function(error){
				console.log(error)
				x.setState({loading: false})
			})
	},

	handleResultsToSearch: function() {
		this.setState({
			query: '',
			position: 'search',
			editUrl: ''
		})
	},

	handleGoToEdit: function(e){
		
		console.log(e.target.src);
		console.log(this.state.results);

		var url = '';

		for(var i=0; i<this.state.results.length; i++){
			if(e.target.src === this.state.results[i].url){
				url = this.state.results[i].full;
				break;
			}
		}

		console.log(url);

		this.setState({
			editUrl: url,
			position: 'edit'
		})
	},

	render: function(){
		if(this.state.loading) {
			return Loading
		}

		if(this.state.position === 'find') {
			return (
				<Backsplash 
					imgurl={this.state.imgUrl}
					author={this.state.Author}>
					<ReactCSSTransitionGroup
          	transitionName="animation"
          	transitionEnterTimeout={500}
          	transitionLeaveTimeout={300}>
          	<Find onFindClick={this.handleFindClick} key="find" />
        	</ReactCSSTransitionGroup>
				</Backsplash>
		 	)
		}

		if(this.state.position === 'search') {
			return (
				<Backsplash 
					imgurl={this.state.imgUrl}
					author={this.state.Author} >
					<ReactCSSTransitionGroup
          	transitionName="animation"
          	transitionEnterTimeout={500}
          	transitionLeaveTimeout={300}>
          	<Search 
          		onSearchSubmit={this.handleSearchSubmit}
          		onSearchChange={this.handleSearchChange}
          		key="search" />
        	</ReactCSSTransitionGroup>
				</Backsplash>
		 	);
		}

		if(this.state.position === 'results') {
			return (
				<Results 
					pics={this.state.results}
					term={this.state.query}
					onResultsToSearch={this.handleResultsToSearch}
					onGoToEdit={this.handleGoToEdit}/>
			)
		}

		if(this.state.position === 'edit'){
			return(
				<Edit
					url={this.state.editUrl}
					onBackToSearch={this.handleResultsToSearch}/>
			)
		}
		
		return (
			Loading
		)
	}

});

module.exports = App;