import { motion } from "framer-motion"
import { IoMdClose } from "react-icons/io"
import { useDispatch } from "react-redux";

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

            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="border border-black/10 dark:border-white/10 bg-white dark:bg-darkCard p-7 mx-7 rounded-lg">

                {/* <div className="w-full flex justify-end">

                    <button className="text-white bg-red-500 rounded-full p-1 shadow-md shadow-red-500/50">
                        <IoMdClose className="text-2xl" />
                    </button>
                </div> */}


                <h1 className="text-3xl font-bold my-2">
                    Playlist Created
                </h1>

                <p className="opacity-50">
                    Your super shiny new cool playlist have been created!
                </p>

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleClick} className="btn my-3 bg-green-500 text-white w-full">
                    Go to Playlist
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