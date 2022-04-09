// import listeningImage from './images/listening.png';
import { FaSpotify, FaHeart } from "react-icons/fa"
// import { SiReact, SiTailwindcss, SiFramer, SiSentry } from "react-icons/si"
import { Link } from "react-router-dom";
import Container from '../Components/Container';
import Footer from '../Components/Footer';
import { motion } from "framer-motion"

export default function Home() {
    return (
        <div className="flex items-center justify-center h-screen w-screen">


            <div className="text-center mx-10">


                {/* Header */}
                <motion.div
                    className='my-28'
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.7,
                    }}
                >

                    <motion.p
                        className="flex justify-center items-center text-sm uppercase tracking-widest muted"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <a href="https://nabilridhwan.github.io">Nabil Ridhwan </a> &nbsp; &copy; {new Date().getFullYear()}
                    </motion.p>

                    <motion.h1

                        className='text-6xl font-extrabold my-10'>
                        Discover new songs 🎧🎶
                    </motion.h1>

                    <p className="font-semibold my-5">
                        Read what's new <Link to="/changelog" className="underline text-brandColor">here</Link>.
                    </p>

                    <p className='muted'>
                        With Similarify, you can discover new songs you'd like based on the songs you already like!
                    </p>
                </motion.div>


                {/* <div className="my-10">
                <h1 className="text-2xl font-extrabold">
                    Discover in 5 simple steps!
                </h1>

                <p className='dark:text-white/50 text-black/50 mb-5 text-sm'>
                    Similarify does not store any of your data. It only uses your Spotify account to search and get recommendations.
                </p>

                <ol className='list-decimal space-y-4 ml-4 leading-relaxed'>
                    <li className='list-item'>
                        Log in with your Spotify Account
                    </li>

                    <li>
                        Search for songs that you already love and add it to your list. Alternatively, you can choose from your Liked songs and your playlists.
                    </li>

                    <li>
                        Confirm your list of added songs (and if you want to: adjust the parameters for each song to better suit your taste and get better recommendations!)
                    </li>

                    <li>
                        Click done and view your recommended songs and refresh the recommendations to get other recommendations.
                    </li>

                    <li>
                        Create a playlist out of your recommended songs (or add to an existing playlist of yours)!
                    </li>
                </ol>
            </div> */}

                <motion.div
                    animate={{
                        opacity: 1, y: 0, 
                        scale: [1, 1.05, 1, 1.05, 1],
                        transition: {
                            repeat: Infinity,
                            duration: 6,
                            ease: "easeInOut"
                        }
                    }}

                >
                    <Link
                        className="btn w-full justify-center flex flex-row items-center bg-spotify text-white shadow-[0_0_40px] shadow-spotify/30 hover:bg-green-600 hover:shadow-none transition-all my-10"
                        to="/authenticate">
                        <FaSpotify className="mx-2" />
                        Login with Spotify
                    </Link>
                </motion.div>

                {/* <p className="text-white/80 hidden text-center text-xs italic dark:block mb-10">
                    You'll encounter a blinding white background by pressing the button above! Be careful!
                </p> */}


                <Footer />
            </div>

        </div>
    );

}