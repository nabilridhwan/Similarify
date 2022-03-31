export default function playlistSongs() {
    return (state = [], action) => {
        switch (action.type) {
            case 'ADD_SONG_PLAYLIST':

                let f = state.filter(song => {
                    return song.id == action.payload.id;
                })

                if (f.length == 0) {
                    return [...state, action.payload];
                } else {
                    return [...state]
                }

                case 'REMOVE_SONG_PLAYLIST':
                    return state.filter(song => song.id !== action.payload.id);

                case 'CLEAR_SONGS_PLAYLIST':
                    return [];

                default:
                    return state;
        }
    }
}