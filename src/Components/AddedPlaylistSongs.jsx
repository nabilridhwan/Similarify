import { motion, AnimatePresence } from 'framer-motion'
import { useSelector, useDispatch } from "react-redux"
import AddedSong from './AddedSong';
import { useEffect, useState } from 'react';

import { clearAddedSongs, clearSongsFromPlaylist, removeSongFromPlaylist, setPlaylistLink } from '../actions';
import AddToExistingPlaylist from './AddToExistingPlaylist';

import SpotifyInstance from '../utils/SpotifyInstance';
import LoadingSpinner from './LoadingSpinner';

import PropTypes from "prop-types";

AddedPlaylistSongs.propTypes = {
    onClose: PropTypes.func.isRequired,
    onClearAll: PropTypes.func.isRequired,
}

export default function AddedPlaylistSongs({ onClose, onClearAll}) {

    const apiKey = useSelector(state => state.apiKey);
    const addedPlaylistSongs = useSelector(state => state.playlistSongs);
    const addedSongs = useSelector(state => state.songs);
    const dispatch = useDispatch();
    
    console.log(addedPlaylistSongs)

    const [error, setError] = useState("");
    const [showAddToExistingPlaylist, setShowAddToExistingPlaylist] = useState(false);

    const [message, setMessage] = useState("");

    const [playlistName, setPlaylistName] = useState('');
    const [playlistDescription, setPlaylistDescription] = useState('');

    useEffect(() => {
        if (addedPlaylistSongs.length === 0) {
            onClose()
        }

        // Everytime a song is changed, allow the user to create a new playlist
        // setCreatedPlaylist(false)
    }, [addedPlaylistSongs])

    const handleCreatePlaylist = () => {

        setError(null);
        setMessage("Creating Playlist");
        // setCreatedPlaylist(false)

        let pName = playlistName;
        let pDesc = playlistDescription;

        if (pName === '') {
            pName = ('Similarify Playlist ' + Math.floor(Math.random() * 100));
        }

        // Check if playlist description is empty or not, if yes, then make a random description up
        if (pDesc === '') {
            pDesc = "This playlist is created by Similarify (https://similarify.netlify.app). Find similar songs to the ones you like!";
        }


        // Get the created playlist id

        // Extract the uri:
        const uris = addedPlaylistSongs.map(track => track.uri)
        SpotifyInstance.setToken(apiKey)
        SpotifyInstance.createPlaylist(uris, pName, pDesc)
            .then(d => {
                // setCreatedPlaylist(true)
                console.log("Playlist created successfully!")
                console.log(d.link)

                dispatch(setPlaylistLink(d.link))

                // Clear all songs
                dispatch(clearAddedSongs())
                dispatch(clearSongsFromPlaylist())
            }).catch(error => {
                console.log("There was an error while creating a playlist")
                console.log(error)
                setError(error)
            }).finally(() => {
                setMessage("")
            })
    }

    const handleOnAdded = (link) => {
        dispatch(setPlaylistLink(link))

        // Clear all songs
        dispatch(clearAddedSongs())
        dispatch(clearSongsFromPlaylist())
    }

    const handleAddToExistingPlaylist = () => {
        setShowAddToExistingPlaylist(true)
    }

    return (

        <motion.div
            className='fixed w-screen h-screen bg-black/70 top-0 left-0'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >


            <motion.div
                style={{
                    borderRadius: 0
                }}
                initial={{ y: 200, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 200, opacity: 0 }}
                transition={{
                    type: "tween",
                }}
                className="fixed dark:bg-dark bottom-0 left-0 w-screen bg-white p-5 col-span-2 shadow-[0_0_20px] shadow-black">

                <div className='md:w-1/2 mx-auto'>




                    <h2 className="text-2xl font-bold">

                        {addedPlaylistSongs.length < 2 ? `${addedPlaylistSongs.length} song added to the playlist` : `${addedPlaylistSongs.length} songs added to the playlist`}
                    </h2>
                    <p className="dark:text-white/60 text-black/60">
                        All your added playlist songs appear here!
                    </p>

                    <motion.button
                        onClick={onClearAll}
                        whileTap={{ scale: 0.95 }}
                        className='text-red-500 font-bold mt-5'>
                        Clear All
                    </motion.button>

                    <AnimatePresence >

                        <motion.div layout initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} >

                            {addedPlaylistSongs.length === 0 && (

                                <h1>
                                    Add songs to get started!
                                </h1>
                            )}


                            <motion.div
                                layout
                                className="h-52 addedSongsAlbumArt my-5 overflow-y-scroll shadow-inner">
                                <AnimatePresence>

                                    {addedPlaylistSongs.map((track, index) => {
                                        return (
                                            <AddedSong 
                                            key={track.id} 
                                            track={track}
                                            onRemovedClicked={() => dispatch(removeSongFromPlaylist(track))} />
                                        )
                                    })}
                                </AnimatePresence>

                            </motion.div>

                            {error && (
                                <p className='text-red-500'>
                                    {error}
                                </p>
                            )}

                            {message && (
                                <div className="flex items-center">

                                    <LoadingSpinner size={20} loading={true} />

                                    <p className="text-sm ml-2 text-black/50 dark:text-white/50 mt-2">
                                        {message}
                                    </p>
                                </div>
                            )}


                            <input
                                value={playlistName}
                                type="text" className='search-box my-2' placeholder='Name your playlist' onChange={(e) => setPlaylistName(e.target.value)} />

                            <textarea
                                value={playlistDescription}
                                placeholder='Describe your playlist (Optional)'
                                name="playlist_description" id="playlist_description" cols="30" rows="3" className='search-box resize-none'
                                onChange={(e) => setPlaylistDescription(e.target.value)}
                            ></textarea>


                            <button onClick={handleCreatePlaylist} className="mt-2 transition btn bg-green-500 block text-white text-center shadow-md w-full disabled-button"
                                disabled={playlistName === ''}>
                                Create Playlist
                            </button>

                            <button
                                onClick={handleAddToExistingPlaylist}
                                className="mt-2 transition btn bg-blue-500 block text-white text-center shadow-md w-full disabled-button">
                                Add to an existing playlist
                            </button>

                            <button
                                onClick={onClose}
                                className="mt-2 btn bg-red-500 block w-full text-white text-center shadow-md shadow-red/50"
                            >
                                Close
                            </button>



                        </motion.div>
                    </AnimatePresence>

                </div>

                <AnimatePresence>
                    {showAddToExistingPlaylist && (
                        <AddToExistingPlaylist onAdded={handleOnAdded} onClose={() => setShowAddToExistingPlaylist(false)} />
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    )

}