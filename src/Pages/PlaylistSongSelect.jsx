import { useState, useEffect } from "react";

import { FaRegSadCry } from "react-icons/fa"
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Container from "../Components/Container";

import { motion, AnimatePresence } from "framer-motion";
import SpotifySong from "../Components/SpotifySong";

import { useSelector } from "react-redux"
import AddedSongs from "../Components/AddedSongs";
import BackButton from "../Components/BackButton";
import Footer from "../Components/Footer";
import DoneButton from "../Components/DoneButton";

import SpotifyInstance from "../utils/SpotifyInstance";

import LoadingSpinner from "../Components/LoadingSpinner";
import useApiKey from "../hooks/useApiKey";
import Track from "../utils/Track";
import Artist from "../utils/Artist";

export default function PlaylistSongSelect() {

    let location = useLocation()
    let params = useParams();
    let navigate = useNavigate();

    let addedSongs = useSelector(state => state.songs);

    let [playlistSongs, setPlaylistSongs] = useState([]);
    let [showAddedSongs, setShowAddedSongs] = useState(false);
    let [loading, setLoading] = useState(true)


    const { apiKey, error, loggedIn } = useApiKey(`playlists`);

    useEffect(() => {
        if (Object.prototype.hasOwnProperty.call(params, 'id') === false) {
            navigate("/playlists")
        }

        (async () => {
            setLoading(true)
            await getPlaylistTracks();
            setLoading(false)
        })();
    }, [])

    useEffect(() => {
        console.log("Rechecking added songs against playlistSongs")

        let finalTracks = {};

        playlistSongs.forEach(playlistSong => {
            if (Object.prototype.hasOwnProperty.call(finalTracks, playlistSong.id)) {
                finalTracks[playlistSong.id].added = true
            } else {
                finalTracks[playlistSong.id] = playlistSong
                finalTracks[playlistSong.id].added = false;
            }
        })

        addedSongs.forEach(addedSong => {
            if (Object.prototype.hasOwnProperty.call(finalTracks, addedSong.id)) {
                finalTracks[addedSong.id].added = true
            }
        })

        setPlaylistSongs(Object.values(finalTracks))

    }, [addedSongs])

    function handleFormSubmit(e) {
        // Prevent default submit action
        e.preventDefault();
        // searchForTracks()
    }

    async function getPlaylistTracks() {
        let allPlaylistSongs = await SpotifyInstance.getTracksByPlaylistId(params.id)

        if (Object.prototype.hasOwnProperty.call(allPlaylistSongs, 'error')) {
            throw new Error(allPlaylistSongs.error.status)
        }

        let n = allPlaylistSongs.reverse().map(song => {
            let img = null;

            if (Object.prototype.hasOwnProperty.call(song, 'track') && song.track != null) {
                if (Object.prototype.hasOwnProperty.call(song.track, 'album') && song.track.album.images.length > 0 && song.track.album.images[0].hasOwnProperty("url")) {
                    img = song.track.album.images[0].url
                }

                const track = song.track;

                // Uses artist class
                const artists = track.artists.map(a => new Artist(a.id, a.name, a.external_urls.spotify, a.uri))

                // Uses track class
                const trackObj = new Track(track.id, track.name, artists, track.album.images[0].url, track.explicit, track.duration_ms, track.preview_url, track.external_urls.spotify, song.added_at)

                return trackObj;
            } else {
                return null
            }
        }).filter(song => song != null)

        let finalTracks = {};

        n.forEach(playlistSong => {
            if (Object.prototype.hasOwnProperty.call(finalTracks, playlistSong.id)) {
                finalTracks[playlistSong.id].added = true
            } else {
                finalTracks[playlistSong.id] = playlistSong
                finalTracks[playlistSong.id].added = false;
            }
        })

        addedSongs.forEach(addedSong => {
            if (Object.prototype.hasOwnProperty.call(finalTracks, addedSong.id)) {
                finalTracks[addedSong.id].added = true
            }
        })

        console.log(finalTracks)

        setPlaylistSongs(Object.values(finalTracks))
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
            <BackButton to="/playlists" />

            {/* <ProgressBar current={1} total={2} /> */}

            <div className="py-5 clear-both">
                <h1 className="font-bold text-2xl" >
                    Select from "{location.state.name}"
                </h1>

                <p className="dark:text-white/60 text-black/60">
                    Select your tracks from this playlist {!loading && `(${playlistSongs.length} songs)`} {!loading && playlistSongs.length < location.state.total && <span className="text-red-500">({location.state.total - playlistSongs.length} songs failed to load)</span>}
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

            {!loading && playlistSongs.length == 0 && (
                <div className="my-32 dark:text-white/50 text-black/50 flex flex-col items-center justify-center text-center">
                    <FaRegSadCry className="text-2xl my-5" />
                    <p className="text-sm">
                        This playlist doesn't have any songs
                    </p>
                </div>
            )}

            <div className="flex justify-center">
                <LoadingSpinner loading={loading} />
            </div>



            <AnimatePresence exitBeforeEnter>
                <motion.div
                    transition={{
                        type: "tween",
                        ease: "easeOut"
                    }}
                    className="my-5 grid gap-2">

                    {playlistSongs.map((track, index) => {
                        return (
                            <SpotifySong overrideTopText="added" track={track} key={track.id + "-" + index} />
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