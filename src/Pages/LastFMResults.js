import { useState, useEffect } from 'react';
import LastFMApi from '../utils/LastFMApi';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useLocation } from 'react-router-dom';
import { FaSpotify } from "react-icons/fa";

import { useSelector } from 'react-redux';
import SpotifyApi from '../utils/SpotifyApi';

let spotifyApi = new SpotifyApi();

const LastFM = new LastFMApi();
LastFM.setApiKey(process.env.REACT_APP_LASTFM_API_KEY);
export default function LastFMResults() {
    let [songs, setSongs] = useState([]);

    const  addedSongs  = useSelector(state => state.songs);
    const apiKey = useSelector(state => state.apiKey);

    useEffect(() => {
        console.log(apiKey)
        spotifyApi.setToken(apiKey);
        fetchSimilarSongs();
    }, [])

    let fetchSimilarSongs = async () => {

        // TODO: Complete Spotify Recommendation
        // TODO: Add error functionality for status code != 200
        // addedSongs.forEach(async song => {
        //     let tracks = await spotifyApi.getRecommendation(song.id)
        //     setSongs([...songs, tracks])
        //     console.log(tracks)
        // })

        let cloneSongs = [...addedSongs];
        addedSongs.forEach(async song => {
            console.log(song.name)
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
                if (s.name === song.name && s.artist === song.artist) {
                    s.similar = r;
                }
                return s;
            })

            setSongs(mappedArray);

        })
    }

    let progressBarStyles = buildStyles({
        pathColor: '#1DB954',
        textColor: '#222222',
    })

    return (
        <div>

            {/* <p className='text-center font-bold'>Only use the refresh button below IF and only IF there is no results</p>
            <button onClick={fetchSimilarSongs} className="btn bg-red-500 text-white w-full">Refresh</button> */}

            {songs.map((song, index) => {

                return (

                    <div className="my-5" key={index}>
                        <h1 className='text-3xl font-bold'>{song.name}</h1>
                        <h5>{song.artist}</h5>
                        <div className="row">

                            {Array.isArray(song.similar) && song.similar.length

                                ?

                                song.similar.map((s, index) => {
                                    const percentage = Math.round(parseFloat(s.match) * 100);
                                    return (

                                        <div key={index} className="flex items-center w-full my-10 h-auto">

                                            <div className="w-14 h-auto">
                                                <CircularProgressbar styles={progressBarStyles} value={percentage} text={`${percentage}%`} />
                                            </div>

                                            <div className='mx-10'>
                                                <h5 className="text-black font-bold">{s.name}</h5>
                                                <p className="text-black/60">{s.artist}</p>

                                                {/* Button */}
                                                <a className='btn bg-green-500 text-white flex items-center w-fit' href={`https://open.spotify.com/search/${encodeURI(s.name + " " + s.artist)}`}>
                                                        <FaSpotify />
                                                        <span className="ml-2">
                                                            Spotify
                                                        </span>
                                                </a>
                                            </div>

                                        </div>
                                    )
                                })
                                :
                                <h5 className="my-3">No similar tracks found</h5>

                            }
                        </div>
                    </div>
                )
            })}
        </div>
    )
}