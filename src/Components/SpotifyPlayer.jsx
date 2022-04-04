import { motion } from "framer-motion"
import { useSelector, useDispatch } from "react-redux";
import { addSongToPlaylist } from "../actions";
import { FaPlus } from "react-icons/fa"

import Spotify from "react-spotify-embed";

export default function SpotifyPlayer({ track, onClose }) {


    let apiKey = useSelector(state => state.apiKey)
    const dispatch = useDispatch();

    console.log(track)

    return (
        <motion.div
            initial={{ opacity: 0, }}
            animate={{ opacity: 1, }}
            exit={{ opacity: 0, }}
            className="bg-black/70 fixed flex justify-center items-center top-0 left-0 w-screen h-screen z-10">

            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="border border-black/10 dark:border-white/10 bg-white dark:bg-darkCard mx-7 w-11/12 md:w-1/4 px-7 py-5 rounded-lg z-20">

                <div className="my-5">

                    <h1 className="font-bold text-2xl" >
                        Spotify Player
                    </h1>

                    <p className="dark:text-white/60 text-black/60">
                        {track.name} by {track.artists.map(a => a.name).join(", ")}
                    </p>
                </div>

                <Spotify
                    wide
                    link={`https://open.spotify.com/track/${track.id}`}
                />

                {/* Add to playlist button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => dispatch(addSongToPlaylist(track))}
                    className='w-full btn mt-2 flex items-center justify-center bg-blue-500 text-white'>
                    <FaPlus className="mr-2" />
                    Add to playlist
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose} className="btn  bg-red-500 text-white w-full mt-2">
                    Close
                </motion.button>

            </motion.div>
        </motion.div>
    )
}