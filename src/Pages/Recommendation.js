import { useState, useEffect } from 'react';

import { AnimatePresence, motion } from 'framer-motion';


import { useDispatch } from 'react-redux';



import { useSelector } from 'react-redux';
import SpotifyApi from '../utils/SpotifyApi';
import Container from '../Components/Container';
import SimilarTrack from '../Components/SimilarTrack';
import BackButton from '../Components/BackButton';

import { FaSpotify } from "react-icons/fa"
import { useNavigate } from 'react-router-dom';
import AddedPlaylistSongs from '../Components/AddedPlaylistSongs';
import { clearSongsFromPlaylist } from '../actions';
import Footer from '../Components/Footer';
import ProgressBar from '../Components/ProgressBar';

let spotifyApi = new SpotifyApi();

export default function Recommendation() {

    let dispatch = useDispatch();

    let [songs, setSongs] = useState([]);

    const addedSongs = useSelector(state => state.songs);
    const apiKey = useSelector(state => state.apiKey);
    const addedPlaylistSongs = useSelector(state => state.playlistSongs);

    const [showAddedPlaylistSongs, setShowAddedPlaylistSongs] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if(addedSongs.length == 0){
            // Redirect to search page
            navigate(-1);
        }
        console.log(apiKey)
        spotifyApi.setToken(apiKey);
        fetchSimilarSongs();
    }, [])

    let fetchSimilarSongs = async () => {

        // TODO: Complete Spotify Recommendation
        // TODO: Add error functionality for status code != 200

        addedSongs.forEach(async song => {
            let tracks = await spotifyApi.getRecommendation(song.id)
            if (tracks.hasOwnProperty("error")) {
                navigate("/search")
            }
            setSongs([...songs, tracks])
            console.log(tracks)

            let mappedArray = [...addedSongs].map(s => {
                if (s.name === song.name && s.artist === song.artist) {
                    s.similar = tracks.tracks;
                }
                return s;
            })

            setSongs(mappedArray);
        })

        // let cloneSongs = [...addedSongs];
        // addedSongs.forEach(async song => {
        //     console.log(song.name)
        //     let r = await LastFM.getSimilarTrack(song.artist, song.name, 6)

        //     console.log(r)
        //     // Map each item in songs

        //     r = r.map(item => {
        //         return {
        //             name: item.name,
        //             match: item.match,
        //             duration: item.duration,
        //             artist: item.artist.name,
        //         }
        //     })



        // })
    }



    return (
        <Container>

            <BackButton to="/search" />


            {/* <ProgressBar current={2} /> */}

            <h1
                className='text-2xl font-bold'
            >
                Similar Tracks
            </h1>

            <p className="text-black/50">
                Here are some similar tracks to your liked tracks.
            </p>

            <h1 className="flex text-sm my-8 text-black/50 justify-center items-center text-center">
                <FaSpotify className="mr-2" />
                Recommendations powered by Spotify
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

                        <p className='text-sm'>Since you liked...</p>
                        <h1 className='text-3xl font-bold'>{song.name}</h1>
                        <h5 className='text-sm text-black/50'>
                            by {song.artist}
                        </h5>

                        <p className='mt-10 mb-3 text-sm'>
                            Here are songs similar to it:
                        </p>
                        {Array.isArray(song.similar) && song.similar.length

                            ?

                            <div className='grid md:grid-cols-2 lg:grid-cols-3'>
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
                    </motion.div>
                )
            })}

            {addedPlaylistSongs.length > 0 && (

                <div
                    className="w-full flex items-center justify-center">
                    <motion.button
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        layout
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowAddedPlaylistSongs(!showAddedPlaylistSongs)} 
                        className="done-button">

                        Done

                        <div className="badge">
                            {addedPlaylistSongs.length}
                        </div>
                    </motion.button>


                </div>
            )}

            {/* Added songs */}
            <AnimatePresence>
                {showAddedPlaylistSongs && (
                    <AddedPlaylistSongs onClearAll={() => dispatch(clearSongsFromPlaylist())} onClose={() => setShowAddedPlaylistSongs(false)} />
                )}
            </AnimatePresence>

            <Footer />
        </Container>
    )
}