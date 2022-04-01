import { Link, useSearchParams} from "react-router-dom";
import Container from "../Components/Container";

const ERRORS = {
    "401": {
        title: "Authentication failed",
        message: "You have cancelled the authentication request. Similarify does not store any of your data. It only uses your Spotify account to search and get recommendations."
    },

    "403": {
        title: "You are not verified to use Similarify",
        message: "Similarify is currently not for public use. Please contact the admin to get access."
    }
}

export default function Error() {

    const [searchParams] = useSearchParams();
    const errorCode = searchParams.get("n")

    const error = ERRORS.hasOwnProperty(errorCode) ? ERRORS[errorCode] : {
        title: "Unknown error",
        message: "An unknown error has occured. Please try again later."
    }

    return (
        <Container>
            <div className="my-5">
                <h1 className="font-bold text-2xl">
                    {error.title}
                </h1>

                <p className="text-black/60">
                    {error.message}
                </p>

                <Link 
                to="/"
                className="underline"
                >
                    Go home
                </Link>
            </div>

        </Container >
    )
}