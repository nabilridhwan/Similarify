import {combineReducers} from 'redux';
import apiKey from './apiKey';
import searchTerm from './searchTerm';
import searchResult from './search_result';
import songs from './songs';

const allReducers = combineReducers({
    songs: songs(),
    searchResults: searchResult(),
    searchTerm: searchTerm(),
    apiKey: apiKey()
})

export default allReducers;