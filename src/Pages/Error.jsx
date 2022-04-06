import { Link, useParams, useSearchParams } from "react-router-dom";
import Container from "../Components/Container";
import Footer from "../Components/Footer";

const ERRORS = {
    "401": {
        title: "Authentication failed (or token expired)",
        message: "Your token expired OR You have cancelled the authentication request."
    },

    "403": {
        title: "You are not verified to use Similarify",
        message: "Similarify is currently not for public use. Please contact the admin to get access."
    },

    "404": {
        title: "Ooh! This one seems lost!",
        message: "There's nothing here, or was there?"
    }
}

export default function Error() {

    const params = useParams();
    const errorCode = params.errno

    let [searchParams, setSearchParams] = useSearchParams();

    const from = searchParams.get("from")

    const error = Object.prototype.hasOwnProperty.call(ERRORS, errorCode) ? ERRORS[errorCode] : {
        title: "Unknown error",
        message: "An unknown error has occured. Please try again later."
    }

    return (
        <Container>
            <div className="text-center my-20">
                <h1 className="font-bold text-5xl my-10">
                    {error.title}
                </h1>

                <p className="text-lg dark:text-white/60 text-black/60">
                    {error.message}
                </p>

                {
                    !Object.prototype.hasOwnProperty.call(ERRORS, errorCode) && (

                        <div className="pt-5">
                            <h2 className="font-bold">
                                Error Message
                            </h2>
                            <p className="dark:text-white/60 text-black/60">
                                {params.errno}
                            </p>

                            <h2 className="font-bold mt-3">
                                Error Source
                            </h2>
                            <p className="dark:text-white/60 text-black/60">
                                {from}
                            </p>
                        </div>
                    )
                }


                <Link
                    to="/"
                    className="underline"
                >
                    Go home
                </Link>
            </div>


            <Footer />


        </Container >
    )
}