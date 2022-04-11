import { useState, useEffect } from "react";

import { FaRedoAlt, FaSearch, FaHeart, FaSadCry} from "react-icons/fa"
import { RiPlayListFill, RiPlayListAddFill } from "react-icons/ri"
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Container from "../Components/Container";

import { motion, AnimatePresence } from "framer-motion";
import SpotifySong from "../Components/SpotifySong";

import { useSelector, useDispatch } from "react-redux"
import { setSearchResults, removeSong, setApiKey, setSearchTermRedux, clearSongsFromPlaylist, clearPlaylistLink, clearAddedSongs } from "../actions";
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
import useError from "../hooks/useError";
import ErrorMessage from "../Components/ErrorMessage";
import Artist from "../utils/Artist";
import Track from "../utils/Track";

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

    let { apiKey, loggedIn } = useApiKey("search");

    const [ error, setError ] = useState(null);


    useEffect(() => {
        if (searchTerm.length == 0) {
            dispatch(setSearchResults([]));
        }
    }, [searchTerm])

    useEffect(() => {

        console.log("Rechecking added songs against searchResults")

        let finalTracks = {};

        // Loop through objects and add to finalTracks
        searchResults.forEach(track => {
            // If the track is already in the finalTracks object, set the added property to true 
            if (Object.prototype.hasOwnProperty.call(finalTracks, track.id)) {
                finalTracks[track.id].added = true;
            } else {

                // If the track is not in the finalTracks object, add it to the finalTracks object
                finalTracks[track.id] = track;
                finalTracks[track.id].added = false;
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
    }, [addedSongs])

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

                const artists = track.artists.map(a => new Artist(a.id, a.name, a.external_urls.spotify, a.uri))

                const trackObj = new Track(track.id, track.name, artists, track.album.images[0].url, track.explicit, track.duration_ms, track.preview_url, track.external_urls.spotify)

                return trackObj
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
            setError(error.message)
        }
    }



    const handleClickOnCurrentPlaylist = () => {
        setShowAddedPlaylistSongs(true)
    }

    return (
        <Container>
            <LogOutButton />

            {/* <ProgressBar current={1} total={2} /> */}

            {error && (
                <ErrorMessage error={error} />
            )}

            <div className="my-5">
                <h1 className="font-bold text-2xl" >
                    Search for Songs
                </h1>
                <p className="dark:text-white/60 text-black/60">
                    Search for the songs that you already like.
                </p>

                <div className="nav my-5">
                    <p
                        className="text-sm font-semibold"
                    >Alternatively, select from</p>

                    <div className="flex flex-wrap gap-1.5 mt-2">
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


                {/* Search button */}
                <button
                    disabled={searchTerm === ""}
                    className={`mt-2 transition flex items-center justify-center btn shadow-sm bg-brandColor text-white w-full disabled-button`}
                    >
                    <FaSearch className="mr-2" />
                    Search
                </button>

            </form>

            {addedPlaylistSongs.length > 0 && (

                <button
                    className="mt-2 transition flex items-center justify-center btn shadow-sm bg-neutral-700 text-white w-full disabled-button"
                    onClick={() => setShowAddedPlaylistSongs(true)}>
                    <RiPlayListAddFill className="mr-2" />
                    View Current Playlist
                </button>
            )}

            {/* <h1 className="flex text-sm my-8 text-black/50 justify-center items-center text-center">
                <FaSpotify className="mr-2" />
                Search powered by Spotify
            </h1> */}

            {!loading && searchResults.length == 0 && (
                <div className="my-32 dark:text-white/50 text-black/50 flex flex-col items-center justify-center text-center">
                    <FaSadCry className="text-2xl my-5" />

                    <p className="text-sm">
                        You can start searching
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

                    <DoneButton item={addedSongs} onClick={() => setShowAddedSongs(true)} k={addedSongs.length} />
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