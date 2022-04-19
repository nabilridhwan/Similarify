import { useDispatch } from "react-redux";
import { DateTime } from "luxon";
import { addSong, removeSong } from "../actions";
import { AnimatePresence, motion } from "framer-motion";
import { MdExplicit } from "react-icons/md";
import { FaPlus, FaTrash } from "react-icons/fa";

import PropTypes from "prop-types";
import Track from "../utils/Track";
import React, { useState } from "react";

import { AiFillEye } from "react-icons/ai";
import SpotifyPlayer from "./SpotifyPlayer";
import Artist from "../utils/Artist";

SpotifyArtist.propTypes = {
    artist: PropTypes.instanceOf(Artist),
    overrideTopText: PropTypes.string,
};

export default function SpotifyArtist({ overrideTopText, track: artist }) {
    const dispatch = useDispatch();

    const handleAdd = (track) => {
        dispatch(addSong(track));
    };

    const handleRemove = (track) => {
        dispatch(removeSong(track));
    };

    const handlePressTitleSong = () => {
        window.open(artist.url + "?go=1", "_blank");
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
                type: "tween",
                ease: "easeOut",
            }}
        >
            {artist.added_at && (
                <motion.p className="text-black/50 dark:text-white/50 uppercase tracking-widest text-xs my-2">
                    {overrideTopText ? overrideTopText : "Liked"}{" "}
                    {DateTime.fromISO(artist.added_at).toRelative()}
                </motion.p>
            )}

            <div className="flex items-center">
                <img
                    src={artist.albumArt}
                    className="w-20 h-auto"
                    alt="album_image"
                />

                <div className="ml-5">
                    <p
                        onClick={handlePressTitleSong}
                        className="flex items-center font-bold underline hover:no-underline cursor-pointer"
                    >
                        {artist.name}

                        {artist.explicit && (
                            <MdExplicit className="text-lg muted ml-2" />
                        )}

                        {artist.preview_url && (
                            <AiFillEye className="text-lg muted ml-1" />
                        )}
                    </p>

                    {artist.added ? (
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleRemove(artist)}
                            className="btn bg-red-500 text-white my-2 text-sm flex items-center"
                        >
                            <FaTrash className="mr-2" />
                            Remove from list
                        </motion.button>
                    ) : (
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleAdd(artist)}
                            className="btn bg-blue-500 text-white my-2 text-sm flex items-center"
                        >
                            <FaPlus className="mr-2" />
                            Add to list
                        </motion.button>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
