import {
    useEffect,
    useState
} from "react";
import {
    useDispatch,
    useSelector
} from "react-redux";
import {
    useLocation,
    useNavigate
} from "react-router-dom";
import {
    setApiKey,
    setApiKeyExpiration,
    setRedirect
} from "../actions";
import SpotifyInstance from "../utils/SpotifyInstance";

// A hook that checks if the Spotify API key is set and if it is valid
export default function useApiKey(redirectUrlIfInvalid = "search") {

    const apiKey = useSelector(state => state.apiKey);
    const [loggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        console.log(`Checking for token in ${location.pathname}`);
        dispatch(setRedirect(redirectUrlIfInvalid));

        (async () => {
            if (window.location.hash) {
                // Separate the access token from the '#' symbol
                let hashes = window.location.hash.substring(1).split("&");
                let hashes_value = hashes.map(hash => hash.split("=")[1]);
                const [access_token] = hashes_value;

                // Set the access token
                SpotifyInstance.setToken(access_token);
                console.log("Token exists: From hash")
                await checkIfTokenIsValid();

                // Dispatch Api Key Stuff
                dispatch(setApiKey(access_token));

                // Dispatch the expiration date to be 1 hour from now
                dispatch(setApiKeyExpiration(new Date(Date.now() + 3600000)));

            } else if (apiKey) {
                console.log("Token exists: From redux")
                SpotifyInstance.setToken(apiKey);
                await checkIfTokenIsValid();
                dispatch(setApiKey(apiKey));
            } else {

                // Navigate the user to the authentication page
                console.log(`Token does not exist: redirect to /${redirectUrlIfInvalid} after /authenticate`)
                navigate(`/authenticate`);
            }

        })()
    }, [])

    const checkIfTokenIsValid = async () => {
        return new Promise((resolve, reject) => {

            SpotifyInstance.getUserData().then(data => {
                console.log("Token is valid")
                setLoggedIn(true)
                resolve()
            }).catch(error => {

                console.log("Token is invalid")
                setLoggedIn(false)
                setError(error)


                navigate(`/error/${error.message}?from=${location.pathname}`, {
                    state: {
                        error: error.message
                    }
                })
                reject(error)
            })
        })
    }

    return {
        apiKey,
        loggedIn,
        error
    }

}