import { useNavigate } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa"

import { motion } from "framer-motion"

export default function BackButton({to=-1}) {
    const navigate = useNavigate();
    return (
        <div className="back-button my-5">
                <motion.button
                    onClick={() => navigate(to)}
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.1 }}
                    className="dark:text-white dark:border-white text-black font-bold py-2 px-4 rounded-full border-2 border-black float-left">

                    <div className="flex justify-center items-center">
                        <FaArrowLeft className="mr-2" />
                        Back
                    </div>

                </motion.button>
        </div>
    )
}