import { motion, AnimatePresence } from 'framer-motion'
import { useSelector, useDispatch } from "react-redux"
import AddedSong from './AddedSong';
import { useEffect, useState } from 'react';

import { removeSongFromPlaylist } from '../actions';
import SpotifyApi from '../utils/SpotifyApi';

export default function AddedPlaylistSongs({ onClose, onClearAll, onRemove }) {

    const apiKey = useSelector(state => state.apiKey);
    const addedPlaylistSongs = useSelector(state => state.playlistSongs);
    const addedSongs = useSelector(state => state.songs);
    const dispatch = useDispatch();

    const [createdPlaylist, setCreatedPlaylist] = useState(false);
    const [playlistLink, setPlaylistLink] = useState("");

    const [playlistName, setPlaylistName] = useState('');
    const [playlistDescription, setPlaylistDescription] = useState('');

    useEffect(() => {
        if (addedPlaylistSongs.length === 0) {
            onClose()
        }

        // Everytime a song is changed, allow the user to create a new playlist
        setCreatedPlaylist(false)
    }, [addedPlaylistSongs])

    const handleCreatePlaylist = () => {
        setCreatedPlaylist(false)

        let pName = playlistName;
        let pDesc = playlistDescription;

        // TODO: Check if playlist name is empty or not, if yes, then make a random name up
        if (pName === '') {
            pName = ('Similarify Playlist ' + Math.floor(Math.random() * 100));
        }

        // TODO: Check if playlist description is empty or not, if yes, then make a random description up
        if (pDesc === '') {
            pDesc = `${addedSongs.map(s => {
                return s.name + " by " + s.artist
            }).join(" | ")}. This is a playlist created by Similarify (https://similarify.netlify.app). Find similar songs to the ones you like!`;
        }

        // Get the created playlist id

        // Extract the uris
        const uris = addedPlaylistSongs.map(track => track.uri)
        const spotifyApi = new SpotifyApi();
        spotifyApi.setToken(apiKey)
        spotifyApi.createPlaylist(uris, pName, pDesc)
            .then(d => {
                setCreatedPlaylist(true)
                console.log("Playlist created successfully!")
                console.log(d.link)
                setPlaylistLink(d.link)
            }).catch(error => {
                console.log("There was an error while creating a playlist")
                console.log(error)
            })
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
                className="fixed py-14 bottom-0 left-0 w-screen bg-white p-10 col-span-2 shadow-[0_0_20px] shadow-black">

                <div className='md:w-1/2 mx-auto'>




                    <h2 className="text-2xl font-bold">

                        {addedPlaylistSongs.length < 2 ? `${addedPlaylistSongs.length} song added to the playlist` : `${addedPlaylistSongs.length} songs added to the playlist`}
                    </h2>
                    <p className="text-black/60">
                        All your added playlist songs appear here!
                    </p>

                    <button
                        onClick={onClearAll}

                        className='text-red-500 font-bold mt-5'>
                        Clear All
                    </button>

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
                                            <AddedSong track_album_img={track.album.images[0].url} key={track.id} track_name={track.name} track_artist={track.artists.map(a => a.name).join(", ")} onRemovedClicked={() => dispatch(removeSongFromPlaylist(track))} />
                                        )
                                    })}
                                </AnimatePresence>

                            </motion.div>


                            {createdPlaylist && (

                                <p className='text-green-500'>
                                    Playlist created successfully!
                                </p>
                            )}

                            {/* Name playlist */}
                            <input
                                value={playlistName}
                                type="text" className='search-box my-2' placeholder='Name your playlist' onChange={(e) => setPlaylistName(e.target.value)} />

                            {/* Playlist Description */}
                            <textarea
                                value={playlistDescription}
                                placeholder='Describe your playlist (Optional)'
                                name="playlist_description" id="playlist_description" cols="30" rows="3" className='search-box resize-none'
                                onChange={(e) => setPlaylistDescription(e.target.value)}
                            ></textarea>


                            {!createdPlaylist ? (
                                <button onClick={handleCreatePlaylist} className="transition btn bg-blue-500 block text-white text-center shadow-md shadow-blue-200 w-full disabled:bg-black/30 disabled:text-white/40 disabled:shadow-none" 
                                disabled={playlistName === ''}>
                                    Create Playlist
                                </button>
                            ) : (
                                <a href={playlistLink} className="btn bg-green-500 block text-white text-center shadow-md shadow-blue-200 w-full">
                                    Go to Playlist
                                </a>
                            )}

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