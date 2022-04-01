export default function playlistLink() {
    return (state = "", action) => {
        switch (action.type) {
            case 'SET_PLAYLIST_LINK':
                return action.payload;
            case 'CLEAR_PLAYLIST_LINK':
                return "";
            default:
                return state;
        }
    }
}