import { motion} from "framer-motion";
import { useDispatch } from "react-redux"
import { FaTrash } from "react-icons/fa"

export default function AddedSong({ track_name, track_artist, track_album_img, onRemovedClicked }) {

    return (
        <motion.div
            layout="position"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, }}
            exit={{ opacity: 0, }}
            transition={{
                type: "tween",
            }}
            className="p-1">

            <div className="flex items-center space-x-2">

                {track_album_img && (
                    <img className="w-20" src={track_album_img} alt={track_name} height="150px" />
                )}

                <div className="flex-1">

                    <h2>{track_name}</h2>
                    <h2 className="dark:text-white/50 text-sm text-black/50">
                        {track_artist}
                    </h2>
                </div>

                {/* Remove button */}
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={onRemovedClicked}
                    className="rounded-full p-3 bg-red-500 shadow-sm shadow-red-500/50 text-white flex justify-center items-center">
                    <FaTrash />
                </motion.button>
            </div>


        </motion.div>
    )
}