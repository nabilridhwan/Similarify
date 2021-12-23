import { useState, useEffect } from "react";
import SpotifyApi from "../Libraries/SpotifyApi";
import LastFMResults from "./LastFMResults";

import { FaSpotify, FaTrash } from "react-icons/fa"
import { Link } from "react-router-dom";

function Search(props) {
    let Spotify = new SpotifyApi();

    let [searchTerm, setSearchTerm] = useState("");
    let [searchResults, setSearchResults] = useState([]);

    let [addedSongs, setAddedSongs] = useState([]);
    let [done, setDone] = useState(false);

    let [token, setToken] = useState();

    function checkForKey(window) {
        if (window.location.hash) {
            let hashes = window.location.hash.substring(1).split("&");
            const access_token = 0;
            let hashes_value = hashes.map(hash => hash.split("=")[1]);
            setToken(hashes_value[access_token]);
        }
    }
    useEffect(() => {
        if (token !== "" && token !== null) {
            checkForKey(window);
            Spotify.setToken(token);
        } else {
            new SpotifyApi().authenticateUser();
        }
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
        <div className="container-md mx-auto h-screen font-mono">

            {addedSongs.length > 0 &&
                <div className="my-5">
                    <h2>Added Songs</h2>
                    <div className="addedSongsAlbumArt flex">
                        {addedSongs.map((track, index) => {
                            return (
                                <div key={index}>


                                    {done ||
                                        <div>
                                            <button onClick={() => removeSong(track)} className="btn bg-red-500 text-white flex items-center w-full text-center">
                                                <FaTrash />
                                                <p className="ml-2">Remove</p>
                                            </button>
                                        </div>
                                    }
                                    <img key={index} className="w-36" src={track.albumArt} alt={track.name} height="150px" />

                                </div>
                            )
                        })}

                    </div>
                    
                    <Link to={`/lastfm`} state={{addedSongs: addedSongs}}>Done</Link>
                    {done || <button className="btn btn-primary" onClick={() => setDone(true)}>Done</button>}
                </div>

            }

            {
                done ?
                    <LastFMResults addedSongs={addedSongs} doneFunction={() => setDone(false)} />
                    :
                    <>
                        <div className="my-5">
                            <h1 className="font-bold text-2xl" >Search for Tracks</h1>
                            <p>Search for the tracks you already like</p>
                        </div>

                        {/* Search form */}
                        <form onSubmit={handleFormSubmit}>
                            <input className="px-4 py-2 rounded-lg w-full border border-black placeholder:text-black/50" type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search Term" />
                        </form>
                        <button className="btn shadow-lg bg-green-500 text-white w-full" onClick={searchForTracks}>Search</button>

                        <div className="my-5">
                            {searchResults.map((track, index) => {
                                return (

                                    <div className="flex" key={index}>
                                        {/* Include alt */}
                                        <img src={track.albumArt} className="w-36 aspect-square" alt="album_image" />

                                        <div className="ml-5">
                                            <h5 className="font-bold">{track.name}</h5>
                                            <p className="text-black/50">{track.artist}</p>


                                            <div className="my-2">
                                                <a href={`https://open.spotify.com/track/${track.id}`} className="btn flex flex-row items-center bg-green-500 text-white shadow-lg shadow-green-500/30 hover:bg-green-600 hover:shadow-none transition-all cursor-pointer w-52"><FaSpotify />Open in Spotify</a>
                                            </div>

                                        </div>

                                        <div className="ml-auto">
                                            {!track.added ? <button onClick={() => addSearchSong(track)} className="btn bg-blue-500 text-white">+</button> : <button onClick={() => removeSong(track)} className="btn bg-red-500 text-white">-</button>}
                                        </div>

                                    </div>
                                )
                            })}
                        </div>
                    </>
            }

        </div >
    )
}

export default Search;