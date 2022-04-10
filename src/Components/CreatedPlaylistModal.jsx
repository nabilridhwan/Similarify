import { motion } from "framer-motion"
import { useDispatch } from "react-redux";
import ModalHeader from "./ModalHeader";
import ModalWindow from "./ModalWindow";

import PropTypes from "prop-types";

CreatedPlaylistModal.propTypes = {
    playlistLink: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default function CreatedPlaylistModal({ playlistLink, onClose }) {

    const dispatch = useDispatch();

    const handleClick = () => {

        // Run onClose()
        onClose();

        // Redirect to playlistLink
        window.open(playlistLink, '_blank');

    }

    return (
        <motion.div
            initial={{ opacity: 0, }}
            animate={{ opacity: 1, }}
            exit={{ opacity: 0, }}
            className="bg-black/70 fixed flex justify-center items-center top-0 left-0 w-screen h-screen">

            <ModalWindow>

                <ModalHeader title="Playlist Created/Modified" subtitle="Your super shiny cool playlist have been created/modified!" />

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleClick} className="btn my-3 bg-green-500 text-white w-full">
                    Go to Playlist
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose} className="btn  bg-red-500 text-white w-full">
                    Close
                </motion.button>

            </ModalWindow>


        </motion.div>
    )
}