import { useEffect } from "react";
import Container from "../Components/Container";
import SpotifyApi from "../utils/SpotifyApi";
export default function Authenticate() {
    useEffect(() => {
        SpotifyApi.authenticateUser();
    }, [])

    return (
        <Container>
        </Container>
    )
}