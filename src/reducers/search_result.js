export default function searchResult() {
    return (state = [], action) => {
        switch (action.type) {
            case 'SET':
                let rtn = action.payload.results;
                return [...rtn];
            default:
                return state;
        }
    }
}