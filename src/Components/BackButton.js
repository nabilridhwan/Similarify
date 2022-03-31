import { Link, useNavigate } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa"

import { motion } from "framer-motion"

export default function BackButton() {
    const navigate = useNavigate();
    return (
        <div className="back-button my-5">
                <motion.button
                    onClick={() => navigate(-1)}
                    whileTap={{ scale: 0.9 }}
                    className="text-black font-bold py-2 px-4 rounded-full border-2 border-black">

                    <div className="flex justify-center items-center">
                        <FaArrowLeft className="mr-2" />
                        Back
                    </div>
                </motion.button>
        </div>
    )
}