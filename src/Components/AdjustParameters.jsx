import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSongParameters } from "../actions";

export default function AdjustParameters({ track, onClose }) {

    const dispatch = useDispatch();
    const [parameters, setParameters] = useState({
        "accousticness": 0.5,
        "danceability": 0.5,
        "energy": 0.5,
        "instrumentalness": 0.5,
        "liveness": 0.5,
        "loudness": 0.5,
        "speechiness": 0.5,
        "valence": 0.5,

    })

    const description = [
        "A confidence measure of whether the track is acoustic. The higher the value, the higher confidence the track is acoustic.",

        "Describes how suitable a track is for dancing based on a combination of musical elements. The higher the value, the 'dancier' the track.",

        "Energy is a measure intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. The higher the value, the more energetic the track.",

        "Predicts whether a track contains no vocals. The higher the value, the higher the likelihood the track contains no vocal contents.",

        "Detects the presence of an audience in the recording. The higher the value, the higher the increased probability that the track was performed live.",

        "The overall loudness of a track in decibels. The higher the value, the louder the track.",

        "Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks.",

        "A measure from describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry)."

    ]

    const addedSongs = useSelector(state => state.songs);

    const currentSongParams = addedSongs.find(song => song.id === track.id).parameters;

    const [activeParams, setActiveParams] = useState([])

    useEffect(() => {
        if (currentSongParams) {
            setParameters({ ...parameters, ...currentSongParams })

            // Set active params
            setActiveParams(Object.keys(currentSongParams))
        }
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newObj = { ...parameters, [name]: value }
        setParameters(newObj)
    }

    const handleClickParam = (param) => {
        if (activeParams.includes(param)) {
            // remove param from activeParams
            setActiveParams(activeParams.filter(p => p !== param))
        } else {

            // Push the param to active params
            setActiveParams(Array.from(new Set([...activeParams, param])))
        }
    }

    const handleClickSave = () => {
        let newParams = { ...parameters }
        Object.keys(newParams).forEach(key => {
            if (!activeParams.includes(key)) {
                delete newParams[key]
            }
        })

        console.log(`New parameters for ${track.name}: ${JSON.stringify(newParams)}`)

        // New parameters are here! do whatever you want to do with it
        dispatch(setSongParameters(newParams, track))

        // Close the window
        onClose()
    }

    const capitalizeFirstLetter = (s) => {
        return s.charAt(0).toUpperCase() + s.slice(1);
    }

    return (
        <motion.div
            initial={{ opacity: 0, }}
            animate={{ opacity: 1, }}
            exit={{ opacity: 0, }}
            className="bg-black/70 fixed flex justify-center items-center top-0 left-0 w-screen h-screen">

            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="border border-black/10 dark:border-white/10 bg-white dark:bg-darkCard w-11/12 md:w-1/3 mx-7 p-4 rounded-lg">

                <h1 className="font-bold text-xl" >
                    Adjust Parameters
                </h1>

                <p className="text-sm dark:text-white/60 text-black/60">
                    Adjust specific parameters relative to this song to get better recommendations.
                </p>

                <div className="my-5 flex space-x-2 items-center">

                    <img src={track.albumArt} className="w-14" />

                    <div>

                        <h1 className="font-bold text-xl" >
                            {track.name}
                        </h1>
                        <p className="dark:text-white/60 text-black/60">
                            {track.artist}
                        </p>
                    </div>
                </div>

                <motion.div
                    className="overflow-y-scroll overflow-x-hidden h-52 scroll-m-5">

                    {Object.keys(parameters).map((param, index) => {
                        return (


                            <motion.div
                                key={index}
                                className="my-2">

                                <motion.h1
                                    whileTap={{ scale: 0.9 }}
                                    className={`${!activeParams.includes(param) && "muted"} cursor-pointer`} onClick={() => handleClickParam(param)}>
                                    {capitalizeFirstLetter(param)} {activeParams.includes(param) && (parameters[param.toLowerCase()] ? parameters[param.toLowerCase()] * 100 + "%" : "50%")}
                                </motion.h1>

                                {activeParams.includes(param) && (

                                    <p
                                        className="my-2 text-xs muted">
                                        {description[index]}
                                    </p>
                                )}

                                {
                                    activeParams.includes(param) && (
                                        <input type="range" className="w-full" name={param.toLowerCase()} onChange={handleChange} value={parameters[param]} min={0} max={1} step={0.1} />
                                    )
                                }

                            </motion.div>
                        )
                    })}
                </motion.div>

                {/* Save button */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleClickSave} className="btn  bg-green-500 text-white w-full mb-2">
                    Save
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose} className="btn  bg-red-500 text-white w-full">
                    Close
                </motion.button>
            </motion.div>
        </motion.div>
    )
}