import { motion, AnimatePresence } from 'framer-motion'
import { useSelector, useDispatch } from "react-redux"
import { Link } from 'react-router-dom';
import AddedSong from './AddedSong';
import { useEffect, useState } from 'react';

import { clearAddedSongs, removeSong } from '../actions';
import ModalHeader from './ModalHeader';

import PropTypes from "prop-types";

AddedSongs.propTypes = {
    onClose: PropTypes.func.isRequired,
}

export default function AddedSongs({ onClose }) {

    const addedSongs = useSelector(state => state.songs);
    const dispatch = useDispatch();

    useEffect(() => {
        if (addedSongs.length === 0) {
            onClose()
        }
    }, [addedSongs])

    return (

        <motion.div
            className='fixed w-screen h-screen bg-black/70 top-0 left-0'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >


            <motion.div
                initial={{ y: 200, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 200, opacity: 0 }}
                transition={{
                    type: "tween",
                    ease: "easeOut",
                }}
                style={{
                    zIndex: 2
                }}
                className="fixed dark:bg-dark py-14 bottom-0 left-0 w-screen bg-white p-5 col-span-2 shadow-[0_0_20px] shadow-black">

                <div className='md:w-2/4 mx-auto'>



                    <ModalHeader title={
                        addedSongs.length < 2 ? `${addedSongs.length} song added` : `${addedSongs.length} songs added`
                    } subtitle="All your added songs appear here!" />

                    <motion.button
                        onClick={() => dispatch(clearAddedSongs())}
                        whileTap={{ scale: 0.95 }}
                        className='text-red-500 font-bold mt-5'>
                        Clear All
                    </motion.button>

                    <AnimatePresence >

                        <motion.div layout initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} >

                            {addedSongs.length === 0 && (

                                <h1>
                                    Add songs to get started!
                                </h1>
                            )}


                            <motion.div
                                layout
                                className="h-52 addedSongsAlbumArt my-5 overflow-y-scroll shadow-inner">

                                <AnimatePresence>

                                    {addedSongs.map((track, index) => {
                                        return (
                                            <AddedSong changeableParameters={true} track={track} onRemovedClicked={() => dispatch(removeSong(track))} key={track.id} track_album_img={track.albumArt} track_name={track.name} track_artist={track.artist} />
                                        )
                                    })}
                                </AnimatePresence>

                            </motion.div>

                            {addedSongs.length > 0 && (
                                <Link to="/recommendation" className="btn font-semibold bg-green-500 block text-white text-center">
                                    Get Recommendations
                                </Link>
                            )
                            }

                            <button
                                onClick={onClose}
                                className="mt-2 btn bg-red-500 block w-full text-white text-center shadow-md shadow-red/50"
                            >
                                Close
                            </button>

                        </motion.div>
                    </AnimatePresence>

                </div>
            </motion.div>
        </motion.div>
    )

}