export default function apiKey(){
    return (state = '', action) => {
        switch (action.type) {
            case 'SET_API_KEY':
                return action.payload;
            default:
                return state;
        }
    }
}