import { FaSpotify } from "react-icons/fa"

export default function Footer() {
    return (
        <footer className="text-black/50 text-xs text-center">
            <p className="m-0">

                <a href="https://nabilridhwan.github.io">
                    Nabil Ridhwan
                </a> &copy; {new Date().getFullYear()}
            </p>
            <p className="flex justify-center items-center">
                Powered by <FaSpotify className="ml-1" />. We are not affiliated.
            </p>
            <p>
                Similarify is <a href="https://github.com/nabilridhwan/Similarify">
                    open source.
                </a>
            </p>

            <p>
                Found a bug or want a feature? Submit an issue here <a href="https://github.com/nabilridhwan/similarify/issues">here</a>
            </p>
        </footer>
    )
}