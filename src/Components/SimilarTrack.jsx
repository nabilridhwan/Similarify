import { FaPlus, FaTrash } from "react-icons/fa";
import { MdExplicit } from "react-icons/md";

import { useSelector, useDispatch } from "react-redux";
import { addSongToPlaylist, removeSongFromPlaylist } from '../actions';

import { AiFillEye } from "react-icons/ai"

import { motion } from "framer-motion"
import SpotifyPlayer from "./SpotifyPlayer";
import { useState } from "react";

import PropTypes from "prop-types";
import Track from "../utils/Track";

SimilarTrack.propTypes = {
    track: PropTypes.instanceOf(Track),
    percentage: PropTypes.number,
}

export default function SimilarTrack({ track, percentage }) {

    const dispatch = useDispatch();

    const [showSpotifyPlayer, setShowSpotifyPlayer] = useState(false)

    const handlePress = () => {
        // Enable the line below to show the Spotify player
        setShowSpotifyPlayer(true)
    }

    const handleOpenLink = () => {
        console.log("hello")
        window.open(track.url + "?go=1", "_blank");
    }

    return (
        <div className="flex items-center w-full mb-10 h-auto">
            <img src={track.albumArt} className="w-20 h-auto" alt="Album Art" />

            <div className='mx-5'>

                <div className="flex items-center">


                    <p
                        onClick={() => {
                            track.preview_url
                                ?
                                handlePress()
                                :
                                handleOpenLink()
                        }}
                        className="cursor-pointer dark:text-white text-black font-bold underline hover:no-underline">
                        {track.name}
                    </p>

                    {track.explicit && (
                        <MdExplicit className="text-lg muted ml-1" />
                    )}

                    {track.preview_url && (
                        <AiFillEye className="text-lg muted ml-1" />
                    )}
                </div>

                <p className="dark:text-white/50 text-black/50 text-sm">
                    {track.artist.map(a => a.name).join(", ")}
                </p>

                {/* Add to playlist button */}
                {track.added ? (
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => dispatch(removeSongFromPlaylist(track))}
                        className='btn mt-2 flex items-center justify-center text-sm bg-red-500 text-white'>
                        <FaTrash className="mr-2" />
                        Remove from playlist
                    </motion.button>
                ) : (
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => dispatch(addSongToPlaylist(track))}
                        className='btn mt-2 flex items-center justify-center text-sm bg-blue-500 text-white'>
                        <FaPlus className="mr-2" />
                        Add to playlist
                    </motion.button>
                )}
            </div>

            {showSpotifyPlayer && (
                <SpotifyPlayer
                    canBeAdded={true}
                    onClose={() => setShowSpotifyPlayer(false)}
                    track={track} />
            )}

        </div>

    )
}