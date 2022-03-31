
import {motion} from "framer-motion"
export default function Container({children}){
    return (
        <motion.div 
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        className="mx-auto w-4/5 lg:w-1/2 my-10">
            {children}
        </motion.div>
    )
}