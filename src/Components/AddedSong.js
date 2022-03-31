import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux"
import { removeSong } from "../actions";
import { FaTrash } from "react-icons/fa"

export default function AddedSong({ track_name, track_artist, track_album_img, onRemovedClicked }) {

    const dispatch = useDispatch();

    return (
        <motion.div layout initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -100, opacity: 0 }} className="p-1">

            <div className="flex items-center space-x-2">

                {track_album_img && (
                    <img className="w-20" src={track_album_img} alt={track_name} height="150px" />
                )}

                <div className="flex-1">

                    <h2>{track_name}</h2>
                    <h2 className="text-sm text-black/50">
                        {track_artist}
                    </h2>
                </div>

                {/* Remove button */}
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={onRemovedClicked}
                    className="rounded-full p-3 bg-red-500 shadow-md shadow-red-500/50 text-white flex justify-center items-center">
                    <FaTrash />
                </motion.button>
            </div>


        </motion.div>
    )
}