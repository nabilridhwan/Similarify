import { useState, useEffect } from "react";
import SpotifyApi from "../utils/SpotifyApi";

import { FaRegSadCry } from "react-icons/fa"
import { useLocation, useNavigate } from "react-router-dom";
import Container from "../Components/Container";

import { motion, AnimatePresence } from "framer-motion";
import SpotifySong from "../Components/SpotifySong";

import { useSelector } from "react-redux"
import AddedSongs from "../Components/AddedSongs";
import BackButton from "../Components/BackButton";
import Footer from "../Components/Footer";
import DoneButton from "../Components/DoneButton";
import LoadingSpinner from "../Components/LoadingSpinner";
import LogOutButton from "../Components/LogOutButton";

// Import

let Spotify = new SpotifyApi();
export default function RecentlyPlayed() {

    let apiKey = useSelector(state => state.apiKey);

    let [recentlyPlayedSongs, setRecentlyPlayedSongs] = useState([]);
    let addedSongs = useSelector(state => state.songs);
    let navigate = useNavigate();

    let [showAddedSongs, setShowAddedSongs] = useState(false);

    let [loading, setLoading] = useState(true)

    // Checks for token
    function checkForKey() {
        console.log("Checking for token")
        if (!apiKey) {
            navigate("/authenticate")
        }
    }
    useEffect(() => {
        checkForKey();

        (async () => {
            try {
                Spotify.setToken(apiKey)
                let data = await Spotify.getUserData()

                setLoading(true)
                await getRecentlyPlayedSongs();
                setLoading(false)

                if (data.hasOwnProperty("error")) {
                    throw new Error(data.error.status)
                }
            } catch (error) {
                console.log(error.message)
                // navigate(`/error/${error.message}?from=${location.pathname}`, {state: {error: error.message}})
            }
        })();
    }, [])

    function handleFormSubmit(e) {
        // Prevent default submit action
        e.preventDefault();
        // searchForTracks()
    }

    async function getRecentlyPlayedSongs() {
        let recentlyPlayedSongs = await Spotify.getRecentlyPlayedSongs()

        console.log(recentlyPlayedSongs)
        if (recentlyPlayedSongs.hasOwnProperty("error")) {
            throw new Error(recentlyPlayedSongs.error.status)
        }

        let n = recentlyPlayedSongs.map(song => {
            return {
                added_at: song.played_at,
                id: song.track.id,
                name: song.track.name,
                artist: song.track.artists.map(a => a.name).join(", "),
                albumArt: song.track.album.images[0].url,
                added: false
            }
        })

        let finalTracks = {};

        n.forEach(recentlyPlayedSong => {
            console.log(finalTracks)
            if (!finalTracks.hasOwnProperty(recentlyPlayedSong.id)) {
                finalTracks[recentlyPlayedSong.id] = recentlyPlayedSong
            }
        })

        console.table(addedSongs)

        addedSongs.forEach(addedSong => {
            if (finalTracks.hasOwnProperty(addedSong.id)) {
                finalTracks[addedSong.id].added = true
            }
        })

        console.log(Object.values(finalTracks))

        setRecentlyPlayedSongs(Object.values(finalTracks))
    }

    // async function searchForTracks() {
    //     // Alert user that they need to enter something
    //     if (searchTerm === "") {
    //         alert("Please enter a search term!");
    //     } else {
    //         // Clear search results

    //         try {
    //             let sT = encodeURI(searchTerm.trim())

    //             console.log(`Searching Spotify for ${sT}`)
    //             let results = await Spotify.search(sT);

    //             let tracks = results.tracks.items.map(track => {
    //                 return {
    //                     name: track.name,
    //                     artist: track.artists.map(a => a.name).join(", "),
    //                     album: track.album.name,
    //                     albumArt: track.album.images[0].url,
    //                     id: track.id,
    //                 }
    //             })

    //             dispatch(setSearchResults(tracks, addedSongs));
    //         } catch (error) {
    //             // Reauthenticate user
    //             navigate("/authenticate")
    //         }
    //     }
    // }

    return (
        <Container>
            <BackButton />

            {/* <ProgressBar current={1} total={2} /> */}

            <div className="py-5 clear-both">
                <h1 className="font-bold text-2xl" >
                    Select from your Recently Played songs
                </h1>
                <p className="dark:text-white/60 text-black/60">
                    You liked a song from your Spotify recently?
                </p>
            </div>

            {/* Search form */}
            {/* <form onSubmit={handleFormSubmit}>
                <input
                    value={searchTerm}
                    className="search-box"
                    type="text"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Imagine Dragons" />


                <button
                    disabled={searchTerm === ""}
                    className="transition flex items-center justify-center btn shadow-sm bg-pink-500 shadow-pink-500/30 text-white w-full disabled-button  my-5"
                    onClick={searchForTracks}>
                    <FaSearch className="mr-2" />
                    Search
                </button>
            </form> */}

            {/* <h1 className="flex text-sm my-8 text-black/50 justify-center items-center text-center">
                <FaSpotify className="mr-2" />
                Search powered by Spotify
            </h1> */}

            {!loading && recentlyPlayedSongs.length == 0 && (
                <div className="my-32 dark:text-white/50 text-black/50 flex flex-col items-center justify-center text-center">
                    <FaRegSadCry className="text-2xl my-5" />
                    <p className="text-sm">
                        You don't have any recently played songs!
                    </p>
                </div>
            )}

            {loading && (
                <div className="flex items-center justify-center">
                    <LoadingSpinner loading={loading} />
                </div>
            )}


            <AnimatePresence exitBeforeEnter>
                <motion.div
                    transition={{
                        type: "tween",
                        ease: "easeOut"
                    }}
                    className="my-5 grid gap-2">

                    {recentlyPlayedSongs.map((track, index) => {
                        return (
                            <SpotifySong overrideTopText={"Played"} track={track} key={track.id + "-" + index} />
                        )
                    })}
                </motion.div>
            </AnimatePresence>


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

            <Footer />

        </Container >
    )
}