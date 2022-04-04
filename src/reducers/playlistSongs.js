export default function playlistSongs() {
    return (state = [], action) => {
        switch (action.type) {
            case 'ADD_SONG_PLAYLIST':
                action.payload.added = true

                let f = state.filter(song => {
                    return song.id == action.payload.id;
                })

                if (f.length == 0) {
                    return [...state, action.payload];
                } else {
                    return [...state]
                }

                case 'REMOVE_SONG_PLAYLIST':
                    action.payload.added = false;
                    return state.filter(song => song.id !== action.payload.id);

                case 'CLEAR_SONGS_PLAYLIST':
                    // Set each song to false added
                    state.map(song => {
                        song.added = false;
                    })

                    return [];

                default:
                    return state;
        }
    }
}