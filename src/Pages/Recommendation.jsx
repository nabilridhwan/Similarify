import { useState, useEffect } from 'react';

import { AnimatePresence, AnimateSharedLayout, motion, useAnimation } from 'framer-motion';


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
import useApiKey from '../hooks/useApiKey';
import ErrorMessage from '../Components/ErrorMessage';
import Artist from '../utils/Artist';
import Track from '../utils/Track';

export default function Recommendation() {

    let dispatch = useDispatch();

    let [songs, setSongs] = useState([]);

    const addedSongs = useSelector(state => state.songs);
    const addedPlaylistSongs = useSelector(state => state.playlistSongs);
    const playlistLink = useSelector(state => state.playlistLink);

    const [showAddedPlaylistSongs, setShowAddedPlaylistSongs] = useState(false);

    const rotateAnim = useAnimation();


    const { apiKey, loggedIn } = useApiKey();

    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (addedSongs.length == 0) {
            // Redirect to search page
            navigate(-1);
        }
        SpotifyInstance.setToken(apiKey);

        (async () => {
            await fetchSimilarSongs();
        })();
    }, [])

    let fetchSimilarSongs = async () => {

        try {

            addedSongs.forEach(async song => {
                try {


                    let tracks = await SpotifyInstance.getRecommendation(song.id, 6, song.parameters)
                    if (Object.prototype.hasOwnProperty.call(tracks, 'error')) {
                        navigate("/search")
                    }
                    setSongs([...songs, tracks])

                    // Map the similar tracks
                    const similarTracks = tracks.tracks.map(similarTrack => {
                        let artists = similarTrack.artists.map(a => new Artist(a.id, a.name, a.external_urls.spotify, a.uri))

                        // Uses track class
                        const trackObj = new Track(similarTrack.id, similarTrack.name, artists, similarTrack.album.images[0].url, similarTrack.explicit, similarTrack.duration_ms, similarTrack.preview_url, similarTrack.external_urls.spotify)

                        trackObj.uri = similarTrack.uri

                        return trackObj;

                    })

                    console.log(similarTracks)

                    let mappedArray = [...addedSongs].map(s => {
                        if (s.name === song.name && s.artist === song.artist) {
                            s.similar = similarTracks;
                        }



                        return s;
                    })

                    setSongs(checkForDuplicates(mappedArray));

                } catch (error) {
                    setError(error.message)
                }
            })

        } catch (error) {
            console.log(error)
            setError(error.message)
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

        // Rotation animation.
        (async () => {
            await rotateAnim.set({
                rotateZ: 0
            })

            await rotateAnim.start({
                rotateZ: 360,
                transition: {
                    ease: 'easeOut'
                }
            })
        })();


        // Map the similar tracks
        const similarTracks = similarSongs.tracks.map(similarTrack => {
            let artists = similarTrack.artists.map(a => new Artist(a.id, a.name, a.external_urls.spotify, a.uri))

            // Uses track class
            const trackObj = new Track(similarTrack.id, similarTrack.name, artists, similarTrack.album.images[0].url, similarTrack.explicit, similarTrack.duration_ms, similarTrack.preview_url, similarTrack.external_urls.spotify)

            trackObj.uri = similarTrack.uri

            return trackObj;

        })

        clone[index].similar = similarTracks;



        setSongs(checkForDuplicates(clone))

    }



    return (
        <Container>

            <BackButton to="/search" />

            {error && (
                <ErrorMessage error={error} />
            )}


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

            <AnimateSharedLayout>



                {songs.map((song, index) => {

                    return (

                        <motion.div
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            key={index}
                            className="dark:bg-darkCard  dark:border-white/10 my-5 p-5 rounded-xl border border-black/20 shadow-lg shadow-black/10">

                            <p className='text font-bold my-4'>
                                Since you liked...
                            </p>

                            <div className="flex flex-row space-y-7 justify-between items-center">

                                {/* Album image and title and artist */}
                                <div className='flex flex-row space-y-5 items-center'>

                                    <img src={song.albumArt} className="h-24 mr-4" />

                                    <div>

                                        <h1 className='text-3xl font-bold'>{song.name}</h1>
                                        <h5 className='dark:text-white/50 text-sm text-black/50'>
                                            by {song.artist.map(a => a.name).join(", ")}
                                        </h5>


                                    </div>


                                </div>

                                <motion.button
                                    onClick={() => handleRefresh(index)}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className='p-2 rounded-lg text-white bg-brandColor shadow-[0_0_30px] shadow-brandColor/30'>
                                    <motion.div
                                        animate={rotateAnim}
                                    >

                                        <BiRefresh className='text-2xl' />
                                    </motion.div>
                                </motion.button>
                            </div>

                            <p className='my-5 text-sm'>
                                Here are songs similar to it:

                            </p>

                            {Object.prototype.hasOwnProperty.call(song, 'similar') && song.similar.length

                                ?

                                <motion.div
                                    layout
                                    className='grid lg:grid-cols-2'>
                                    {song.similar.map((s, index) => {
                                        const percentage = Math.round(parseFloat(s.match) * 100);
                                        return (
                                            <SimilarTrack percentage={percentage} key={s.id} track={s} />
                                        )
                                    })}
                                </motion.div>
                                :
                                <h5 className="my-3 font-bold">
                                    No similar songs found. Consider changing the parameters (if set).
                                </h5>

                            }

                        </motion.div>
                    )
                })}
            </AnimateSharedLayout>

            <AnimatePresence>
                {addedPlaylistSongs.length > 0 && (
                    <DoneButton item={addedPlaylistSongs} overrideText={"Create Playlist"} onClick={() => setShowAddedPlaylistSongs(true)} k={addedPlaylistSongs.length} />
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
        </Container >
    )
}