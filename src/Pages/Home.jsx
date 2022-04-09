// import listeningImage from './images/listening.png';
import { FaSpotify, FaHeart } from "react-icons/fa"
// import { SiReact, SiTailwindcss, SiFramer, SiSentry } from "react-icons/si"
import { Link } from "react-router-dom";
import Container from '../Components/Container';
import Footer from '../Components/Footer';
import { DragControls, motion, useAnimation } from "framer-motion"
import { useEffect } from "react";

export default function Home() {

    const control = useAnimation();

    const variants = {
        hidden: {
            opacity: 0,
            y: -20,
        },

        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeInOut",
            }
        }
    }

    useEffect(() => {
        (async () => {
            // await control.start({ y: -30, opacity: 0 })
            await control.set({ y: -30, opacity: 0 })
            await control.start({ y: 0, opacity: 1, transition: { delay: 0.5, duration: 0.5 } })

            while (true) {
                await control.start({ scale: [1, 1.07, 1], transition: { duration: 3, ease: "easeInOut" } })
            }
        })();
    }, [])

    return (
        <div className="flex items-center justify-center h-screen w-screen">


            <motion.div
                className="text-center mx-10 my-28"
                initial={"hidden"}
                animate={"show"}
                variants={variants}
            >


                {/* Header */}
                <motion.div
                    initial={"hidden"}
                    animate={"show"}
                    variants={variants}
                >

                    <p
                        className="text-sm uppercase tracking-widest muted"
                    >
                        <a href="https://nabilridhwan.github.io">Nabil Ridhwan </a> &copy; {new Date().getFullYear()}
                    </p>

                    <motion.h1

                        className='text-6xl font-extrabold my-10'>
                        Discover new songs 🎧🎶
                    </motion.h1>



                    <p className='muted leading-relaxed'>
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
                    animate={control}
                    className="mt-10"
                >
                    <Link
                        className="btn w-full justify-center flex flex-row items-center bg-spotify text-white shadow-[0_0_40px] shadow-spotify/30 hover:bg-green-600 hover:shadow-none transition-all"
                        to="/authenticate">
                        <FaSpotify className="mx-2" />
                        Login with Spotify
                    </Link>
                </motion.div>


                {/* <p className="text-white/80 hidden text-center text-xs italic dark:block mb-10">
                    You'll encounter a blinding white background by pressing the button above! Be careful!
                </p> */}


                <Footer />
            </motion.div>

        </div>
    );

}