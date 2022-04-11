import {motion} from "framer-motion"
export default function InputRange(){
    return(
        <div className="absolute w-[70px] bg-white h-6 rounded-full">

            <motion.div 
            drag
            dragElastic={0.1}
            whileTap={{ scale: 1.5 }}
            dragSnapToOrigin={true}
            dragConstraints={{top: -35, bottom: 0, right: 35, left: 0}}
            className="relative w-9 h-9 origin-center top-0 left-[35px] bg-red-500 rounded-full"/>

        </div>
    )
}