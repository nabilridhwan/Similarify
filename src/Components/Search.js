import { useState, useEffect } from "react";
import SpotifyApi from "../Libraries/SpotifyApi";
import LastFMResults from "./LastFMResults";

import { FaSpotify, FaMinusCircle, FaPlusCircle, FaTrash } from "react-icons/fa"
import { Link } from "react-router-dom";

let Spotify = new SpotifyApi();
function Search() {

    let [searchTerm, setSearchTerm] = useState("");
    let [searchResults, setSearchResults] = useState([]);

    let [addedSongs, setAddedSongs] = useState([]);

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
        } else {
            Spotify.authenticateUser();
        }
    }
    useEffect(() => {
        checkForKey();
    }, [token])

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
            setSearchResults([]);

            let sT = encodeURI(searchTerm.trim())

            console.log(`Searching Spotify for ${sT}`)
            let results = await Spotify.search(sT);

            let tracks = results.tracks.items.map(track => {
                return {
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    albumArt: track.album.images[0].url,
                    id: track.id,
                    added: false
                }
            })

            setSearchResults(tracks);
        }
    }

    function toggleAddedOnSearchResults(track) {
        setSearchResults([...searchResults].map(t => {
            if (t.id == track.id) {
                t.added = !t.added
            }

            return t
        }))
    }

    function addSearchSong(track) {
        toggleAddedOnSearchResults(track)
        setAddedSongs([...addedSongs, track]);
    }

    function removeSong(track) {
        setAddedSongs([...addedSongs].filter((song) => song.id != track.id))
        toggleAddedOnSearchResults(track)
    }

    return (
        <div>

            {addedSongs.length > 0 &&
                <div className="my-5">
                    <h2 className="text-2xl font-bold">Added Songs</h2>
                    <p className="text-black/60">All your added songs appear here!</p>
                    <div className="addedSongsAlbumArt flex my-5 flex-wrap">
                        {addedSongs.map((track, index) => {
                            return (
                                <div key={index} className="m-1">


                                        <div>
                                            <button onClick={() => removeSong(track)} className="btn bg-red-500 text-white flex justify-center items-center w-full mb-2">
                                                <FaTrash />
                                            </button>
                                        </div>
                                    <img key={index} className="w-24 rounded-lg" src={track.albumArt} alt={track.name} height="150px" />

                                </div>
                            )
                        })}

                    </div>

                    <Link to={`/lastfm`} state={{ addedSongs: addedSongs }} className="btn bg-blue-500 block text-white text-center shadow-md shadow-blue-200">Done</Link>
                </div>

            }

            <div className="my-5">
                <h1 className="font-bold text-2xl" >Search for Tracks</h1>
                <p className="text-black/60">Search for the tracks you already like</p>
            </div>

            {/* Search form */}
            <form onSubmit={handleFormSubmit}>
                <input className="px-4 py-2 rounded-lg w-full border border-black placeholder:text-black/50" type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search Term" />
            </form>

            {token ?
                <button className="btn shadow-lg bg-green-500 text-white w-full disabled:bg-black/50 disabled:text-white/50 my-5" onClick={searchForTracks}>Search</button>
                :
                <button disabled className="btn shadow-lg bg-green-500 text-white w-full disabled:bg-black/50 disabled:text-white/50 my-5" onClick={searchForTracks}>Search</button>
            }


            <div className="my-5">
                {searchResults.map((track, index) => {
                    return (

                        <div className="flex items-center" key={index}>
                            {/* Include alt */}
                            <img src={track.albumArt} className="w-20 h-auto" alt="album_image" />

                            <div className="ml-5">
                                <h5 className="font-bold">{track.name}</h5>
                                <p className="text-black/50">{track.artist}</p>


                                <div className="my-2 flex">
                                    <a href={`https://open.spotify.com/track/${track.id}`} className="btn w-auto flex flex-row items-center bg-green-500 text-white shadow-lg shadow-green-500/30 hover:bg-green-600 hover:shadow-none transition-all cursor-pointer"><FaSpotify /> Spotify</a>

                                    {!track.added ?
                                        <button onClick={() => addSearchSong(track)} className="btn bg-blue-500 text-white ml-2">
                                            <FaPlusCircle />
                                        </button>
                                        :
                                        <button onClick={() => removeSong(track)} className="btn bg-red-500 text-white ml-2">
                                            <FaMinusCircle />
                                        </button>}
                                </div>

                            </div>

                        </div>
                    )
                })}
            </div>
        </div >
    )
}

export default Search;