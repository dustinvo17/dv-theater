import {combineReducers} from 'redux'
import landingPageReducer from './fetchDataReducer/landingPageReducer'
import nowPlayingMovie from './fetchDataReducer/nowPlayingMovie'
import nowPlayingTV from './fetchDataReducer/nowPlayingTV'
import popularTV from './fetchDataReducer/popularTV'
import popularMovie from './fetchDataReducer/popularMovie'
import topRatedMovie from './fetchDataReducer/topRatedMovie'
import topRatedTV from './fetchDataReducer/topRatedTV'
import itemType from './itemType'
import TVshowReducer from './fetchDataReducer/TVshowReducer'
import getDetails from './fetchDataReducer/getDetails'
import searchResult from './fetchDataReducer/searchResult'
import discover from './fetchDataReducer/discover'
export default combineReducers({
    movieSlider:landingPageReducer,
    itemType,
    tvSlider:TVshowReducer,
    nowPlayingMovie,
    nowPlayingTV,
    popularTV,
    popularMovie,
    topRatedMovie,
    topRatedTV,
    getDetails,
    searchResult,
    discover
})