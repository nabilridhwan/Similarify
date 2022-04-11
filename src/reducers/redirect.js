export default function redirect(){
    return (state = 'search', action) => {
        switch (action.type) {
            case 'SET_REDIRECT':
                return action.payload;
            default:
                return state;
        }
    }
}