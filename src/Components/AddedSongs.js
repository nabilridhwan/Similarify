import { motion, AnimatePresence } from 'framer-motion'
import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate } from 'react-router-dom';
import { removeSong } from '../actions';
import { FaTrash } from "react-icons/fa"
import AddedSong from './AddedSong';

export default function AddedSongs({ onClose }) {

    const addedSongs = useSelector(state => state.songs);
    const navigate = useNavigate();

    return (

        <motion.div
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 200, opacity: 0 }}
            transition={{
                type: "tween",
            }}
            className="fixed bottom-0 left-0 w-screen bg-white p-10 col-span-2 shadow-[0_0_20px] shadow-black">

            <button
                onClick={onClose}
            >
                Close
            </button>

            <h2 className="text-2xl font-bold">Added Songs</h2>
            <p className="text-black/60">All your added songs appear here!</p>

            <AnimatePresence >

                <motion.div layout initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} className="my-5">

                    {addedSongs.length == 0 && (

                        <h1>
                            Add songs to get started!
                        </h1>
                    )}


                    <motion.div layout className="addedSongsAlbumArt flex my-5 flex-wrap">
                        <AnimatePresence >
                            {addedSongs.map((track, index) => {
                                return (
                                    <AddedSong key={index} track={track} />
                                )
                            })}

                        </AnimatePresence>
                    </motion.div>

                    {addedSongs.length > 0 && (
                        <button onClick={() => navigate("/lastfm")} className="btn bg-blue-500 block text-white text-center shadow-md shadow-blue-200">Done</button>
                    )
                    }



                </motion.div>
            </AnimatePresence>

        </motion.div>
    )

}