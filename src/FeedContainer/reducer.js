import {
	PAGE_FEED,
	UPVOTED_LIST,
	POST_HIDE_LIST
} from './constants';

let initialState = {
	pageFeed: [],
	upvoteList: {},
	hiddenList: {}
};

function feedReducer(state = initialState, action) {
  switch (action.type) {
    case PAGE_FEED:
      return { ...state, pageFeed: action.data };
    case UPVOTED_LIST:
      return { ...state, upvoteList: action.data };
    case POST_HIDE_LIST:
      return { ...state, hiddenList: action.data };
    default:
      return state;
  }
}

export default feedReducer;
