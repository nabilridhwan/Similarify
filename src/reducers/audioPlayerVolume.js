export default function audioPlayerVolume() {
    return (state = 0.5, action) => {
        switch (action.type) {
            case 'SET_AUDIO_PLAYER_VOLUME':
                return action.payload;
            default:
                return state;
        }
    }
}