import { FaHeart} from "react-icons/fa"
import { Link } from "react-router-dom"

export default function Footer() {
    return (
        <footer className="dark:text-white/50 text-black/50 text-xs text-center">
            <p className="m-0 flex justify-center items-center">
Created with <FaHeart className="mx-1" /> by <a href="https://nabilridhwan.github.io" className="ml-1">Nabil Ridhwan </a> &copy; {new Date().getFullYear()}
            </p>

            <p>
                Found a bug or want a feature? Submit an issue <a href="https://github.com/nabilridhwan/similarify/issues">here</a>
            </p>

            <p>
                <a href="https://github.com/nabilridhwan/Similarify">Similarify is open source!</a>
            </p>



            <p>
                <Link to="/changelog">Changelog</Link>
            </p>

            {/* <p>
                <Link to="/about">About</Link>
            </p>
 */}

        </footer>
    )
}