import { useState } from "react";
import SpotifyApi from "../Libraries/SpotifyApi";
import LastFMApi from "../Libraries/LastFMApi";

function Search(props) {
    const { token } = props;
    let Spotify = new SpotifyApi(token)
    // TODO: Cleanup API Keys!
    let LastFM = new LastFMApi("6781ea2b35ea58fe51999636078e0c96")

    let [searchTerm, setSearchTerm] = useState("");
    let [searchResults, setSearchResults] = useState([]);
    let [addedSongs, setAddedSongs] = useState([]);
    let [done, setDone] = useState(false);
    let [lastFMData, setLastFMData] = useState([]);

    function handleFormSubmit(e) {
        // Prevent default submit action
        e.preventDefault();
        searchForTracks()
    }

    function handleSearchChange(e) {
        setSearchTerm(e.target.value);
    }

    async function searchForTracks() {

        // Clear search results
        setSearchResults([]);

        console.log(`Searching Spotify for ${searchTerm}`)
        let results = await Spotify.search(searchTerm);

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
            if (song.id === track.id) {
                return true;
            }
        })

        if (found === -1) {
            setAddedSongs([...addedSongs, track]);
            console.log(addedSongs);
        }
        console.log(track)
    }

    function removeSong(track) {
        let found = addedSongs.findIndex(song => {
            if (song.id === track.id) {
                return true;
            }
        })

        if (found != -1) {
            let cloneAddedSongs = [...addedSongs]
            cloneAddedSongs.splice(found, 1)
            console.log(cloneAddedSongs)
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

    async function handleDone(){
        console.log("Fetching data from LastFM")
        setDone(true)

        addedSongs.forEach(async song => {
            let results = await LastFM.getSimilarTrack(song.artist, song.name, 5)
            setLastFMData([...lastFMData, results])
        })
    }

    return (
        <div>
            <h1>Search for Tracks</h1>

            {addedSongs.length > 0 && 
                <div className="addedSongsAlbumArt">
                    {addedSongs.map(track => {
                        return (
                            <img src={track.albumArt} alt={track.name} height="150px" />
                        )
                    })}

                    {/* TODO: Set done function properly */}
                    <button className="btn btn-primary" onClick={() => handleDone()}>Done</button>
                </div>
            }

            {
                done ?
                
                <>
                    {JSON.stringify(lastFMData)}
                </>
                
                :

                <>
                    <form onSubmit={handleFormSubmit}>
                        <input className="form-control" type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search Term" />
                    </form>
                    <button className="btn btn-primary" onClick={searchForTracks}>Search</button>

                    {searchResults.map((track, index) => {
                        return (

                            <div className="card" style={{ width: "18rem" }} key={index}>
                                {/* Include alt */}
                                <img src={track.albumArt} className="card-img-top" />

                                <div className="card-body">
                                    <h5 className="card-title">{track.name}</h5>
                                    <p className="card-text">{track.artist}</p>

                                    {!track.added ? <button onClick={() => addSearchSong(track)} className="btn btn-success">Add Song</button> : <button onClick={() => removeSong(track)} className="btn btn-danger">Remove Song</button>}
                                </div>
                            </div>
                        )
                    })}
                </>
            }
            
        </div >
    )
}

export default Search;