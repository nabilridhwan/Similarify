export default function searchTerm() {
    return (state = '', action) => {
        switch (action.type) {
            case 'SET_SEARCH_TERM':
                return action.payload;
            default:
                return state;
        }
    }
}