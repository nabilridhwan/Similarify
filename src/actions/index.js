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

export default function setSearchResults(results){
    console.log("SET")
    return {
        type: 'SET',
        payload: results
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