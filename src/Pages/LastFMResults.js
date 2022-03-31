import { useState, useEffect } from 'react';
import LastFMApi from '../utils/LastFMApi';

import { motion } from 'framer-motion';



import { useSelector } from 'react-redux';
import SpotifyApi from '../utils/SpotifyApi';
import Container from '../Components/Container';
import SimilarTrack from '../Components/SimilarTrack';
import BackButton from '../Components/BackButton';

import {FaLastfm} from "react-icons/fa"

let spotifyApi = new SpotifyApi();

const LastFM = new LastFMApi();
LastFM.setApiKey(process.env.REACT_APP_LASTFM_API_KEY);
export default function LastFMResults() {
    let [songs, setSongs] = useState([]);

    const addedSongs = useSelector(state => state.songs);
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
            let r = await LastFM.getSimilarTrack(song.artist, song.name, 6)

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



    return (
        <Container>

            <BackButton to="/search" />

            <h1
                className='text-2xl font-bold'
            >
                Similar Tracks
            </h1>

            <p className="text-black/50">
                Here are some similar tracks to your liked tracks.
            </p>

            <h1 className="flex text-sm my-8 text-black/50 justify-center items-center text-center">
                <FaLastfm className="mr-2" />
                Recommendations powered by Last.fm 
            </h1>

            {/* <p className='text-center font-bold'>Only use the refresh button below IF and only IF there is no results</p>
            <button onClick={fetchSimilarSongs} className="btn bg-red-500 text-white w-full">Refresh</button> */}

            {songs.map((song, index) => {

                return (

                    <motion.div
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="my-5 p-5 rounded-xl border border-black/20 shadow-lg shadow-black/10" key={index}>
                        <h1 className='text-3xl font-bold'>{song.name}</h1>
                        <h5 className='text-sm text-black/50'>{song.artist}</h5>
                        <div className="row">

                            {Array.isArray(song.similar) && song.similar.length

                                ?

                                <div className='grid md:grid-cols-3'>
                                    {song.similar.map((s, index) => {
                                        const percentage = Math.round(parseFloat(s.match) * 100);
                                        return (
                                            <SimilarTrack percentage={percentage} key={index} track={s} />
                                        )
                                    })}
                                </div>
                                :
                                <h5 className="my-3">No similar tracks found</h5>

                            }
                        </div>
                    </motion.div>
                )
            })}
        </Container>
    )
}