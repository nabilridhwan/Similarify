import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSongParameters } from "../actions";
import Parameter from "../utils/Parameter";
import ModalHeader from "./ModalHeader";
import ModalWindow from "./ModalWindow";

import PropTypes from "prop-types";
import Track from "../utils/Track";
import InputRange from "./InputRange";

AdjustParameters.propTypes = {
    track: PropTypes.instanceOf(Track),
    onClose: PropTypes.func.isRequired,
}

export default function AdjustParameters({ track, onClose }) {

    const dispatch = useDispatch();

    const [parameters, setParameters] = useState(
        [
            new Parameter("accousticness", "The higher the value, the higher confidence the track is acoustic.", 0.5, 0, 1, 0.01),
            new Parameter("popularity", "The higher the value, the more popular the track is.", 50, 0, 100, 1, 1),
            new Parameter("danceability", "The higher the value, the more danceable the track.", 0.5, 0, 1, 0.01),
            new Parameter("energy", "The higher the value, the more energetic the track.", 0.5, 0, 1, 0.01),
            new Parameter("loudness", "The higher the value, the more louder the track.", 0.5, 0, 1, 0.01),
            new Parameter("instrumentalness", "The higher the value, the more likely the track is instrumental.", 0.5, 0, 1, 0.01),
            new Parameter("liveness", "The higher the value, the more likely the track is live.", 0.5, 0, 1, 0.01),
            new Parameter("speechiness", "The higher the value, the more likely the track is speech.", 0.5, 0, 1, 0.01),
            new Parameter("valence", "The higher the value, the more positive the track.", 0.5, 0, 1, 0.01),
        ]
    )

    const addedSongs = useSelector(state => state.songs);

    const currentSongParams = addedSongs.find(song => song.id === track.id).parameters;

    const [activeParams, setActiveParams] = useState([])

    useEffect(() => {
        // TODO: Read the current song parameters (if any)
        if (currentSongParams) {
            console.log(currentSongParams)

            let cloneParameters = { ...parameters }

            Object.keys(cloneParameters).forEach(parameterIndex => {
                const cP = cloneParameters[parameterIndex]
                Object.keys(currentSongParams).forEach(currentParamName => {
                    if (cP.name === currentParamName) {
                        console.log(currentParamName)
                        cP.value = currentSongParams[currentParamName];
                    }
                })
            })

            setActiveParams(Object.keys(currentSongParams))
            setParameters({ ...cloneParameters })

            // Set active params
            // setActiveParams(Object.keys(currentSongParams))
        }
    }, [])

    const handleChange = (e, currentParameter) => {

        // TODO: Handle the value change

        const { value } = e.target;

        currentParameter.setValue(value);

        const newObj = { ...parameters, [currentParameter.name]: currentParameter.getValue() }
        setParameters(newObj)
    }

    const handleClickParam = (index) => {
        const currentParameter = parameters[index];

        // Check if activeParams contains the current parameter's name
        if (activeParams.includes(currentParameter.name)) {
            // remove param from activeParams
            setActiveParams(activeParams.filter(p => p !== currentParameter.name))
        } else {

            // Push the param to active params

            // If it does not contain, concatenate with the activeParams and the parameter name
            setActiveParams(Array.from(new Set([...activeParams, currentParameter.name])))
        }
    }

    const handleClickSave = () => {
        let newParams = { ...parameters }
        let finalObject = {};
        Object.keys(newParams).forEach(paramIndex => {
            const currentParameter = newParams[paramIndex];
            if (activeParams.includes(currentParameter.name)) {
                finalObject[currentParameter.name] = currentParameter.value
            }


        })

        console.log(`New parameters for ${track.name}: ${JSON.stringify(finalObject)}`)

        // New parameters are here! do whatever you want to do with it
        dispatch(setSongParameters(finalObject, track))

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
                            {track.artist.map(a => a.name).join(", ")}
                        </p>
                    </div>
                </div>

                <motion.div
                    layoutScroll
                    className="overflow-y-scroll overflow-x-hidden h-52 scroll-m-5">

                    <AnimateSharedLayout>

                        {Object.keys(parameters).map((parameterIndex, index) => {

                            const currentParameter = parameters[parameterIndex];
                            return (

                                // Div for parameter
                                <motion.div
                                    layout
                                    key={index}
                                    className="my-2">

                                    {/* Dot */}
                                    <motion.div
                                        className="flex items-center">

                                        <motion.div
                                            layout="position"
                                            initial={{ opacity: 0, }}
                                            animate={{ opacity: 1, }}
                                            transition={{
                                                delay: 0.1
                                            }}
                                            className={`h-2 w-2 ${activeParams.includes(currentParameter.name) ? "bg-white" : "bg-transparent border border-white/50"} rounded-full mr-2`} />

                                        {/* Name and percentage */}
                                        <div
                                            className="flex items-center cursor-pointer gap-1"
                                            onClick={() => handleClickParam(index)}
                                        >
                                            {/* Parameter name */}
                                            <motion.h1
                                                layout="position"
                                                whileTap={{ scale: 0.9 }}
                                                className={`${!activeParams.includes(currentParameter.name) ? "muted" : "font-bold"} capitalize  w-fit cursor-pointer`}
                                            >

                                                {currentParameter.name}

                                            </motion.h1>

                                            {activeParams.includes(currentParameter.name) && (

                                                <motion.span
                                                    className="font-semibold text-sm"
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{
                                                        opacity: 1, x: 0, transition: {
                                                            delay: 0.1,
                                                            type: "tween",
                                                            ease: "easeOut"
                                                        }
                                                    }}
                                                >
                                                    ({Math.round(parameters[parameterIndex].getDisplayValue())}%)
                                                </motion.span>
                                            )}
                                        </div>
                                    </motion.div>

                                    {/* Description and input */}
                                    <AnimatePresence>
                                        {activeParams.includes(currentParameter.name) && (

                                            <motion.div
                                                key={parameterIndex}
                                                initial={{ opacity: 0, y: -30 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -30 }}
                                                transition={{
                                                    duration: 0.2,
                                                    ease: "easeInOut",
                                                }}
                                            >
                                                <motion.p
                                                    className="my-2 text-xs muted">
                                                    {currentParameter.description}
                                                </motion.p>

                                                {/* <InputRange /> */}

                                                <input
                                                    class="rounded-lg overflow-hidden appearance-none bg-gray-400 h-3 w-full"
                                                    type="range"
                                                    onChange={(e) => handleChange(e, currentParameter)}
                                                    value={currentParameter.getValue()}
                                                    min={currentParameter.min}
                                                    max={currentParameter.max}
                                                    step={currentParameter.step}
                                                />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                </motion.div>
                            )
                        })}
                    </AnimateSharedLayout>
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