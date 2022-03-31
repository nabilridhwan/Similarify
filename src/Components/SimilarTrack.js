import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { FaSpotify } from "react-icons/fa";


import 'react-circular-progressbar/dist/styles.css';

let progressBarStyles = buildStyles({
    pathColor: '#e94798',
    textColor: '#222222',
})

export default function SimilarTrack({ track, percentage }) {
    return (
        <div className="flex items-center w-full my-10 h-auto">
            <div className="w-14 h-auto">
                <CircularProgressbar styles={progressBarStyles} value={percentage} text={`${percentage}%`} />
            </div>

            <div className='mx-10'>
                <h5 className="text-black font-bold">
                    {track.name}
                </h5>

                <p className="text-black/50 text-sm">
                    {track.artist}
                </p>

                {/* Button */}
                <a className='mt-2 btn bg-green-500 text-white text-sm flex items-center w-fit' href={`https://open.spotify.com/search/${encodeURI(track.name + " " + track.artist)}`}>
                    <FaSpotify />
                    <span className="ml-2">
                        Open in Spotify
                    </span>
                </a>
            </div>

        </div>

    )
}