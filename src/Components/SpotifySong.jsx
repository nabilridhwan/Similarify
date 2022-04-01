import { FaSpotify, FaPlus } from "react-icons/fa"

import { useDispatch } from "react-redux"
import { addSong } from "../actions";
import { motion } from "framer-motion"

export default function SpotifySong({ track }) {

    const dispatch = useDispatch();

    const handleAdd = (track) => {
        dispatch(addSong(track));
    }

    return (

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center">

            <img src={track.albumArt} className="w-20 h-auto" alt="album_image" />

            <div className="ml-5">
                <a
                    href={`https://open.spotify.com/track/${track.id}`}
                    className="font-bold hover:underline">
                        {track.name}
                        </a>
                <p className="text-black/50 text-sm">{track.artist}</p>


                <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleAdd(track)}
                className="btn bg-blue-500 text-white my-2 text-sm">
                    Add to list
                </motion.button>

            </div>

        </motion.div>
    )

}