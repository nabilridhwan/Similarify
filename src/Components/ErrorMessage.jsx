import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { IoClose } from "react-icons/io5"
import { RiErrorWarningFill } from "react-icons/ri"
import { useLocation } from "react-router-dom";

import PropTypes from "prop-types";

ErrorMessage.propTypes = {
    error: PropTypes.string.isRequired,
}

export default function ErrorMessage({ error }) {
    const [showDialog, setShowDialog] = useState(error !== null);

    return (
        <AnimatePresence>
            {showDialog && (

                <motion.div
                    className="flex items-center justify-center w-full"
                >

                    <motion.div
                        className="fixed top-5 w-5/6 lg:w-1/3 text-white bg-red-500 py-3 px-4 rounded-md shadow-lg shadow-red-500/30 flex items-center"
                    >

                        

                        <div className="flex flex-1 items-center">
                        <RiErrorWarningFill className="mr-2 text-3xl lg:text-xl" />
                            <p
                                className="text-sm"
                            >
                                {error}
                            </p>

                        </div>

                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setShowDialog(false)}
                        >

                            <IoClose
                                className="w-fit ml-3" />
                        </motion.button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}