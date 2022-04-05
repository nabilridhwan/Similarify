import {motion} from "framer-motion";

export default function ModalWindowBottom({ children }) {
    return (
        <motion.div
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 200, opacity: 0 }}
            transition={{
                type: "tween",
                ease: "easeOut",
            }}
            style={{
                zIndex: 2
            }}
            className="fixed dark:bg-dark py-14 bottom-0 left-0 w-screen bg-white p-5 col-span-2 shadow-[0_0_20px] shadow-black">
            {children}
        </motion.div>

    )
}