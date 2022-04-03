import { motion } from "framer-motion"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function AdjustParameters({ track, onClose }) {

    const dispatch = useDispatch();
    const [parameters, setParameters] = useState({})

    const AllParams = [
        "accousticness",
        "danceability",
        "energy",
        "instrumentalness",
        "liveness",
        "loudness",
        "speechiness",
        "valence",
    ]

    const [activeParams, setActiveParams] = useState([])

    useEffect(() => {
        console.log(activeParams)

        // TODO: Remove non active params from parameters
        let newParameters = {};
        for (let param of AllParams) {
            if (activeParams.includes(param)) {
                if (parameters[param]) {
                    newParameters[param] = parseFloat(parameters[param])
                } else {
                    newParameters[param] = 0.5
                }
            }
        }

        setParameters(newParameters)
    }, [activeParams])

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
        console.log(parameters)
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
                className="border border-black/10 dark:border-white/10 bg-white dark:bg-darkCard p-7 mx-7 rounded-lg">

                <h1 className="font-bold text-xl" >
                    Adjust Parameters
                </h1>

                <div className="my-5 flex space-x-2 items-center">

                    <img src={track.albumArt} className="w-14" />

                    <div>

                        <h1 className="font-bold text-2xl" >
                            {track.name}
                        </h1>
                        <p className="dark:text-white/60 text-black/60">
                            {track.artist}
                        </p>
                    </div>
                </div>

                {AllParams.map(param => {
                    return (

                        <div className="my-2">

                            <motion.h1 
                                whileTap={{ scale: 0.9 }}
                                whileHover={{ scale: 1.05 }}
                            className={`${!activeParams.includes(param) && "muted"} cursor-pointer`} onClick={() => handleClickParam(param)}>
                                {param} {activeParams.includes(param) && (parameters[param.toLowerCase()] ? parameters[param.toLowerCase()] * 100 + "%" : "50%")}
                            </motion.h1>

                            {
                                activeParams.includes(param) && (
                                    <input type="range" className="w-full" name={param.toLowerCase()} onChange={handleChange} value={parameters[param]} min={0} max={1} step={0.1} />
                                )
                            }

                        </div>
                    )
                })}

                {/* TODO: Implement save button */}
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