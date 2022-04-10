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
            className="transition ease-out duration-500 bg-brandColor/90 text-white font-semibold py-2 px-4 text-sm rounded-full hover:shadow-[0_0_30px] hover:shadow-brandColor/50 hover:bg-brandColor">

            <div className="flex justify-center items-center">
                {children}
            </div>

        </motion.button>
    )
}