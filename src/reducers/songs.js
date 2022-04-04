// Create a reducer
export default function songs() {

    return (state = [], action) => {
        switch (action.type) {
            case 'ADD_SONG':

                action.payload.added = true;
                action.payload.parameters = {};

                let f = state.filter(song => {
                    return song.id == action.payload.id;
                })

                if (f.length == 0) {
                    return [...state, action.payload];
                } else {
                    return [...state]
                }

                case 'REMOVE_SONG':
                    action.payload.added = false;
                    action.payload.parameters = {};
                    return state.filter(song => song.id !== action.payload.id);

                case 'CLEAR_SONGS':
                    // Set each song to false added
                    state.map(song => {
                        song.added = false;
                        song.parameters = {};
                    })
                    return [];

                case 'SET_SONG_PARAMETERS':
                    let parameterAdjustedSong = action.payload.track

                    state.forEach(song => {
                        if (song.id == parameterAdjustedSong.id) {
                            song.parameters = action.payload.parameters;
                        }
                    })

                    return state;

                default:
                    return state;
        }
    }
}