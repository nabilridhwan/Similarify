import { useState, useEffect } from "react";
import SpotifyApi from "../utils/SpotifyApi";
import LastFMResults from "./LastFMResults";

import { FaSpotify, FaSearch } from "react-icons/fa"
import { Link } from "react-router-dom";
import Container from "../Components/Container";

import { motion, AnimatePresence } from "framer-motion";
import SpotifySong from "../Components/SpotifySong";

import { useSelector, useDispatch } from "react-redux"
import setSearchResults, { removeSong, setApiKey, setSearchTermRedux } from "../actions";
import AddedSongs from "../Components/AddedSongs";
import BackButton from "../Components/BackButton";

// Import

let Spotify = new SpotifyApi();
function Search() {

    let searchTermRedux = useSelector(state => state.searchTerm);
    let [searchTerm, setSearchTerm] = useState(searchTermRedux);

    let searchResults = useSelector(state => state.searchResults);

    let addedSongs = useSelector(state => state.songs);

    let [showAddedSongs, setShowAddedSongs] = useState(false);

    let dispatch = useDispatch();

    let [token, setToken] = useState();

    function checkForKey() {
        if (window.location.hash) {

            // Separate the access token from the '#' symbol
            let hashes = window.location.hash.substring(1).split("&");
            const access_token = 0;
            let hashes_value = hashes.map(hash => hash.split("=")[1]);

            // Set the access token
            setToken(hashes_value[access_token]);
            Spotify.setToken(hashes_value[access_token]);
            dispatch(setApiKey(hashes_value[access_token]));
        } else {
            Spotify.authenticateUser();
        }
    }
    useEffect(() => {
        checkForKey();

        (async () => {
            try {
                await Spotify.getUserData();
            } catch (error) {
                window.location = "/error"
            }
        })();
    }, [])

    function handleFormSubmit(e) {
        // Prevent default submit action
        e.preventDefault();
        searchForTracks()
    }

    async function searchForTracks() {
        // Alert user that they need to enter something
        if (searchTerm === "") {
            alert("Please enter a search term!");
        } else {
            // Clear search results

            let sT = encodeURI(searchTerm.trim())


            dispatch(setSearchTermRedux(searchTerm.trim()))

            console.log(`Searching Spotify for ${sT}`)
            let results = await Spotify.search(sT);

            let tracks = results.tracks.items.map(track => {
                return {
                    name: track.name,
                    artist: track.artists.map(a => a.name).join(", "),
                    album: track.album.name,
                    albumArt: track.album.images[0].url,
                    id: track.id,
                }
            })

            dispatch(setSearchResults(tracks, addedSongs));
        }
    }

    return (
        <Container>
            <BackButton to="/" />

            <div className="my-5">
                <h1 className="font-bold text-2xl" >Search for Tracks</h1>
                <p className="text-black/60">Search for the tracks you already like</p>
            </div>

            {/* Search form */}
            <form onSubmit={handleFormSubmit}>
                <input value={searchTerm} className="search-box" type="text" onChange={(e) => setSearchTerm(e.target.value)} placeholder="Imagine Dragons" />


                {/* Search button */}
                <button
                    className="flex items-center justify-center btn shadow-md bg-pink-500 shadow-pink-500/50 text-white w-full disabled:bg-black/50 disabled:text-white/50 my-5"
                    onClick={searchForTracks}>
                    <FaSearch className="mr-2" />
                    Search
                </button>
            </form>

            <h1 className="flex text-sm my-8 text-black/50 justify-center items-center text-center">
                <FaSpotify className="mr-2" />
                Search powered by Spotify
            </h1>

            {searchResults.length == 0 && (
                <div className="my-32 text-center">
                    <h1 className="font text-2xl" >
                        Search on!
                    </h1>
                    <p className="text-black/50 text-sm">
                        Search for the tracks you already like, and add them to your list!
                    </p>
                </div>
            )}


            <AnimatePresence exitBeforeEnter>
                <motion.div layout className="my-5 grid md:grid-cols-2">

                    {searchResults.map((track, index) => {
                        return (
                            <SpotifySong track={track} key={index} />
                        )
                    })}
                </motion.div>
            </AnimatePresence>


            {addedSongs.length > 0 && (

                <div
                    className="w-full flex items-center justify-center">
                    <motion.button
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        layout
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowAddedSongs(!showAddedSongs)} className="rounded-lg p-3 px-8 font-bold text-white shadow-lg shadow-green-400/80 fixed bottom-5  bg-green-500 ">

                            Done

                        <div className="absolute w-8 p-1 -top-2 -right-2 bg-red-500 rounded-full shadow-md shadow-red-500">
                            {addedSongs.length}
                        </div>
                    </motion.button>


                </div>
            )}

            {/* Added songs */}
            <AnimatePresence>
                {showAddedSongs && (
                    <AddedSongs onClose={() => setShowAddedSongs(false)} />
                )}
            </AnimatePresence>

        </Container >
    )
}

export default Search;