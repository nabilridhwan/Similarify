import { useEffect } from "react";
import Container from "../Components/Container";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// For static methods
import SpotifyApi from "../utils/SpotifyApi";

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

                SpotifyApi.authenticateUser();
            }
        })();
    }, [])

    return (
        <Container>
        </Container>
    )
}