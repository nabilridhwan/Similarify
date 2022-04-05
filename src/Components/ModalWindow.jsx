import { motion } from "framer-motion"

export default function ModalWindow({ children }) {
    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="border border-black/10 dark:border-white/10 bg-white dark:bg-darkCard p-7 px-4 mx-7 rounded-lg">

                {children}

        </motion.div>
    )
}