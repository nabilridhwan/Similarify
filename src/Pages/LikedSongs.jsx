import { useState, useEffect } from "react";

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

import SpotifyInstance from "../utils/SpotifyInstance"
import useApiKey from "../hooks/useApiKey";
import ErrorMessage from "../Components/ErrorMessage";
import useError from "../hooks/useError";
import Track from "../utils/Track";
import Artist from "../utils/Artist";

// Import

export default function LikedSongs() {

    let [likedSongs, setLikedSongs] = useState([]);
    let addedSongs = useSelector(state => state.songs);
    let navigate = useNavigate();

    let [showAddedSongs, setShowAddedSongs] = useState(false);

    let [loading, setLoading] = useState(true)

    const { error, setError } = useError();

    const { apiKey, error: e, loggedIn } = useApiKey("likedsongs");
    

    useEffect(() => {
        (async () => {
            await getLikedSongs();
            setLoading(false)
        })();
    }, [])

    useEffect(() => {
        console.log("Rechecking added songs against likedSongs")
        let finalTracks = {};

        likedSongs.forEach(likedSong => {
            if (Object.prototype.hasOwnProperty.call(finalTracks, likedSong.id)) {
                finalTracks[likedSong.id].added = true
            } else {
                finalTracks[likedSong.id] = likedSong
                finalTracks[likedSong.id].added = false
            }
        })

        addedSongs.forEach(addedSong => {
            if (Object.prototype.hasOwnProperty.call(finalTracks, addedSong.id)) {
                finalTracks[addedSong.id].added = true
            }
        })

        setLikedSongs(Object.values(finalTracks))
    }, [addedSongs])

    function handleFormSubmit(e) {
        // Prevent default submit action
        e.preventDefault();
        // searchForTracks()
    }

    async function getLikedSongs() {
        try {
            let likedSongs = await SpotifyInstance.getLikedSongs()
            if (Object.prototype.hasOwnProperty.call(likedSongs, 'error')) {
                throw new Error(likedSongs.error.status)
            }

            let n = likedSongs.map(song => {
                const track = song.track;

                // Uses artist class
                const artists = track.artists.map(a => new Artist(a.id, a.name, a.external_urls.spotify, a.uri))

                // Uses track class
                const trackObj = new Track(track.id, track.name, artists, track.album.images[0].url, track.explicit, track.duration_ms, track.preview_url, track.external_urls.spotify, song.added_at)

                return trackObj
            })

    console.log("WHATT")
            let finalTracks = {};

            n.forEach(likedSong => {
                if (Object.prototype.hasOwnProperty.call(finalTracks, likedSong.id)) {
                    finalTracks[likedSong.id].added = true
                } else {
                    finalTracks[likedSong.id] = likedSong
                    finalTracks[likedSong.id].added = false
                }
            })

            addedSongs.forEach(addedSong => {
                if (Object.prototype.hasOwnProperty.call(finalTracks, addedSong.id)) {
                    finalTracks[addedSong.id].added = true
                }
            })

            setLikedSongs(Object.values(finalTracks))
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
        <Container goBack={true}>
            <BackButton to={"/search"} />

            {/* <ProgressBar current={1} total={2} /> */}

            <div className="py-5 clear-both">
                <h1 className="font-bold text-2xl" >
                    Select from your liked songs
                </h1>
                <p className="dark:text-white/60 text-black/60">
                    Select songs that you already like
                </p>


            </div>

            {error && (
                <ErrorMessage error={error} />
            )}

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

            {!loading && likedSongs.length == 0 && (
                <div className="my-32 dark:text-white/50 text-black/50 flex flex-col items-center justify-center text-center">
                    <FaRegSadCry className="text-2xl my-5" />
                    <p className="text-sm">
                        You don't have any liked songs!
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

                    {likedSongs.map((track, index) => {
                        return (
                            <SpotifySong track={track} key={track.id} />
                        )
                    })}
                </motion.div>
            </AnimatePresence>


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