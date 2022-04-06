import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSongParameters } from "../actions";
import ModalHeader from "./ModalHeader";
import ModalWindow from "./ModalWindow";

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
        "The higher the value, the higher confidence the track is acoustic.",

        "The higher the value, the 'dancier' the track.",

        "The higher the value, the more energetic the track.",

        "The higher the value, the higher the likelihood the track contains no vocal contents.",

        "The higher the value, the higher the increased probability that the track was performed live.",

        "The higher the value, the louder the track.",

        "The higher the value, the more exclusively speech-like exists in the recording (e.g. talk show, audio book, poetry).",

        "The higher the value, the more the track sound more positive (e.g. happy, cheerful, euphoric), while the lower the value, the more the track sounds more negative (e.g. sad, depressed, angry)."

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

    const handleClearParameters = () => {
        setActiveParams([])
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

            <ModalWindow>

                <ModalHeader title="Adjust Parameters" subtitle="Adjust specific parameters relative to this song to get better recommendations." />

                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleClearParameters}

                    className='text-red-500 font-bold mt-5'>
                    Clear All Parameters
                </motion.button>

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

                                <div className="flex items-center">


                                    {activeParams.includes(param) && (
                                        <div className="h-2 w-2 bg-white rounded-full mr-2" />
                                    )}


                                    <motion.h1
                                        whileTap={{ scale: 0.9 }}
                                        className={`${!activeParams.includes(param) ? "muted" : "font-bold"} w-fit cursor-pointer`}
                                        onClick={() => handleClickParam(param)}>

                                        {capitalizeFirstLetter(param)} {activeParams.includes(param) && (parameters[param.toLowerCase()] ? " - " + Math.round(parameters[param.toLowerCase()] * 100) + "%" : "50%")}

                                    </motion.h1>
                                </div>

                                <AnimatePresence>
                                    <motion.div
                                        key={param}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: activeParams.includes(param) ? 1 : 0, y: activeParams.includes(param) ? 0 : -10 }}
                                        exit={{ opacity: 0, y: -10 }}
                                    >

                                        {activeParams.includes(param) && (

                                            <motion.p
                                                className="my-2 text-xs muted">
                                                {description[index]}
                                            </motion.p>
                                        )}

                                        {
                                            activeParams.includes(param) && (
                                                <motion.input type="range" className="w-full" name={param.toLowerCase()} onChange={handleChange} value={parameters[param]} min={0} max={1} step={0.01} />
                                            )
                                        }
                                    </motion.div>
                                </AnimatePresence>

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

            </ModalWindow>
        </motion.div>
    )
}