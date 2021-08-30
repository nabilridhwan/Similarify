import { useState } from "react";
import SpotifyApi from "../Libraries/SpotifyApi";
import LastFmApi from "../Libraries/LastFMApi";
import SearchResults from "./SearchResults";
import SimilarTracks from "./SimilarTracks";

function Search(props) {
    const { token } = props;
    let Spotify = new SpotifyApi(token)
    // TODO: Cleanup API Keys!
    // let LastFM = new LastFmApi("6781ea2b35ea58fe51999636078e0c96")
    const LAST_FM_API_KEY = "6781ea2b35ea58fe51999636078e0c96"
    let [searchResults, setSearchResults] = useState([]);
    let [query, setQuery] = useState("");
    let [songList, setSongList] = useState([]);
    let [similarTracksLoaded, setSimilarTracksLoaded] = useState(false);

    let handleChange = (e) => {
        setQuery(e.target.value);
    }

    // Remove default action on submit
    let handleSearch = async () => {
        setSimilarTracksLoaded(false)
        let searchData = await Spotify.search(query)
        setSearchResults(searchData.tracks.items);
    }

    function handleAddSong(name, artist) {
        let itemToPush = {
            name: name,
            artist: artist,
            similarTracks: []
        }
        // Check if there are duplicated in songList
        let index = songList.findIndex(item => item.name === name && item.artist === artist);
        if (index === -1) {
            // Otherwise add it
            setSongList([...songList, itemToPush]);
        }
    }

    async function handleDone() {
        setSimilarTracksLoaded(false)
        // Iterate through every item in songList
        // Pass the artist artist and name into LastFM.getSimilarTrack
        // Add the returned track to the songList under property LastFM

        let newSongList = [];

        songList.forEach(async (querySong, index) => {
            newSongList[index] = {
                ...querySong
            }


            // TODO: Implement limit as user's preference
            let limit = 5;
            let {artist, name} = querySong;
            let request = await fetch(`https://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=${artist}&track=${name}&api_key=${LAST_FM_API_KEY}&limit=${limit}&format=json`)
                .catch(error => console.log(error))

            let response = await request.json()
            let lastFMSongs = response.similartracks.track;



            let processedLFMS = lastFMSongs.map(track => {
                return {
                    name: track.name,
                    match: Math.floor(track.match * 100),
                    artist: track.artist.name,
                }
            })

            processedLFMS.forEach(async (track, newIndex) => {
                // Request from Spotify API
                // Get first item from search result (which has high possiblity of being the correct song)
                let song = await Spotify.searchFirstSong(track.name + " " + track.artist);

                // TODO: Handle if song is not found on Spotify
                let songData = {
                    album: song.album.name,
                    image: song.album.images[1].url,
                    match: track.match,
                    spotifyLink: song.external_urls.spotify,
                    spotifyId: song.id
                }

                newSongList[index].similarTracks[newIndex] = {
                    ...track,
                    ...songData
                };

            })

        })

        setSongList(newSongList);
        setSimilarTracksLoaded(true);
    }

    return (
        <div>
            <h1>Search for Tracks</h1>
            <form onSubmit={handleSearch}>
                <input type="text" value={query} onChange={handleChange} />
            </form>
            <button onClick={handleSearch}>Search</button>
            <button onClick={handleDone}>Done, get me my playlist!</button>


            {similarTracksLoaded === false && <SearchResults handleAddSong={handleAddSong} songs={searchResults} />}
            {similarTracksLoaded && <SimilarTracks songList={songList} />}
        </div>
    )
}

export default Search;