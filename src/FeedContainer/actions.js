import {
	PAGE_FEED,
	UPVOTED_LIST,
	POST_HIDE_LIST
} from './constants';

import axios from 'axios';

const setLocalStorage = (key, value) => {
	typeof window !== "undefined" && window.localStorage.setItem(key, JSON.stringify(value))
}

const getLocalStorage = (key, defaultValue) => {
	return typeof window !== "undefined" ? JSON.parse(window.localStorage.getItem(key)) || defaultValue : defaultValue
}

export const getFeeds = (pageNmber) => {
	return dispatch => {
		axios
			.get("https://hn.algolia.com/api/v1/search?page="+(Number(pageNmber)-1))
			.then(res => {
				dispatch({type: PAGE_FEED, data: res.data.hits})
			})
			.catch(err => {
				console.log(err);
			})
	}
}

export const getUpvotedList = (pageNmber) => {
	return dispatch => {
		dispatch({type: UPVOTED_LIST, data: getLocalStorage("upvoted", {})});
	}
}

export const getHiddenList = (pageNmber) => {
	return dispatch => {
		dispatch({type: POST_HIDE_LIST, data: getLocalStorage("hidden", {})});
	}
}

export const upvoteFeed = (feed_id) => {
	let id = feed_id + "";
	return dispatch => {
		let list = getLocalStorage("upvoted", {});
		if(list[id]) {
			list[id]++
		}
		else {
			list[id] = 1
		}
		setLocalStorage("upvoted", list);
		dispatch({type: UPVOTED_LIST, data: list});
	}
}

export const hideFeed = (feed_id) => {
	let id = feed_id + "";
	return dispatch => {
		let list = getLocalStorage("hidden", {});
		if(list[id]) {
			list[id]++
		}
		else {
			list[id] = 1
		}
		setLocalStorage("hidden", list);
		dispatch({type: POST_HIDE_LIST, data: list});
	}
}