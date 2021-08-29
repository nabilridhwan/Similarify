import { useState } from "react";
import SpotifyApi from "../Libraries/SpotifyApi";

function Search(props) {
    const { token } = props;
    let Spotify = new SpotifyApi(token)
    let [searchResults, setSearchResults] = useState([]);
    let [query, setQuery] = useState("");

    function handleChange(event) {
        setQuery(event.target.value)
    }

    async function handleSearch() {
        let data = await Spotify.search(query)
        setSearchResults(data.tracks.items)
    }

    return (
        <div>
            <h1>Search for Tracks</h1>
            <form onSubmit={handleSearch}>
                <input type="text" value={query} onChange={handleChange} />
            </form>
            <button onClick={handleSearch}>Search</button>

            {searchResults.map((track, index) => {
                return (
                    <div key={index}>
                        <img src={track.album.images[1].url} />
                        <h3>{track.name}</h3>
                        <p>{track.artists[0].name}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Search;