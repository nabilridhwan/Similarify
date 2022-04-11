import { useEffect } from "react";
import Container from "../Components/Container";
import SpotifyApi from "../utils/SpotifyApi";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import SpotifyInstance from "../utils/SpotifyInstance";
import useApiKey from "../hooks/useApiKey";
import { setApiKey } from "../actions";

// TODO: Allow other apis to store state so that we can get data to redirect after authentication
export default function Authenticate() {

    const [searchParams, setSearchParams] = useSearchParams();

    // const { loggedIn } = useApiKey();

    const apiKey = useSelector(state => state.apiKey);
    const redirect = useSelector(state => state.redirect);
    const dispatch = useDispatch();

    // let apiKey = useSelector(state => state.apiKey);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {

            try {
                if (window.location.hash) {
                    // Separate the access token from the '#' symbol
                    let hashes = window.location.hash.substring(1).split("&");
                    let hashes_value = hashes.map(hash => hash.split("=")[1]);
                    const [access_token] = hashes_value;

                    // Set the access token
                    SpotifyInstance.setToken(access_token);
                    await SpotifyInstance.getUserData()
                    console.log("Token exists: From hash")

                    tokenExistsHandler(access_token);
                } else if (apiKey) {
                    console.log("Token exists: From redux")
                    SpotifyInstance.setToken(apiKey);
                    await SpotifyInstance.getUserData()

                    tokenExistsHandler(apiKey);
                } else {



                    // If no Api Key
                    SpotifyApi.authenticateUser(`${window.location.origin}/authenticate`)
                }
            } catch (error) {

                SpotifyApi.authenticateUser(`${window.location.origin}/authenticate`)
            }
        })()


        // if the apiKey exists
        // if (apiKey) {
        //     console.log("Successfully authenticated, Redirected to search")
        //     navigate("/search")
        //     console.log(apiKey)
        // } else {
        //     const origin = window.location.origin
        // SpotifyApi.authenticateUser(`${origin}/authenticate`);
        // }
    }, [])

    const tokenExistsHandler = (k) => {


        // Check if redirect state is set
        dispatch(setApiKey(k))
        navigate(`/${redirect}`)
    }

    return (
        <Container />
    )
}