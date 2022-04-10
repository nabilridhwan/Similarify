import { motion } from "framer-motion"
export default function CenterContainer({ children }) {
    return (
        <motion.div
            initial={{ opacity: 0, }}
            animate={{ opacity: 1, }}
            exit={{ opacity: 0, }}
            transition={{
                type: "tween",
                ease: "easeOut",
                duration: 0.5
            }}
            className="w-screen h-screen flex justify-center items-center">
            <div

                className="text-center mx-10 my-28 lg:w-1/3"
            >
                {children}
            </div>
        </motion.div>
    )
}