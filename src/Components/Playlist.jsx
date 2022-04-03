import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { FaArrowRight, FaChevronRight } from "react-icons/fa"
import DefaultAlbumImage from "./DefaultImage";
export default function Playlist({ playlist }) {
    let navigate = useNavigate();
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => navigate(`/playlist/${playlist.id}`, { state: { name: playlist.name, total: playlist.tracks } })}
            transition={{
                type: "tween",
                ease: "easeOut"
            }}
            className="flex items-center cursor-pointer">


            {playlist.albumArt ? (

                <img
                    src={playlist.albumArt} className="w-20 h-auto" alt="album_image" />
            ) : (
                <DefaultAlbumImage size={20} />
            )}

            <div className="ml-5 flex-1">
                <h1
                    className="font-bold">
                    {playlist.name}
                </h1>
                <p className="dark:text-white/50 text-black/50 text-sm">
                    {playlist.tracks} Songs by {playlist.owner}
                </p>




            </div>

            <motion.button
                className="text-white flex items-center px-2">
                <FaChevronRight className="ml-2" />
            </motion.button>

        </motion.div>
    )
}