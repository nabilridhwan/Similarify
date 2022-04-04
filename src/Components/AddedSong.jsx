import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaTrash, FaCog } from "react-icons/fa"
import AdjustParameters from "./AdjustParameters";

export default function AddedSong({ changeableParameters, track_name, track_artist, track_album_img, onRemovedClicked, track }) {

    const [showParameters, setShowParameters] = useState(false);

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

                    <h2 className="font-bold">{track_name}</h2>
                    <h2 className="dark:text-white/50 text-sm text-black/50">
                        {track_artist}
                    </h2>
                </div>



                {changeableParameters && (
                    track.hasOwnProperty("parameters") && Object.keys(track.parameters).length > 0 ? (
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setShowParameters(true)}
                            className="rounded-full p-3 bg-slate-700 shadow-sm text-white flex justify-center items-center">
                            <FaCog />
                        </motion.button>
                    ) : (
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setShowParameters(true)}
                            className="rounded-full p-3 bg-gray-500 shadow-sm text-white flex justify-center items-center">
                            <FaCog />
                        </motion.button>
                    )
                )}

                {/* Remove button */}
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={onRemovedClicked}
                    className="rounded-full p-3 bg-red-500 shadow-sm shadow-red-500/50 text-white flex justify-center items-center">
                    <FaTrash />
                </motion.button>
            </div>

            <AnimatePresence>
                {showParameters && (
                    <AdjustParameters track={track} onClose={() => setShowParameters(false)} />
                )}
            </AnimatePresence>


        </motion.div>
    )
}