import {useState, useEffect} from 'react';
import LastFMApi from '../Libraries/LastFMApi';

export default function LastFMResults({addedSongs}){
    const LastFM = new LastFMApi("6781ea2b35ea58fe51999636078e0c96")
    let [songs, setSongs] = useState([]);

    useEffect(() => {
        fetchSimilarSongs();
    }, [])

    let fetchSimilarSongs = async () => {
        let cloneSongs = [...addedSongs];
        addedSongs.forEach(async song => {
            console.log(song)
            let r = await LastFM.getSimilarTrack(song.artist, song.name, 5)

            console.log(r)
            // Map each item in songs

            r = r.map(item => {
                return {
                    name: item.name,
                    match: item.match,
                    duration: item.duration,
                    artist: item.artist.name,
                }   
            })

            let mappedArray = cloneSongs.map(s => {
                if(s.name === song.name && s.artist === song.artist){
                    s.similar = r;
                }
                return s;
            })

            setSongs(mappedArray);

        })
    }
    
    return(
        <div>
            <button onClick={fetchSimilarSongs} className="btn btn-danger">Refresh (Only use this when there is no results)</button>

            {songs.map(song => {
                if(song.similar){
                    return song.similar.map(s => {
                        return(
                            <div>
                                <h3>{song.name} by {song.artist}</h3>
                                <p>{s.name}</p>
                                {/* <p>{convertSecondsToMinutesAndSeconds(parseInt(s.duration))}</p> */}
                                <p>{s.artist}</p>
                                <p>{Math.round(parseFloat(s.match) * 100)}% Match</p>
                            </div>
                        )
                    })
                }
            })}
        </div>
    )
}