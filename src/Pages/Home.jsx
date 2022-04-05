// import listeningImage from './images/listening.png';
import { FaSpotify } from "react-icons/fa"
import { SiReact, SiTailwindcss, SiFramer, SiSentry } from "react-icons/si"
import { Link } from "react-router-dom";
import Container from '../Components/Container';
import Footer from '../Components/Footer';

export default function Home() {
    return (
        <Container>

            {/* Header */}
            <div className='mt-20'>
                <h1 className='text-6xl font-extrabold my-2'>
                    Discover new songs 🎧🎶🎉
                </h1>
                <p className='dark:text-white/60 text-black/60 text-lg'>
                    Similarify recommends songs you'd like based on the songs you already love. Create a playlist from the recommendations (or add it to an existing playlist!)
                </p>
            </div>


            <div className="my-5">
                <h1>
                    Read what's new with this update <Link to="/changelog" className="underline text-pink-500">here</Link>.
                </h1>
            </div>


            <div className="my-10">
                <h1 className="text-2xl font-extrabold">
                    Discover new songs in 5 simple steps!
                </h1>



                <ol className='list-decimal text-sm space-y-2 ml-4'>
                    <li className='list-item'>
                        Log in with your Spotify Account
                    </li>

                    <li>
                        Search for songs that you already love. Alternatively, you can select songs from your Liked songs, playlist, or recently played songs.
                    </li>

                    <li>
                        Add songs to your list.
                    </li>

                    <li>
                        Click done, view your recommended songs, and refresh the recommendations to get other recommendations.
                    </li>

                    <li>
                        Create a playlist out of it! (or add it to an existing playlist!)
                    </li>
                </ol>
            </div>

            <Link
                className="btn w-full justify-center flex flex-row items-center bg-green-500 text-white shadow-lg shadow-green-500/30 hover:bg-green-600 hover:shadow-none transition-all my-5"
                to="/authenticate">
                <FaSpotify className="mx-2" />
                Login with Spotify
            </Link>

            <p className='dark:text-white/50 text-black/50 mb-5 text-sm text-center'>
                Similarify does not store any of your data. It only uses your Spotify account to search and get recommendations.
            </p>

            <p className="text-white/80 hidden text-center text-xs italic dark:block mb-10">
                You'll encounter a blinding white background by pressing the button above! Be careful!
            </p>


            <Footer />

        </Container>
    );

}