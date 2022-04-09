import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

export default function SectionButton({ to = -1, children, onClickEvt }) {
    const navigate = useNavigate();
    return (
        <motion.button
            onClick={
                () => {
                    if (onClickEvt) {
                        onClickEvt()
                    } else {
                        navigate(to)
                    }
                }
            }
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            className="dark:text-white dark:border-white bg-white dark:bg-dark text-black font-semibold py-2 px-4 text-sm rounded-full border-2 border-black mt-2">

            <div className="flex justify-center items-center">
                {children}
            </div>

        </motion.button>
    )
}