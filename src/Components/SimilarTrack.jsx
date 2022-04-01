import { FaSpotify, FaPlus} from "react-icons/fa";

import {useSelector, useDispatch} from "react-redux";
import { addSongToPlaylist } from '../actions';

import {motion} from "framer-motion"
import { Link } from "react-router-dom";

export default function SimilarTrack({ track, percentage }) {

    const dispatch = useDispatch();
    const apiKey = useSelector(state => state.apiKey);

    return (
        <div className="flex items-center w-full mb-10 h-auto">
            <img src={track.album.images[0].url} className="w-20 h-auto" alt="Album Art" />

            <div className='mx-5'>

                <a href={track.external_urls.spotify} className="dark:text-white text-black font-bold hover:underline">
                    {track.name}
                </a>

                <p className="dark:text-white/50 text-black/50 text-sm">
                    {track.artists.map(a => a.name).join(", ")}
                </p>

                {/* Add to playlist button */}
                <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => dispatch(addSongToPlaylist(track))} 
                className='btn mt-2 flex items-center justify-center text-sm bg-blue-500 text-white'>
                    <FaPlus className="mr-2" />
                    Add to playlist
                </motion.button>
            </div>

        </div>

    )
}