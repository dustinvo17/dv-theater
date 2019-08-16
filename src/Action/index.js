import axios from 'axios'
import key from '../keys'
const baseURL = 'https://api.themoviedb.org/3/'
export const fetchList = (caller, component) => async(dispatch) => {

    const makeRequest = (itemType, typeFetch) => {
        return `${baseURL}${itemType}/${typeFetch}?api_key=${key.apiKey}&language=en-US`
    }
    const checkTypeFetch = (itemType, nameComponent) => {
        return caller === itemType && component === nameComponent
    }

    if (checkTypeFetch('movie', 'slider')) {

        const response = await axios.get(makeRequest('movie', 'upcoming'))
        dispatch({type: "FETCH_LATEST", payload: response.data})
        return
    } else if (checkTypeFetch('tv', 'slider')) {
        const response = await axios.get(makeRequest('tv', 'airing_today'))
        dispatch({type: "FETCH_TV_LATEST", payload: response.data})
        // Slider Component
        return
    } else if (checkTypeFetch('tv', 'popular')) {
        const response = await axios.get(makeRequest('tv', 'popular'))
        dispatch({type: "FETCH_TV_POPULAR", payload: response.data})
        return
    } else if (checkTypeFetch('movie', 'popular')) {
        const response = await axios.get(makeRequest('movie', 'popular'))
        dispatch({type: "FETCH_MOVIE_POPULAR", payload: response.data})
        // Popular Component

        return
    } else if (checkTypeFetch('movie', 'now_playing')) {
        const response = await axios.get(makeRequest('movie', 'now_playing'))
        dispatch({type: "FETCH_MOVIE_NOW_PLAYING", payload: response.data})
        return
    } else if (checkTypeFetch('tv', 'now_playing')) {
        const response = await axios.get(makeRequest('tv', 'on_the_air'))
        dispatch({type: "FETCH_TV_NOW_PLAYING", payload: response.data} // Now Playing Component
        )
    } else if (checkTypeFetch('movie', 'top_rated')) {
        const response = await axios.get(makeRequest('movie', 'top_rated'))
        dispatch({type: "FETCH_MOVIE_TOP_RATED", payload: response.data})
    } else if (checkTypeFetch('tv', 'top_rated')) {
        const response = await axios.get(makeRequest('tv', 'top_rated'))
        dispatch({type: "FETCH_TV_TOP_RATED", payload: response.data})
    }

    // TOP_RATED

}

export const getDetails = (itemType, id) => async dispatch => {
    let response
    if (itemType === 'person') {
        response = await axios.get(`${baseURL}${itemType}/${id}?api_key=${key.apiKey}&language=en-US&append_to_response=movie_credits,tv_credits`)
    } else {
        response = await axios.get(`${baseURL}${itemType}/${id}?api_key=${key.apiKey}&language=en-US&append_to_response=videos,credits,reviews`)
    }

    dispatch({type: "GET_DETAILS", payload: response.data})
}
export const searchKeyword = (keyword, history, pageNum) => async(dispatch) => {
    let response;
    let customUrl = (itemType, option) => {
        return `${baseURL}${itemType}/${option}?api_key=${key.apiKey}&language=en-US&page=${pageNum}`
    }

    if (keyword === 'top-rated-movies') {
        response = await axios.get(customUrl('movie', 'top_rated'))
    } else if (keyword === 'upcoming-movies') {
        response = await axios.get(customUrl('movie', 'upcoming'))
    } else if (keyword === 'now-playing-movies') {
        response = await axios.get(customUrl('movie', 'now_playing'))
    } else if (keyword === 'popular-movies') {
        response = await axios.get(customUrl('movie', 'popular'))
    } else if (keyword === 'popular-tv-shows') {
        response = await axios.get(customUrl('tv', 'popular'))
    } else if (keyword === 'top-rated-tv-shows') {
        response = await axios.get(customUrl('tv', 'top_rated'))
    } else if (keyword === 'on-the-air-tv-shows') {
        response = await axios.get(customUrl('tv', 'on_the_air'))
    } else if (keyword === 'airing-today-tv-shows') {
        response = await axios.get(customUrl('tv', 'airing_today'))
    } else if (keyword === 'popular-people') {
        response = await axios.get(customUrl('person', 'popular'))
    } else {
        response = await axios.get(`${baseURL}search/multi?api_key=${key.apiKey}&query=${keyword}&language=en-US&page=${pageNum}&include_adult=false`)
    }

    dispatch({type: "SEARCH", payload: response.data})

    if (history) {
        history.push(`/search/results/${keyword}`)
    }

}
export const discoverData = (fields, pageNum) => async dispatch => {
    let options = ''
    const returnId = async(type, initData) => {
        const res = await axios.get(`${baseURL}search/${type}?api_key=${key.apiKey}${options}&query=${initData}`)
        console.log(res.data)
        // retrive id of keyword and people to append request discover
        const data = res
            .data
            .results
            .map(item => {
                return item.id
            })
        let resultId = ''
        data.forEach((id, index) => {
            resultId += (id + '|')
            if (index === data.length - 1) {
                resultId += id
            }
        })

        return resultId
    }

    if (fields) {
        const {voteAverage, peopleInvolved, keywords, year} = fields
        if (voteAverage) {
            options += `&vote_average.gte=${voteAverage}`
        }
        if (peopleInvolved) {
            // get name of people and fetch id them use id to append options for discover
            // request
            const peopleId = await returnId('person', peopleInvolved)

            options += `&with_people=${peopleId}`
        }
        if (keywords) {
            // get keyword and fetch id them use id to append options for discover request
            const keywordsID = await returnId('keyword', keywords)
            options += `&with_keywords=${keywordsID}`
        }
        if (year) {
            options += `&year=${year}`
        }
    }
    let url = `${baseURL}discover/movie?api_key=${key.apiKey}${options}&language=en-US&page=${pageNum}&include_adult=false`

    const response = await axios.get(url)
    dispatch({type: "DISCOVER", payload: response.data})
}

export const seeMovieList = () => {

    return {type: "SEE_MOVIELIST"}
}
export const seeTVshowList = () => {
    return {type: "SEE_TVLIST"}
}