import { useState, useEffect } from "react";
import SpotifyInstance from "../utils/SpotifyInstance";

import { FaRegSadCry } from "react-icons/fa"
import { useLocation, useNavigate } from "react-router-dom";
import Container from "../Components/Container";

import { motion, AnimatePresence } from "framer-motion";

import { useSelector } from "react-redux"
import AddedSongs from "../Components/AddedSongs";
import BackButton from "../Components/BackButton";
import Footer from "../Components/Footer";
import DoneButton from "../Components/DoneButton";
import Playlist from "../Components/Playlist";
import LoadingSpinner from "../Components/LoadingSpinner"
import LogOutButton from "../Components/LogOutButton";
import useApiKey from "../hooks/useApiKey";
import ErrorMessage from "../Components/ErrorMessage";

import PlaylistClass from "../utils/Playlist";

export default function Playlists() {

    let addedSongs = useSelector(state => state.songs);

    let [loading, setLoading] = useState(true);
    const location = useLocation();

    let navigate = useNavigate();

    const [playlists, setPlaylists] = useState([]);

    let [showAddedSongs, setShowAddedSongs] = useState(false);


    const { apiKey, loggedIn } = useApiKey("playlists");

    const [error, setError] = useState(null);

    // Checks for token
    useEffect(() => {
        (async () => {
            setLoading(true)
            await getUserPlaylists();
            setLoading(false)
        })();
    }, [])

    function handleFormSubmit(e) {
        // Prevent default submit action
        e.preventDefault();
        // searchForTracks()
    }

    async function getUserPlaylists() {
        setError(null);
        try {

            let playlists = await SpotifyInstance.getUserPlaylists()
            if (Object.prototype.hasOwnProperty.call(playlists, 'error')) {
                throw new Error(playlists.error.status)
            }


            if (Object.prototype.hasOwnProperty.call(playlists, 'items')) {

                let n = playlists.items.map(playlist => {

                    let img = null;

                    if (playlist.images.length > 0 && playlist.images[0].hasOwnProperty("url")) {
                        img = playlist.images[0].url
                    }

                    // Uses the playlist class
                    const playlistObj = new PlaylistClass(playlist.id, playlist.name, img, playlist.tracks.total, playlist.owner.display_name, playlist.external_urls.spotify)

                    return playlistObj
                })

                setPlaylists(n)
                // console.log(n)
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <Container>
            <BackButton to="/search" />

            {error && (
                <ErrorMessage error={error} />
            )}

            {/* <ProgressBar current={1} total={2} /> */}

            <div className="py-5 clear-both">
                <h1 className="font-bold text-2xl" >
                    Pick a playlist
                </h1>
                <p className="dark:text-white/60 text-black/60">
                    Select the songs you like from your Spotify playlists.
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

            {!loading && playlists.length == 0 && (
                <div className="my-32 dark:text-white/50 text-black/50 flex flex-col items-center justify-center text-center">
                    <FaRegSadCry className="text-2xl my-5" />
                    <p className="text-sm">
                        You don't have any playlists!
                    </p>
                </div>
            )}

            {loading && (
                <div className="flex justify-center items-center">
                    <LoadingSpinner loading={loading} />
                </div>
            )}


            <AnimatePresence exitBeforeEnter>
                <motion.div
                    transition={{
                        type: "tween",
                        ease: "easeOut"
                    }}
                    className="my-5 grid gap-5 lg:grid-cols-2">

                    {playlists.map((playlist, index) => {
                        return (
                            <Playlist key={playlist.id} playlist={playlist} />
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