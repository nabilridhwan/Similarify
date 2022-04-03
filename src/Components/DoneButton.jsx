import { motion } from "framer-motion"

export default function DoneButton({ overrideText, k, onClick }) {
    return (
        <div
            className="w-full flex items-center justify-center">
            <motion.button
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                layout
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClick} className="done-button z-1">

                {overrideText ? overrideText : `Done`}

                <motion.div
                    key={k}
                    initial={{ scale: 1.6, }}
                    animate={{ scale: 1, }}
                    transition={{
                        type: "tween",
                    }}
                    className="badge"
                >
                    {k}
                </motion.div>
            </motion.button>


        </div>
    )
}