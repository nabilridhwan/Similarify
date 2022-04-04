import { useState, useEffect } from "react";
import SpotifyApi from "../utils/SpotifyApi";

import { FaRegSadCry } from "react-icons/fa"
import {  useNavigate } from "react-router-dom";
import Container from "../Components/Container";

import { motion, AnimatePresence } from "framer-motion";

import { useSelector} from "react-redux"
import AddedSongs from "../Components/AddedSongs";
import BackButton from "../Components/BackButton";
import Footer from "../Components/Footer";
import DoneButton from "../Components/DoneButton";
import Playlist from "../Components/Playlist";
import LoadingSpinner from "../Components/LoadingSpinner"
import LogOutButton from "../Components/LogOutButton";

let Spotify = new SpotifyApi();
export default function Playlists() {

    let apiKey = useSelector(state => state.apiKey);

    let [playlists, setPlaylists] = useState([]);
    let addedSongs = useSelector(state => state.songs);

    let [loading, setLoading] = useState(true);

    let navigate = useNavigate();

    let [showAddedSongs, setShowAddedSongs] = useState(false);

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
                await getUserPlaylists();
                setLoading(false)

                if (data.hasOwnProperty("error")) {
                    throw new Error(data.error.status)
                }
            } catch (error) {
                navigate(`/error?n=${error.message}`, {state: error})
            }
        })();
    }, [])

    function handleFormSubmit(e) {
        // Prevent default submit action
        e.preventDefault();
        // searchForTracks()
    }

    async function getUserPlaylists() {
        let playlists = await Spotify.getUserPlaylists()
        if (playlists.hasOwnProperty("error")) {
            throw new Error(playlists.error.status)
        }


        if (playlists.hasOwnProperty("items")) {

            let n = playlists.items.map(playlist => {

                console.log()

                let img = null;

                if (playlist.images.length > 0 && playlist.images[0].hasOwnProperty("url")) {
                    img = playlist.images[0].url
                }

                return {
                    id: playlist.id,
                    name: playlist.name,
                    albumArt: img,
                    tracks: playlist.tracks.total,
                    owner: playlist.owner.display_name
                }
            })

            setPlaylists(n)
            // console.log(n)
        }
    }

    return (
        <Container>
            <BackButton />

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
                    className="my-5 grid gap-2">

                    {playlists.map((playlist, index) => {
                        return (
                            <Playlist key={playlist.id} playlist={playlist} />
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