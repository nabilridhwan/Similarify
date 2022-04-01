import { useState, useEffect } from "react";
import SpotifyApi from "../utils/SpotifyApi";
import Recommendation from "./Recommendation";

import { FaSpotify, FaSearch } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom";
import Container from "../Components/Container";

import { motion, AnimatePresence } from "framer-motion";
import SpotifySong from "../Components/SpotifySong";

import { useSelector, useDispatch } from "react-redux"
import { setSearchResults, removeSong, setApiKey, setSearchTermRedux } from "../actions";
import AddedSongs from "../Components/AddedSongs";
import BackButton from "../Components/BackButton";
import Footer from "../Components/Footer";
import ProgressBar from "../Components/ProgressBar";
import DoneButton from "../Components/DoneButton";

// Import

let Spotify = new SpotifyApi();
function Search() {

    let searchTermRedux = useSelector(state => state.searchTerm);
    let [searchTerm, setSearchTerm] = useState(searchTermRedux);

    let searchResults = useSelector(state => state.searchResults);

    let apiKey = useSelector(state => state.apiKey);

    let addedSongs = useSelector(state => state.songs);
    let navigate = useNavigate();

    let [showAddedSongs, setShowAddedSongs] = useState(false);

    let dispatch = useDispatch();


    // Checks for token
    function checkForKey() {
        console.log("Checking for token")
        if (window.location.hash) {

            // Separate the access token from the '#' symbol
            let hashes = window.location.hash.substring(1).split("&");
            let hashes_value = hashes.map(hash => hash.split("=")[1]);
            const [access_token] = hashes_value;

            // Set the access token
            Spotify.setToken(access_token);
            dispatch(setApiKey(access_token));

            console.log("Token exists: From hash")
        }else if(apiKey){
            Spotify.setToken(apiKey);
            dispatch(setApiKey(apiKey));

            console.log("Token exists: From redux")
        } else {
            navigate("/authenticate")
        }
    }
    useEffect(() => {
        checkForKey();

        (async () => {

            console.log("Checking for expiry")
            try {
                let data = await Spotify.getUserData()
                if (data.hasOwnProperty("error")) {
                    throw new Error(data.error.status)
                }
                console.log("Token is not expired")
            } catch (error) {
                console.log("Token expired")
                navigate(`/error/${error.message}`)
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

            try {
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
            } catch (error) {
                // Reauthenticate user
                navigate("/authenticate")
            }
        }
    }

    return (
        <Container>
            <BackButton to="/" />

            {/* <ProgressBar current={1} total={2} /> */}

            <div className="my-5">
                <h1 className="font-bold text-2xl" >
                    Search for Songs
                </h1>
                <p className="dark:text-white/60 text-black/60">
                    Search for the songs that you already like or <Link to={"/likedsongs"} className="underline text-pink-500"> get recommendations from your liked songs!</Link>
                </p>

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
                    className="transition flex items-center justify-center btn shadow-sm bg-pink-500 shadow-pink-500/30 text-white w-full disabled-button  my-5"
                    onClick={searchForTracks}>
                    <FaSearch className="mr-2" />
                    Search
                </button>
            </form>

            {/* <h1 className="flex text-sm my-8 text-black/50 justify-center items-center text-center">
                <FaSpotify className="mr-2" />
                Search powered by Spotify
            </h1> */}

            {searchResults.length == 0 && (
                <div className="my-32 dark:text-white/50 text-black/50 flex flex-col items-center justify-center text-center">
                    <FaSearch className="text-2xl my-5" />
                    <p className="text-sm">
                        Search for the songs you already like, and add them to your list!
                    </p>
                </div>
            )}

            <AnimatePresence exitBeforeEnter>
                <motion.div
                    transition={{
                        type: "tween",
                        ease: "easeOut"
                    }}
                    className="my-5 grid gap-2 md:grid-cols-2">

                    {searchResults.map((track, index) => {
                        return (
                            <SpotifySong track={track} key={track.id} />
                        )
                    })}
                </motion.div>
            </AnimatePresence>


            {addedSongs.length > 0 && (

                <DoneButton onClick={() => setShowAddedSongs(true)} k={addedSongs.length} />
            )}

            {/* Added songs */}
            <AnimatePresence>
                {showAddedSongs && (
                    <AddedSongs onClose={() => setShowAddedSongs(false)} />
                )}
            </AnimatePresence>

            <Footer />

        </Container >
    )
}

export default Search;