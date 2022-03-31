import { Link } from "react-router-dom";
import Container from "../Components/Container";

export default function Error() {
    return (
        <Container>
            <div className="my-5">
                <h1 className="font-bold text-2xl">
                    Error!
                </h1>

                <p className="text-black/60">
                    You are not verified to use Similarify. Please contact the admin.
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