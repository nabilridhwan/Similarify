import { Link } from "react-router-dom";
import Container from "../Components/Container";
import Footer from "../Components/Footer";

export default function NotFound() {
    return (
        <Container>

            <div className="text-center my-20">
                <h1
                    className="font-bold text-5xl my-10"
                >
                    Ooh! This one seems lost!
                </h1>

                <p className="text-lg">
                    Nothing is found here :( You can <Link className="underline" to="/">go home</Link> and start over.
                </p>
            </div>

            <Footer />
        </Container>
    )
}