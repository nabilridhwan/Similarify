export function addSong(track){
    return {
        type: 'ADD_SONG',
        payload: track
    }
}

export function removeSong(track){
    return {
        type: 'REMOVE_SONG',
        payload: track
    }
}

export function setSearchResults(results, addedSongs){
    return {
        type: 'SET',
        payload: {
            results: results,
            addedSongs: addedSongs
        } 
    }
}

export function clearAddedSongs(){
    return {
        type: 'CLEAR_SONGS'
    }
}

export function setSearchTermRedux(searchTerm){
    return {
        type: 'SET_SEARCH_TERM',
        payload: searchTerm
    }
}

export function setApiKey(apiKey){
    return {
        type: 'SET_API_KEY',
        payload: apiKey
    }
}

export function addSongToPlaylist(track){
    return {
        type: 'ADD_SONG_PLAYLIST',
        payload: track
    }
}

export function removeSongFromPlaylist(track){
    return {
        type: 'REMOVE_SONG_PLAYLIST',
        payload: track
    }
}

export function clearSongsFromPlaylist(){
    return {
        type: 'CLEAR_SONGS_PLAYLIST'
    }
}