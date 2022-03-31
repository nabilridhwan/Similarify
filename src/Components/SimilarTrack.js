import { FaSpotify, FaPlus} from "react-icons/fa";

import {useDispatch} from "react-redux";
import { addSongToPlaylist } from '../actions';

import {motion} from "framer-motion"


export default function SimilarTrack({ track, percentage }) {

    const dispatch = useDispatch();

    return (
        <div className="flex items-center w-full mb-10 h-auto">
            {/* <div className="w-14 h-auto">
                <CircularProgressbar styles={progressBarStyles} value={percentage} text={`${percentage}%`} />
            </div> */}

            <div className='mx-5'>

                <h5 className="text-black font-bold">
                    {track.name}
                </h5>

                <p className="text-black/50 text-sm">
                    {track.artists.map(a => a.name).join(", ")}
                </p>

                {/* Button */}
                <motion.a 
                    whileTap={{ scale: 0.9 }}
                className='mt-2 btn bg-green-500 text-white text-sm flex items-center w-fit' href={track.external_urls.spotify}>
                    <FaSpotify />
                    <span className="ml-2">
                        Open in Spotify
                    </span>
                </motion.a>

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