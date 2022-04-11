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

export function setPlaylistLink(link){
    return {
        type: 'SET_PLAYLIST_LINK',
        payload: link
    }
}

export function clearPlaylistLink(){
    return {
        type: 'CLEAR_PLAYLIST_LINK'
    }
}

export function setSearchResults(results){
    return {
        type: 'SET',
        payload: {
            results: results,
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

export function setSongParameters(parameters, track){
    return {
        type: 'SET_SONG_PARAMETERS',
        payload: {
            parameters: parameters,
            track: track
        }
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

export function setApiKeyExpiration(expirationISOString){
    return{
        type: 'SET_API_KEY_EXPIRATION',
        payload: expirationISOString
    }
}

export function setAudioPlayerVolume(volume){
    return{
        type: 'SET_AUDIO_PLAYER_VOLUME',
        payload: volume
    }
}


export function setRedirect(redirect){
    return{
        type: 'SET_REDIRECT',
        payload: redirect
    }
}