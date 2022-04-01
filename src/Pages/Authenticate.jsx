import { useEffect } from "react";
import Container from "../Components/Container";
import SpotifyApi from "../utils/SpotifyApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function Authenticate() {

    let apiKey = useSelector(state => state.apiKey);
    let navigate = useNavigate();

    useEffect(() => {
        (async () => {

            // if the apiKey exists
            if (apiKey) {
                try {
                    let Spotify = new SpotifyApi();
                    Spotify.setToken(apiKey);
                    await Spotify.getUserData()

                    console.log("Successfully authenticated, Redirected to search")
                    navigate("/search")
                } catch (error) {
                    SpotifyApi.authenticateUser();
                }
            } else {

                SpotifyApi.authenticateUser();
            }
        })();
    }, [])

    return (
        <Container>
        </Container>
    )
}