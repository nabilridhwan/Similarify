
import {motion} from "framer-motion"
export default function Container({children}){
    return (
        <motion.div 
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        className="w-11/12 lg:w-1/2 my-10 mx-auto">
            {children}
        </motion.div>
    )
}