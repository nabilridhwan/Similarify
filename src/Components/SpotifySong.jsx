import { useDispatch } from "react-redux"
import { DateTime } from "luxon";
import { addSong, removeSong } from "../actions";
import { motion } from "framer-motion"
import { FaPlus, FaTrash } from "react-icons/fa"

import PropTypes from "prop-types";
import Track from "../PropTypes/track";

SpotifySong.propTypes = {
    track: Track,
    overrideTopText: PropTypes.string
}


export default function SpotifySong({ overrideTopText, track }) {

    const dispatch = useDispatch();

    const handleAdd = (track) => {
        dispatch(addSong(track));
    }

    const handleRemove = (track) => {
        dispatch(removeSong(track));
    }

    return (

        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
                type: "tween",
                ease: "easeOut"
            }}
        >

            {track.added_at && (
                <motion.p
                    className="text-black/50 dark:text-white/50 uppercase tracking-widest text-xs my-2"
                >
                    {overrideTopText ? overrideTopText : "Liked"} {DateTime.fromISO(track.added_at).toRelative()}
                </motion.p>
            )}

            <div

                className="flex items-center">

                <img
                    src={track.albumArt} className="w-20 h-auto" alt="album_image" />

                <div className="ml-5">
                    <a
                        rel="noreferrer"
                        target="_blank"
                        href={`https://open.spotify.com/track/${track.id}?go=1`}
                        className="font-bold underline hover:no-underline">
                        {track.name}
                    </a>
                    <p className="dark:text-white/50 text-black/50 text-sm">{track.artist}</p>

                    {track.added ? (
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleRemove(track)}
                            className="btn bg-red-500 text-white my-2 text-sm flex items-center">
                            <FaTrash className="mr-2" />
                            Remove from list
                        </motion.button>
                    ) : (
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleAdd(track)}
                            className="btn bg-blue-500 text-white my-2 text-sm flex items-center">
                            <FaPlus className="mr-2" />
                            Add to list
                        </motion.button>
                    )}

                </div>

            </div>
        </motion.div>
    )

}