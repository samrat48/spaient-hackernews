import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';
import moment from 'moment';
import {
	getFeeds,
	getUpvotedList,
	getHiddenList,
	upvoteFeed,
	hideFeed
} from './actions';
import './index.css';

import CanvasJSReact from './components/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


class FeedContainer extends Component {

	constructor () {
		super();
		this.state = {
			pageNumber : this.getPageNumber(),
			graphFeedUpvotes: []
		}
	}

	getPageNumber = () => {
		const urlParams = new URLSearchParams(window.location.search);
		return urlParams.get('page') || 1;
	}

	static getDerivedStateFromProps (props, state) {
		let graphFeedUpvotes = [];
		for(let feed_id in props.upvoteList) {
			graphFeedUpvotes.push({x: Number(feed_id), y: props.upvoteList[feed_id]})
		}
		if(state.graphFeedUpvotes !== graphFeedUpvotes) {
			state.graphFeedUpvotes = graphFeedUpvotes;
		}
		return state;
	}

	componentDidMount() {
		this.props.getFeeds(this.getPageNumber());
		this.props.getUpvotedList();
		this.props.getHiddenList();
	}

	handlePrevious = (e) => {
		let { pageNumber } = this.state;
		if(pageNumber > 1) {
			let newPage = (Number(pageNumber)-1)+"";
			window.history.pushState("", "", "?page="+ newPage);
			this.setState({pageNumber: newPage})
			this.props.getFeeds(newPage);
		}
		e.preventDefault();
	}

	handleNext = (e) => {
		let { pageNumber } = this.state;
		let newPage = (Number(pageNumber)+1)+"";
		window.history.pushState("", "", "?page="+ newPage);
		this.setState({pageNumber: newPage})
		this.props.getFeeds(newPage);
		e.preventDefault();
	}

	durationUtil = (time) => {
		let today = moment(new Date().getTime());
		let postDate = moment(new Date(time).getTime());
		let diff = today.diff(postDate, 'days');
		if(diff > 365)
			return Math.round(diff/365) + " years ago";
		else if(diff < 365 && diff > 30)
			return Math.round(diff/30) + " months ago"
		else
			return diff + " days ago";
	}

 	render() {
 		let { graphFeedUpvotes } = this.state;
 		let options = {
			backgroundColor: "#f6f6ef",
			axisY: {
				title: "Votes",
				interval: 1
			},
			axisX: {
				title: "ID",
				scaleBreaks: {
			        autoCalculate: true,
			        spacing: 0,
			        lineThickness: 0
			     }
			},
			data: [{
				type: "line",
				toolTipContent: "ID: {x} has {y} UpVotes",
				dataPoints: graphFeedUpvotes
			}]
		}

 		return (
 				<div style={{
 					backgroundColor: "#f6f6ef",
 					maxWidth: "85%",
 					margin: "auto",
 					marginTop: "10px"
 				}}>
 					<Table striped hover size="sm">
					  <thead style={{
					  	backgroundColor: "#ff6600",
					  	color: "white",
					  	fontSize: "10px"
					  }}>
					    <tr>
					      <th width="5px">Comments</th>
					      <th width="5px">Vote Count</th>
					      <th width="5px">UpVote</th>
					      <th>News Details</th>
					    </tr>
					  </thead>
					  <tbody>
					    {
					    	this.props.pageFeed.map(feed => feed.objectID && !this.props.hiddenList[feed.objectID] ? (
					    		<tr key={feed.objectID}>
							      <td className="content_center">{feed.num_comments}</td>
							      <td className="content_center">{this.props.upvoteList[feed.objectID]}</td>
							      <td className="content_center pointer_cursor" onClick={(e) => {this.props.upvoteFeed(feed.objectID)}}><img alt="upvote" src="https://news.ycombinator.com/grayarrow.gif"/></td>
							      <td className="feed_info">
							      	<a href={feed.url}><span className="feed_title">{feed.title}</span></a>
							      	(<span className="basic"> {feed.url && feed.url.split("/")[2]} </span>) by <span className="basic_dark">{feed.author}</span> <span className="basic">{this.durationUtil(feed.created_at)}</span> [ <span className="basic_dark pointer_cursor" onClick={(e) => {this.props.hideFeed(feed.objectID)}}>hide</span> ]
							      </td>
							    </tr>
					    		) : '')
					    }
					  </tbody>
					</Table>
					<div style={{width: "100%", textAlign: "end", fontSize: "12px", fontWeight: "bold", color: "#ff6600", marginBottom: "10px", paddingRight: "10px"}}>
						<span className="pointer_cursor" onClick={this.handlePrevious}>Previous</span> | <span className="pointer_cursor" onClick={this.handleNext}>Next</span>
					</div>
					<div
				      style={{
					    borderTop: 'solid #ff6600',
					    borderBottom: 'solid #ff6600',
					    padding: '20px 0px 20px 0px'
				      }}
				    >
				    <CanvasJSChart options = {options} />
					</div>
 				</div>
 			)
 	}
}

const mapStateToProps = state => {
	return {
		pageFeed: state.feedReducer.pageFeed,
		upvoteList: state.feedReducer.upvoteList,
		hiddenList: state.feedReducer.hiddenList
	}
};

export default connect(mapStateToProps, {
	getFeeds,
	getUpvotedList,
	getHiddenList,
	upvoteFeed,
	hideFeed
})(FeedContainer);