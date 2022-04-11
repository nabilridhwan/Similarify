import { useNavigate } from "react-router-dom"
import {ImExit } from "react-icons/im"

import { motion } from "framer-motion"
import { setApiKey } from "../actions";
import { useDispatch } from "react-redux";

export default function LogOutButton({}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(setApiKey(""));
        navigate("/")
    }

    return (
        <div className="back-button my-5">
                <motion.button
                    onClick={handleLogout}
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.1 }}
                    className="bg-red-500 text-white font-bold py-2 px-4 rounded-full float-right">

                    <div className="flex justify-center items-center">
                        <ImExit className="mr-2" />
                        Log out
                    </div>

                </motion.button>
        </div>
    )
}