import { motion, AnimatePresence} from 'framer-motion'
import { useSelector, useDispatch } from "react-redux"
import { Link} from 'react-router-dom';
import AddedSong from './AddedSong';
import { useEffect } from 'react';

import { clearAddedSongs, removeSong} from '../actions';

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
                className="fixed py-14 bottom-0 left-0 w-screen bg-white p-10 col-span-2 shadow-[0_0_20px] shadow-black">

                <div className='md:w-1/2 mx-auto'>




                    <h2 className="text-2xl font-bold">
                        {addedSongs.length < 2 ? `${addedSongs.length} song added` : `${addedSongs.length} songs added`}
                    </h2>
                    <p className="text-black/60">All your added songs appear here!</p>

                    <button 
                    onClick={() => dispatch(clearAddedSongs())}
                    
                    className='text-red-500 font-bold mt-5'>
                        Clear All
                    </button>

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
                                            <AddedSong onRemovedClicked={() => dispatch(removeSong(track))} key={track.id} track_album_img={track.albumArt} track_name={track.name} track_artist={track.artist} />
                                        )
                                    })}
                                </AnimatePresence>

                            </motion.div>

                            {addedSongs.length > 0 && (
                                <Link to="/recommendation" className="btn bg-blue-500 block text-white text-center shadow-md shadow-blue-200">
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