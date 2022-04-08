import {
    useState
} from "react";

export default function useError(errorMsg = null) {
    const [error, setError] = useState(errorMsg);

    return {
        error,
        setError
    }
}