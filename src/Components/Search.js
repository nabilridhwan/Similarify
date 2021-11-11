import { useState } from "react";
import SpotifyApi from "../Libraries/SpotifyApi";
import LastFMResults from "./LastFMResults";

import { FaSpotify, FaTrash } from "react-icons/fa"

function Search(props) {
    const { token } = props;
    let Spotify = new SpotifyApi(token)

    let [searchTerm, setSearchTerm] = useState("");
    let [searchResults, setSearchResults] = useState([]);
    let [addedSongs, setAddedSongs] = useState([]);
    let [done, setDone] = useState(false);

    function handleFormSubmit(e) {
        // Prevent default submit action
        e.preventDefault();
        searchForTracks()
    }

    function handleSearchChange(e) {
        setSearchTerm(e.target.value);
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

    function addSearchSong(track) {

        // Search for song in search results and set the added property to true
        let newSearchResults = searchResults.map(result => {
            if (result.id === track.id) {
                result.added = true;
            }
            return result;
        })

        setSearchResults(newSearchResults);

        // Add song to added songs IF there is no duplicate in added songs
        let found = addedSongs.findIndex(song => {
            return (song.id === track.id)
        })

        if (found === -1) {
            setAddedSongs([...addedSongs, track]);
        }
    }

    function removeSong(track) {
        let found = addedSongs.findIndex(song => {
            return (song.id === track.id)
        })

        if (found !== -1) {
            let cloneAddedSongs = [...addedSongs]
            cloneAddedSongs.splice(found, 1)
            setAddedSongs(cloneAddedSongs)

            let newSearchResults = searchResults.map(result => {
                if (result.id === track.id) {
                    result.added = false;
                }
                return result;
            })

            setSearchResults(newSearchResults);
        }


    }

    function handleDone() {
        setDone(true);
    }

    function handleDoneFalse(){
        setDone(false);
    }

    return (
        <div>

            {addedSongs.length > 0 &&
                <div className="my-5">
                    <h2>Added Songs</h2>
                    <div className="addedSongsAlbumArt">
                        {addedSongs.map((track, index) => {
                            return (
                                <div className="addedSong" style={{ display: "flex", flexDirection: "column" }}>


                                    {done || <div className="d-grid">
                                        <button onClick={() => removeSong(track)} className="btn btn-danger">
                                            <FaTrash />
                                        </button>
                                    </div>}



                                    <img key={index} src={track.albumArt} alt={track.name} height="150px" />

                                </div>
                            )
                        })}

                    </div>

                    {done || <button className="btn btn-primary" onClick={() => handleDone()}>Done</button>}
                </div>

            }

            {
                done ?
                    <LastFMResults addedSongs={addedSongs} doneFunction={handleDoneFalse} />
                    :
                    <>
                        <div className="my-5">
                            <h1>Search for Tracks</h1>
                            <p>Search for the tracks you already like</p>
                        </div>

                        <form onSubmit={handleFormSubmit}>
                            <input className="form-control" type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search Term" />
                        </form>
                        <button className="btn btn-primary" onClick={searchForTracks}>Search</button>

                        <div className="row my-5">
                            {searchResults.map((track, index) => {
                                return (

                                    <div className="col-lg-3 card" key={index}>
                                        {/* Include alt */}
                                        <img src={track.albumArt} className="card-img-top" alt="album_image" />

                                        <div className="card-body">
                                            <a className="text-decoration-none" href={`https://open.spotify.com/track/${track.id}`}><FaSpotify /> Spotify</a>

                                            <h5 className="card-title">{track.name}</h5>
                                            <p className="card-text">{track.artist}</p>


                                            <br />

                                            {!track.added ? <button onClick={() => addSearchSong(track)} className="btn btn-success">Add Song</button> : <button onClick={() => removeSong(track)} className="btn btn-danger">Remove Song</button>}
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