import { motion } from "framer-motion"
import { useSelector, useDispatch } from "react-redux";
import { addSongToPlaylist, removeSongFromPlaylist, setAudioPlayerVolume } from "../actions";
import { FaPlus, FaTrash, FaSadCry, FaSpotify } from "react-icons/fa"
import { MdExplicit } from "react-icons/md"
import React from "react";

import PropTypes from "prop-types"
import Track from "../utils/Track";
import ModalWindow from "./ModalWindow";
import { useEffect, useRef, useState } from "react";

SpotifyPlayer.propTypes = {
    track: PropTypes.instanceOf(Track),
    onClose: PropTypes.func.isRequired
}

// import Spotify from "react-spotify-embed";

export default function SpotifyPlayer({ canBeAdded=false, track, onClose }) {

    const dispatch = useDispatch();

    const audioElemRef = useRef(null);

    const audioPlayerVolume = useSelector(state => state.audioPlayerVolume);

    const addedPlaylistSongs = useSelector(state => state.playlistSongs);

    useEffect(() => {

        // Check if the ref is set
        if (audioElemRef.current !== null) {
            console.log(`Elem: ${audioElemRef.current}`)
            // Set the volume to default set or 0.8 to save people's ears!
            if (audioPlayerVolume) {
                console.log(`Got volume from: redux. Value: ${audioPlayerVolume}`)
                audioElemRef.current.volume = audioPlayerVolume;
            }
        }

    }, [audioElemRef])

    useEffect(() => {

        addedPlaylistSongs.forEach(song => {
            console.log(song.id)
            console.log(track.id)
            if (song.id === track.id) {
                track.added = true
                return;
            }
        })

    }, [addedPlaylistSongs])

    const handleOnChangeVolume = (e) => {
        const volume = e.target.volume;
        dispatch(setAudioPlayerVolume(volume));
    }

    const handleClickOnSpotifyButton = () => {
        window.open(track.url + "?go=1", "_blank");
    }

    return (
        <motion.div
            // onClick={onClose}
            initial={{ opacity: 0, }}
            animate={{ opacity: 1, }}
            exit={{ opacity: 0, }}
            className="bg-black/70 fixed flex justify-center items-center top-0 left-0 w-screen h-screen z-10">

            <ModalWindow>


                <div className="mb-5">
                    <p
                        className="flex text-2xl items-center font-bold">
                        {track.name}

                        {track.explicit && (
                            <MdExplicit className="text-lg muted ml-2" />
                        )}
                    </p>



                    {/* Artists */}
                    <div>
                        by&nbsp;
                        {track.artist.map((artist, index) => (
                            <React.Fragment key={index}>

                                <a
                                    rel="noreferrer"
                                    target="_blank"
                                    href={`${artist.url}?go=1`}
                                    className="underline text-sm muted hover:no-underline">
                                    {artist.name}


                                </a><span className="muted last:hidden">, </span>
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                <div className="my-5">

                    {track.preview_url ? (
                        <audio onVolumeChange={handleOnChangeVolume} controls ref={audioElemRef} autoPlay={true} >
                            <source src={track.preview_url} />
                            Your browser does not support the audio element.
                        </audio>
                    ) : (
                        <div className="muted flex flex-col items-center justify-center my-10">
                            <FaSadCry className="text-xl" />
                            <p>
                                No preview available
                            </p>

                        </div>

                    )}
                </div>

                {/* Add to playlist button */}
                {
                    canBeAdded && (
                        track.added ? (
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => dispatch(removeSongFromPlaylist(track))}
                                className='w-full btn mt-2 flex items-center justify-center bg-red-500 text-white'>
                                <FaTrash className="mr-2" />
                                Remove from playlist
                            </motion.button>
                        ) : (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => dispatch(addSongToPlaylist(track))}
                                className='w-full btn mt-2 flex items-center justify-center bg-blue-500 text-white'>
                                <FaPlus className="mr-2" />
                                Add to playlist
                            </motion.button>

                        )
                    )
                }

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleClickOnSpotifyButton} className="btn  bg-spotify text-white w-full mt-2 flex gap-1 items-center justify-center">
                        <FaSpotify />
                        Open in Spotify
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose} className="btn  bg-red-500 text-white w-full mt-2">
                    Close
                </motion.button>

            </ModalWindow>
        </motion.div>
    )
}