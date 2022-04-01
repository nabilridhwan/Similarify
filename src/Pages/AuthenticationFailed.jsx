import { Link } from "react-router-dom";
import Container from "../Components/Container";

export default function AuthenticationFailed() {
    return (
        <Container>
            <div className="my-5">
                <h1 className="font-bold text-2xl">
                    You have cancelled the authentication request.
                </h1>

                <p className="text-black/60">
                    Similarify does not store any of your data. It only uses your Spotify account to search and get recommendations.
                </p>

                <Link
                    to="/search"
                    className="underline"
                >
                    Try again?
                </Link>
            </div>

        </Container >
    )
}