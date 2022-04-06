import { useState, useEffect } from 'react';

import { AnimatePresence, motion } from 'framer-motion';


import { useDispatch } from 'react-redux';



import { useSelector } from 'react-redux';
import Container from '../Components/Container';
import SimilarTrack from '../Components/SimilarTrack';
import BackButton from '../Components/BackButton';

import { FaSpotify } from "react-icons/fa"
import { BiRefresh } from "react-icons/bi"
import { useNavigate } from 'react-router-dom';
import AddedPlaylistSongs from '../Components/AddedPlaylistSongs';
import { clearPlaylistLink, clearSongsFromPlaylist, createdPlaylistToFalse } from '../actions';
import Footer from '../Components/Footer';
import DoneButton from '../Components/DoneButton';
import CreatedPlaylistModal from '../Components/CreatedPlaylistModal';

import SpotifyInstance from "../utils/SpotifyInstance"

export default function Recommendation() {

    let dispatch = useDispatch();

    let [songs, setSongs] = useState([]);

    const addedSongs = useSelector(state => state.songs);
    const apiKey = useSelector(state => state.apiKey);
    const addedPlaylistSongs = useSelector(state => state.playlistSongs);
    const playlistLink = useSelector(state => state.playlistLink);

    const [showAddedPlaylistSongs, setShowAddedPlaylistSongs] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (addedSongs.length == 0) {
            // Redirect to search page
            navigate(-1);
        }
        SpotifyInstance.setToken(apiKey);
        fetchSimilarSongs();
    }, [])

    let fetchSimilarSongs = async () => {

        // TODO: Add error functionality for status code != 200
        try {

            addedSongs.forEach(async song => {
                let tracks = await SpotifyInstance.getRecommendation(song.id, 6, song.parameters)
                if (Object.prototype.hasOwnProperty.call(tracks, 'error')) {
                    navigate("/search")
                }
                setSongs([...songs, tracks])

                let mappedArray = [...addedSongs].map(s => {
                    if (s.name === song.name && s.artist === song.artist) {
                        s.similar = tracks.tracks;
                    }

                    return s;
                })




                // TODO: Fix the nested loop because its O(n^2)
                // mappedArray.forEach(song => {
                //     console.log(song)
                //     addedPlaylistSongs.forEach(playlistSong => {
                //         if (song.id === playlistSong.id) {
                //             song.added = true;
                //         }
                //     })
                // })

                setSongs(checkForDuplicates(mappedArray));
            })

        } catch (error) {
            navigate("/authenticate")
        }

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

    const checkForDuplicates = (mappedArray) => {
        mappedArray.forEach(track => {
            if (Object.prototype.hasOwnProperty.call(track, "similar")) {
                console.log(`${track.name} has similar tracks`)

                addedPlaylistSongs.forEach(playlistTrack => {

                    track.similar.forEach(similarTrack => {
                        if (playlistTrack.id === similarTrack.id) {
                            similarTrack.added = true;
                        }
                    })
                })
            }
        })

        return mappedArray;
    }

    const handleRefresh = async (index) => {
        let clone = [...addedSongs];

        let songOnIndex = clone[index];

        let similarSongs = await SpotifyInstance.getRecommendation(songOnIndex.id, 6, songOnIndex.parameters);

        clone[index].similar = similarSongs.tracks;



        setSongs(checkForDuplicates(clone))

    }



    return (
        <Container>

            <BackButton />


            {/* <ProgressBar current={2} /> */}

            <div className='clear-both pt-5'>
                <h1
                    className='text-2xl font-bold'
                >
                    Similar Songs
                </h1>

                <p className="dark:text-white/50 text-black/50">
                    Here are some similar songs you'd like.
                </p>

                <h1 className="flex dark:text-white/50 text-sm my-8 text-black/50 justify-center items-center text-center">
                    <FaSpotify className="mr-2" />
                    Recommendations powered by Spotify
                </h1>
            </div>

            {/* <p className='text-center font-bold'>Only use the refresh button below IF and only IF there is no results</p>
            <button onClick={fetchSimilarSongs} className="btn bg-red-500 text-white w-full">Refresh</button> */}

            {songs.map((song, index) => {

                return (

                    <motion.div
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        key={index}
                        className="dark:bg-darkCard dark:border-white/10 my-5 p-5 rounded-xl border border-black/20 shadow-lg shadow-black/10">

                        <p className='text font-bold my-4'>
                            Since you liked...
                        </p>

                        <div className="flex flex-row space-y-7 justify-between items-center">

                            {/* Album image and title and artist */}
                            <div className='flex flex-row space-y-5 items-center'>

                                <img src={song.albumArt} className="h-28 mr-4" />

                                <div>

                                    <h1 className='text-3xl font-bold'>{song.name}</h1>
                                    <h5 className='dark:text-white/50 text-sm text-black/50'>
                                        by {song.artist}
                                    </h5>


                                </div>


                            </div>

                            <motion.button
                                onClick={() => handleRefresh(index)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className='p-2 rounded-lg text-white bg-pink-700 border border-pink-900 shadow-md shadow-pink-700/30'>
                                <BiRefresh className='text-2xl' />
                            </motion.button>
                        </div>

                        <p className='my-5 text-sm'>
                            Here are songs similar to it:

                        </p>

                        {Object.prototype.hasOwnProperty.call(song, 'similar') && song.similar.length

                            ?

                            <div className='grid lg:grid-cols-2'>
                                {song.similar.map((s, index) => {
                                    const percentage = Math.round(parseFloat(s.match) * 100);
                                    return (
                                        <SimilarTrack percentage={percentage} key={s.id} track={s} />
                                    )
                                })}
                            </div>
                            :
                            <h5 className="my-3 font-bold">
                                No similar songs found. Consider changing the parameters (if set).
                            </h5>

                        }
                    </motion.div>
                )
            })}

            <AnimatePresence>
                {addedPlaylistSongs.length > 0 && (
                    <DoneButton overrideText={"Create Playlist"} onClick={() => setShowAddedPlaylistSongs(true)} k={addedPlaylistSongs.length} />
                )}
            </AnimatePresence>

            {/* Added songs */}
            <AnimatePresence>
                {showAddedPlaylistSongs && (
                    <AddedPlaylistSongs onClearAll={() => dispatch(clearSongsFromPlaylist())} onClose={() => setShowAddedPlaylistSongs(false)} />
                )}
            </AnimatePresence>

            <AnimatePresence>

                {playlistLink && (
                    // Clear the playlist link on close (so it hides the modal)
                    <CreatedPlaylistModal onClose={() => {

                        dispatch(clearPlaylistLink())
                    }} playlistLink={playlistLink} />
                )}
            </AnimatePresence>

            <Footer />
        </Container>
    )
}