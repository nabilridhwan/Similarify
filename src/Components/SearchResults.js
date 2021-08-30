function SearchResults(props) {

    let { songs, handleAddSong } = props

    function handleClick(name, artist){
        handleAddSong(name, artist)
    }
    
    return (
        <div>
            {songs.map((song, index) => {
                return (
                    <div key={index}>
                        <img src={song.album.images[1].url} alt={song.album.name + " album cover image"} />
                        <p className="songName">{song.name}</p>
                        <p className="artistName">{song.artists[0].name}</p>
                        <button onClick={() => handleClick(song.name, song.artists[0].name)}>Add Song!</button>
                    </div>
                )
            })}
        </div>
    )
}

export default SearchResults;