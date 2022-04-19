import { FaTrash, FaPlus } from "react-icons/fa";
import { BiRefresh } from "react-icons/bi";
import { motion } from "framer-motion";

import { MdExplicit } from "react-icons/md";

import PropTypes from "prop-types";
import Track from "../utils/Track";
import React from "react";

CurrentlyPlaying.propTypes = {
    handleAdd: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired,
    track: PropTypes.instanceOf(Track),
    handleRefresh: PropTypes.func.isRequired,
};

export default function CurrentlyPlaying({
    handleAdd,
    handleRemove,
    track,
    handleRefresh,
}) {
    return (
        <>
            <div className="flex items-center mb-3">
                <p className="font-semibold my-2 flex-1">
                    Select your currently playing song?
                </p>

                <motion.button
                    onClick={handleRefresh}
                    whileTap={{ scale: 0.9 }}
                    className="bg-red-500 p-2 rounded-lg shadow-md shadow-red-500/50"
                >
                    <BiRefresh className="text-2xl" />
                </motion.button>
            </div>

            <div className="dark:bg-darkCard  border rounded-lg p-2 dark:border-white/10 border-black/20">
                <div className="flex items-center">
                    <img
                        src={track.albumArt}
                        alt="currently playing album cover"
                        className="w-20 h-20"
                    />

                    <div className="ml-5">
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href={`${track.url}?go=1`}
                            className="flex items-center font-bold underline hover:no-underline"
                        >
                            {track.name}

                            {track.explicit && (
                                <MdExplicit className="text-lg muted ml-2" />
                            )}
                        </a>

                        {/* Artists */}
                        <div>
                            {track.artist.map((artist, index) => (
                                <React.Fragment key={index}>
                                    <a
                                        rel="noreferrer"
                                        target="_blank"
                                        href={`${artist.url}?go=1`}
                                        className="underline text-sm muted hover:no-underline"
                                    >
                                        {artist.name}
                                    </a>
                                    <span className="muted last:hidden">
                                        ,{" "}
                                    </span>
                                </React.Fragment>
                            ))}
                        </div>

                        {track.added ? (
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleRemove(track)}
                                className="btn bg-red-500 text-white my-2 text-sm flex items-center"
                            >
                                <FaTrash className="mr-2" />
                                Remove from list
                            </motion.button>
                        ) : (
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleAdd(track)}
                                className="btn bg-blue-500 text-white my-2 text-sm flex items-center"
                            >
                                <FaPlus className="mr-2" />
                                Add to list
                            </motion.button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
