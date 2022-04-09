import { useEffect } from "react";
import Container from "../Components/Container";
import SpotifyApi from "../utils/SpotifyApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SpotifyInstance from "../utils/SpotifyInstance";
export default function Authenticate() {

    let apiKey = useSelector(state => state.apiKey);
    let navigate = useNavigate();

    useEffect(() => {
        (async () => {

            // if the apiKey exists
            if (apiKey) {
                try {
                    SpotifyInstance.setToken(apiKey);
                    await SpotifyInstance.getUserData()
                    console.log("Successfully authenticated, Redirected to search")
                    navigate("/search")
                } catch (error) {
                    SpotifyApi.authenticateUser();
                }
            } else {
                const origin = window.location.origin
                SpotifyApi.authenticateUser(`${origin}/search`);
            }
        })();
    }, [])

    return (
        <Container />
    )
}