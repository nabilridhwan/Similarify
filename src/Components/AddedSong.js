import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux"
import { removeSong } from "../actions";
import {FaTrash} from "react-icons/fa"

export default function AddedSong({ track }) {

    const dispatch = useDispatch();

const handleRemove = (track) => {
        dispatch(removeSong(track));
    }

    return (
        <motion.div layout initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -100, opacity: 0 }} className="m-1">

            <div>
                <button onClick={() => handleRemove(track)} className="btn bg-red-500 text-white flex justify-center items-center w-full mb-2">
                    <FaTrash />
                </button>
            </div>

            <img className="w-24" src={track.albumArt} alt={track.name} height="150px" />

        </motion.div>
    )
}