import { useState, useEffect } from "react";

import { FaRegSadCry } from "react-icons/fa"
import { useLocation, useNavigate } from "react-router-dom";
import Container from "../Components/Container";

import { motion, AnimatePresence } from "framer-motion";
import SpotifySong from "../Components/SpotifySong";

import { useDispatch, useSelector } from "react-redux"
import AddedSongs from "../Components/AddedSongs";
import BackButton from "../Components/BackButton";
import Footer from "../Components/Footer";
import DoneButton from "../Components/DoneButton";
import LoadingSpinner from "../Components/LoadingSpinner";
import LogOutButton from "../Components/LogOutButton";
import SpotifyInstance from "../utils/SpotifyInstance";
import useApiKey from "../hooks/useApiKey";
import ErrorMessage from "../Components/ErrorMessage";
import CurrentlyPlaying from "../Components/CurrentlyPlaying";
import { addSong, removeSong } from "../actions";
import Artist from "../utils/Artist";
import Track from "../utils/Track";

// Import

export default function RecentlyPlayed() {

    let [recentlyPlayedSongs, setRecentlyPlayedSongs] = useState([]);
    let addedSongs = useSelector(state => state.songs);
    let navigate = useNavigate();


    let [showAddedSongs, setShowAddedSongs] = useState(false);

    let [loading, setLoading] = useState(true)
    let [currentlyPlayedLoading, setCurrentlyPlayingLoading] = useState(true)

    const { apiKey, loggedIn } = useApiKey("recentlyplayed");

    const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

    const [error, setError] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            setLoading(true)
            await getRecentlyPlayedSongs();
            setLoading(false)
        })();

        (async () => {
            await getCurrentlyPlayed();
        })();
    }, [])

    useEffect(() => {
        let finalTracks = {};

        recentlyPlayedSongs.forEach(recentlyPlayedSong => {
            if (!Object.prototype.hasOwnProperty.call(finalTracks, recentlyPlayedSong.id)) {
                finalTracks[recentlyPlayedSong.id] = recentlyPlayedSong
                finalTracks[recentlyPlayedSong.id].added = false;
            }
        })


        addedSongs.forEach(addedSong => {
            if (Object.prototype.hasOwnProperty.call(finalTracks, addedSong.id)) {
                finalTracks[addedSong.id].added = true
            }

        })

        setRecentlyPlayedSongs(Object.values(finalTracks))
    }, [addedSongs])

    function handleFormSubmit(e) {
        // Prevent default submit action
        e.preventDefault();
        // searchForTracks()
    }

    async function getCurrentlyPlayed() {
        try {
            setCurrentlyPlayingLoading(true)
            let currentlyPlayed = await SpotifyInstance.getCurrentlyPlayed();
            setCurrentlyPlayingLoading(false)

            if (Object.prototype.hasOwnProperty.call(currentlyPlayed, "item")) {

                const track = currentlyPlayed.item

                const artists = track.artists.map(artist => new Artist(artist.id, artist.name, artist.external_urls.spotify, artist.uri));

                const trackObj = new Track(track.id, track.name, artists, track.album.images[0].url, track.explicit, track.duration_ms, track.preview_url, track.external_urls.spotify)

                // Check if currently playing song is already in the list
                addedSongs.forEach(addedSong => {
                    if (addedSong.id === trackObj.id) {
                        trackObj.added = true
                    }
                })

                setCurrentlyPlaying(trackObj);
            }
        } catch (e) {
            console.log("Couldn't get currently playing or user is not playing anything.")
        }
    }

    async function getRecentlyPlayedSongs() {
        try {
            let recentlyPlayedSongs = await SpotifyInstance.getRecentlyPlayedSongs()

            if (Object.prototype.hasOwnProperty.call(recentlyPlayedSongs, 'error')) {
                throw new Error(recentlyPlayedSongs.error.status)
            }

            let n = recentlyPlayedSongs.map(song => {
                const track = song.track;

                const artists = track.artists.map(a => new Artist(a.id, a.name, a.external_urls.spotify, a.uri))

                // Uses track class
                const trackObj = new Track(track.id, track.name, artists, track.album.images[0].url, track.explicit, track.duration_ms, track.preview_url, track.external_urls.spotify, song.played_at)

                return trackObj;
            })

            let finalTracks = {};

            n.forEach(recentlyPlayedSong => {
                if (!Object.prototype.hasOwnProperty.call(finalTracks, recentlyPlayedSong.id)) {
                    finalTracks[recentlyPlayedSong.id] = recentlyPlayedSong
                    finalTracks[recentlyPlayedSong.id].added = false;
                }
            })

            addedSongs.forEach(addedSong => {
                if (Object.prototype.hasOwnProperty.call(finalTracks, addedSong.id)) {
                    finalTracks[addedSong.id].added = true
                }

            })

            setRecentlyPlayedSongs(Object.values(finalTracks))

        } catch (error) {
            setError(error.message)
        }
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



            <BackButton to="/search" />

            {error && (
                <ErrorMessage error={error} />
            )}

            {/* <ProgressBar current={1} total={2} /> */}

            <div className="py-5 clear-both">
                <h1 className="font-bold text-2xl" >
                    Select from your Recently Played songs
                </h1>
                <p className="dark:text-white/60 text-black/60">
                    You liked a song from your Spotify recently?
                </p>
            </div>
            <motion.div
                layout="position"
            >
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



                {currentlyPlaying && (
                    <CurrentlyPlaying handleAdd={(track) => {
                        dispatch(addSong(track))
                    }}
                        loading={currentlyPlayedLoading}
                        handleRemove={(track) => {
                            dispatch(removeSong(track))
                        }}

                        handleRefresh={async () => {
                            await getCurrentlyPlayed();
                        }}

                        track={currentlyPlaying} />
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


            <Footer />
        </Container >
    )
}