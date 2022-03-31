// Create a reducer
export default function songs() {

    return (state = [], action) => {
        switch (action.type) {
            case 'ADD_SONG':

                let f = state.filter(song => {
                    return song.id == action.payload.id;
                })

                if (f.length == 0) {
                    return [...state, action.payload];
                }else{
                    return [...state]
                }

                case 'REMOVE_SONG':
                    return state.filter(song => song.id !== action.payload.id);
                default:
                    return state;
        }
    }
}