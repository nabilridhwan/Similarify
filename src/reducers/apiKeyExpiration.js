export default function apiKeyExpiration() {
    return (state = new Date().toISOString(), action) => {
        switch (action.type) {
            case 'SET_API_KEY_EXPIRATION':
                return action.payload;
            default:
                return state;
        }
    }
}