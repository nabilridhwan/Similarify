import { motion } from "framer-motion"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SpotifyApi from "../utils/SpotifyApi";
import LoadingSpinner from "./LoadingSpinner";
import Playlist from "./Playlist";

let Spotify = new SpotifyApi();
export default function AddToExistingPlaylist({ uris, onAdded, onClose }) {

    const apiKey = useSelector(state => state.apiKey);
    const addedPlaylistSongs = useSelector(state => state.playlistSongs);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const [playlists, setPlaylists] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        (async () => {
            // Check if the user is still logged in
            console.log("Checking for expiry")
            Spotify.setToken(apiKey)

            try {
                let data = await Spotify.getUserData()
                if (data.hasOwnProperty("error")) {
                    throw new Error(data.error.status)
                }

                setLoading(true)
                await getUserPlaylists();
                setLoading(false)


                console.log("Token is not expired")
            } catch (error) {
                console.log("Token expired")
                navigate(`/error/${error.message}`)
            }
        })();
    }, [])

    async function getUserPlaylists() {
        let playlists = await Spotify.getUserPlaylists()
        if (playlists.hasOwnProperty("error")) {
            throw new Error(playlists.error.status)
        }


        if (playlists.hasOwnProperty("items")) {

            let n = playlists.items.map(playlist => {
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
        }
    }

    // TODO: Do not add duplicate songs
    const handleClickPlaylist = async (playlist) => {
        setError("");
        const uris = addedPlaylistSongs.map(song => song.uri)

        setMessage("Adding songs to playlist...")
        await Spotify.addTracksToPlaylist(playlist.id, uris)
            .then(data => {
                // console.log(data)
                if (data.hasOwnProperty("error")) {
                    // Throw the error
                    throw new Error(data.error.message)
                }

                // Run the on added function
                onAdded(data.link)
            }).catch(error => {
                console.log(error)
                setError(error.message)
            }).finally(() => {
                setMessage("")
            })
    }

    return (
        <motion.div
            initial={{ opacity: 0, }}
            animate={{ opacity: 1, }}
            exit={{ opacity: 0, }}
            className="bg-black/70 fixed flex justify-center items-center top-0 left-0 w-screen h-screen">

            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="border border-black/10 dark:border-white/10 bg-white dark:bg-darkCard w-11/12 md:w-1/3 mx-7 p-4 rounded-lg">

                <div className="my-5 flex space-x-2 items-center">

                    <div>

                        <h1 className="font-bold text-2xl" >
                            Pick a playlist
                        </h1>

                        <p className="text-black/60 dark:text-white/60 mt-2">
                            Select a playlist to add your songs to
                        </p>

                        {error && (

                            <p className="text-sm text-red-500 mt-2">
                                {error}
                            </p>
                        )}


                        {message && (
                            <p className="text-sm text-black/50 dark:text-white/50 mt-2">
                                {message}
                            </p>
                        )}
                    </div>
                </div>

                {!loading && (
                    <div className="overflow-y-scroll overflow-x-hidden scroll-m-2 h-56 p-2 grid gap-4">
                        {playlists.map(playlist => {
                            return <Playlist key={playlist.id} compact={true} onClickPlaylist={handleClickPlaylist} playlist={playlist} />
                        })}
                    </div>
                )}

                {loading && (


                    <div className="flex justify-center items-center my-20">

                        <LoadingSpinner loading={loading} />

                    </div>
                )}

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose} className="btn  bg-red-500 text-white w-full mt-3">
                    Cancel
                </motion.button>
            </motion.div>

        </motion.div>
    )
}