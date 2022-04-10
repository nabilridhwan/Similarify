import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { FaArrowRight, FaChevronRight } from "react-icons/fa"
import DefaultAlbumImage from "./DefaultImage";
import PropTypes from "prop-types";

import PlaylistClass from "../utils/Playlist"
import DefaultAlbumImageCompact from "./DefaultAlbumImageCompact";

Playlist.propTypes = {
    playlist: PropTypes.instanceOf(PlaylistClass),
    onClickPlaylist: PropTypes.func,
    compact: PropTypes.bool
}


export default function Playlist({ playlist, onClickPlaylist, compact }) {
    let navigate = useNavigate();
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => {
                onClickPlaylist ? (
                    onClickPlaylist(playlist)
                ) : (
                    navigate(`/playlist/${playlist.id}`, { state: { name: playlist.name, total: playlist.totalTracks } })
                )
            }}
            transition={{
                type: "tween",
                ease: "easeOut"
            }}
            className="flex items-center cursor-pointer">


            {playlist.albumArt ? (

                compact ? (
                    <img
                        src={playlist.albumArt} className="w-14 h-auto" alt="album_image" />
                ) : (
                    <img
                        src={playlist.albumArt} className="w-20 h-auto" alt="album_image" />
                )


            ) : (
                compact ? (
                    <DefaultAlbumImageCompact />
                ) : (
                    <DefaultAlbumImage />
                )
            )}

            <div className="ml-5 flex-1">
                <h1
                    className={`font-bold ${compact && "text-sm"}`}>
                    {playlist.name}
                </h1>
                <p className={`dark:text-white/50 text-black/50 ${compact ? "text-xs" : "text-sm"}`}>
                    {playlist.totalTracks} Songs by {playlist.owner}
                </p>




            </div>

            <motion.button
                className="text-dark dark:text-white flex items-center px-2">
                <FaChevronRight className="ml-2" />
            </motion.button>

        </motion.div>
    )
}