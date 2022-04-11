import {combineReducers} from 'redux';
import apiKey from './apiKey';
import redirect from './redirect';
import apiKeyExpiration from './apiKeyExpiration';
import audioPlayerVolume from './audioPlayerVolume';
import playlistLink from './playlistLink';
import playlistSongs from './playlistSongs';
import searchTerm from './searchTerm';
import searchResult from './search_result';
import songs from './songs';

const allReducers = combineReducers({
    songs: songs(),
    searchResults: searchResult(),
    searchTerm: searchTerm(),
    apiKey: apiKey(),
    playlistSongs: playlistSongs(),
    playlistLink: playlistLink(),
    apiKeyExpiration: apiKeyExpiration(),
    audioPlayerVolume: audioPlayerVolume(),
    redirect: redirect()
})

export default allReducers;