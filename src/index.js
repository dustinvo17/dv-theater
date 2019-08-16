import React from 'react'
import ReactDOM from 'react-dom'
import App from './Components/App'
import {Provider} from 'react-redux'
import {createStore,applyMiddleware} from 'redux';
import combineReducer from './Reducer/combineReducer'
import ReduxThunk from 'redux-thunk'
const store = createStore(combineReducer,applyMiddleware(ReduxThunk))
ReactDOM.render(<Provider store={store}><App/></Provider>,document.querySelector('#root'))