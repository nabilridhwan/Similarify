import {motion} from "framer-motion"
export default function InputRange(){
    return(
        <div className="relative w-full bg-white h-3 rounded-lg">

            <motion.div 
            drag
            dragElastic={0}
            whileTap={{ scale: 1.5 }}
            dragConstraints={{top: 0, bottom: 0, right: 100, left: 0}}
            className="w-4 h-4 bg-red-500 rounded-full"/>

        </div>
    )
}