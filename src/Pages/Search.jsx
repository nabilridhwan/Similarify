import { useState, useEffect } from "react";

import { FaRedoAlt, FaSearch, FaHeart } from "react-icons/fa"
import { RiPlayListFill } from "react-icons/ri"
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Container from "../Components/Container";

import { motion, AnimatePresence } from "framer-motion";
import SpotifySong from "../Components/SpotifySong";

import { useSelector, useDispatch } from "react-redux"
import { setSearchResults, removeSong, setApiKey, setSearchTermRedux, clearSongsFromPlaylist, clearPlaylistLink } from "../actions";
import AddedSongs from "../Components/AddedSongs";
import Footer from "../Components/Footer";
import DoneButton from "../Components/DoneButton";
import SectionButton from "../Components/SectionButton";
import LoadingSpinner from "../Components/LoadingSpinner";
import LogOutButton from "../Components/LogOutButton";

import SpotifyInstance from "../utils/SpotifyInstance"
import useApiKey from "../hooks/useApiKey";
import AddedPlaylistSongs from "../Components/AddedPlaylistSongs";
import CreatedPlaylistModal from "../Components/CreatedPlaylistModal";

function Search() {

    let searchTermRedux = useSelector(state => state.searchTerm);
    let [searchTerm, setSearchTerm] = useState(searchTermRedux);

    let searchResults = useSelector(state => state.searchResults);
    const addedPlaylistSongs = useSelector(state => state.playlistSongs);
    const playlistLink = useSelector(state => state.playlistLink);

    const [showAddedPlaylistSongs, setShowAddedPlaylistSongs] = useState(false);

    let [loading, setLoading] = useState(false);

    let addedSongs = useSelector(state => state.songs);
    let navigate = useNavigate();

    let [showAddedSongs, setShowAddedSongs] = useState(false);

    let dispatch = useDispatch();

    let { apiKey, loggedIn, error } = useApiKey();


    useEffect(() => {
        if (searchTerm.length == 0) {
            dispatch(setSearchResults([]));
        }
    }, [searchTerm])

    function handleFormSubmit(e) {
        // Prevent default submit action
        e.preventDefault();
        searchForTracks()
    }

    async function searchForTracks() {
        try {
            let sT = encodeURI(searchTerm.trim())
            dispatch(setSearchTermRedux(searchTerm.trim()))

            console.log(`Searching Spotify for ${sT}`)

            setLoading(true)
            let results = await SpotifyInstance.search(sT);
            setLoading(false)

            let tracks = results.tracks.items.map(track => {
                return {
                    name: track.name,
                    artist: track.artists.map(a => a.name).join(", "),
                    album: track.album.name,
                    albumArt: track.album.images[0].url,
                    id: track.id,
                    added: false
                }
            })

            /* 

            Final time complexity: O(n) - YES LINEAR TIME COMPLEXITY WOO HOO!

            To fix the nested loop and O(n^2) time complexity, im using the object collection method: 
            
            {
                "0HqZX76SFLDz2aW8aiqi7G": {
                    "name": "The Greatest Show",
                    "artist": "The Greatest Show",
                    "album": "The Greatest Show",
                    "albumArt": "https://i.scdn.co/image/ab67616d0000b2737c8f9b9b9b9b9b9b9b9b9b9b9b",
                    "id": "0HqZX76SFLDz2aW8aiqi7G",
                    "added": false
                }
            }
            */

            let finalTracks = {};

            // Loop through objects and add to finalTracks
            tracks.forEach(track => {
                // If the track is already in the finalTracks object, set the added property to true 
                if (Object.prototype.hasOwnProperty.call(finalTracks, track.id)) {
                    finalTracks[track.id].added = true;
                } else {

                    // If the track is not in the finalTracks object, add it to the finalTracks object
                    finalTracks[track.id] = track;
                }
            })

            // Do the same for added songs
            addedSongs.forEach(addedTrack => {
                if (Object.prototype.hasOwnProperty.call(finalTracks, addedTrack.id)) {
                    finalTracks[addedTrack.id].added = true;
                }
            })


            // Loop through finalTracks and return them in a format which is like this (it can be done using Object.values):
            /*
                [
                    {
                        "name": "The Greatest Show",
                        "artist": "The Greatest Show",
                        "album": "The Greatest Show",
                        "albumArt": "https://i.scdn.co/image/ab67616d0000b2737c8f9b9b9b9b9b9b9b9b9b9b9b",
                        "id": "0HqZX76SFLDz2aW8aiqi7G",
                        "added": false
                    }
                ]
            */

            // Dispatch redux event
            dispatch(setSearchResults(Object.values(finalTracks)));
        } catch (error) {
            // Reauthenticate user
            navigate("/authenticate")
        }
    }

    const handleClickOnCurrentPlaylist = () => {
        setShowAddedPlaylistSongs(true)
    }

    return (
        <Container>
            <LogOutButton />

            {/* <ProgressBar current={1} total={2} /> */}

            <div className="my-5">
                <h1 className="font-bold text-2xl" >
                    Search for Songs
                </h1>
                <p className="dark:text-white/60 text-black/60">
                    Search for the songs that you already like.
                </p>

                <div className="nav my-5 space-y-4">
                    <p
                        className="text-sm"
                    >Alternatively, pick from:</p>
                    <div className="section flex flex-wrap space-x-2">
                        <SectionButton to="/likedsongs">
                            <FaHeart className="mr-2" />
                            <h1>Liked Songs</h1>
                        </SectionButton>

                        <SectionButton to="/playlists">
                            <RiPlayListFill className="mr-2" />
                            <h1>Playlists</h1>
                        </SectionButton>

                        <SectionButton to="/recentlyplayed">
                            <FaRedoAlt className="mr-2" />
                            <h1>Recently Played</h1>
                        </SectionButton>



                    </div>
                </div>


            </div>

            {/* Search form */}
            <form onSubmit={handleFormSubmit}>
                <input
                    value={searchTerm}
                    className="search-box"
                    type="text"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Imagine Dragons" />


                <motion.div
                    layout="position"
                    className="grid md:grid-cols-2 gap-2 my-5">

                    {/* Search button */}
                    <button
                        disabled={searchTerm === ""}
                        className={`${addedPlaylistSongs.length == 0 && "col-span-2"} transition flex items-center justify-center btn shadow-sm bg-pink-500 shadow-pink-500/30 text-white w-full disabled-button`}
                        onClick={searchForTracks}>
                        <FaSearch className="mr-2" />
                        Search
                    </button>

                    {addedPlaylistSongs.length > 0 && (

                        <button
                            disabled={searchTerm === ""}
                            className="transition flex items-center justify-center btn shadow-sm bg-blue-500 shadow-pink-500/30 text-white w-full disabled-button"
                            onClick={handleClickOnCurrentPlaylist}>
                            <RiPlayListFill className="mr-2" />
                            View Current Playlist
                        </button>
                    )}




                </motion.div>
            </form>

            {/* <h1 className="flex text-sm my-8 text-black/50 justify-center items-center text-center">
                <FaSpotify className="mr-2" />
                Search powered by Spotify
            </h1> */}

            {!loading && searchResults.length == 0 && (
                <div className="my-32 dark:text-white/50 text-black/50 flex flex-col items-center justify-center text-center">
                    <FaSearch className="text-2xl my-5" />
                    <p className="text-sm">
                        Search for the songs you already like, and add them to your list!
                    </p>
                </div>
            )}

            {loading && (
                <div className="flex justify-center items-center">
                    <LoadingSpinner loading={loading} />
                </div>
            )}

            <motion.div
                transition={{
                    type: "tween",
                    ease: "easeOut"
                }}
                className="my-5 grid gap-2 md:grid-cols-2">

                <AnimatePresence>
                    {!loading && searchResults.map((track, index) => {
                        return (
                            <SpotifySong track={track} key={track.id} />
                        )
                    })}
                </AnimatePresence>
            </motion.div>


            <AnimatePresence>
                {addedSongs.length > 0 && (

                    <DoneButton onClick={() => setShowAddedSongs(true)} k={addedSongs.length} />
                )}
            </AnimatePresence>

            {/* Added songs */}
            <AnimatePresence>
                {showAddedSongs && (
                    <AddedSongs onClose={() => setShowAddedSongs(false)} />
                )}
            </AnimatePresence>


            <AnimatePresence>
                {showAddedPlaylistSongs && (
                    <AddedPlaylistSongs onClearAll={() => dispatch(clearSongsFromPlaylist())} onClose={() => setShowAddedPlaylistSongs(false)} />
                )}
            </AnimatePresence>


            <AnimatePresence>
                {playlistLink && (
                    // Clear the playlist link on close (so it hides the modal)
                    <CreatedPlaylistModal onClose={() => {
                        dispatch(clearPlaylistLink())
                    }} playlistLink={playlistLink} />
                )}
            </AnimatePresence>

            <Footer />

        </Container >
    )
}

export default Search;