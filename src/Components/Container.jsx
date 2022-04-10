import {motion} from "framer-motion"
export default function Container({children}){
    return (
        <motion.div 
        initial={{opacity: 0, }}
        animate={{opacity: 1, }}
        exit={{opacity: 0, }}
        transition={{
            type: "tween",
            ease: "easeOut",
            duration: 0.5
        }}
        className="w-11/12 lg:w-2/3 my-10 mx-auto">
            {children}
        </motion.div>
    )
}