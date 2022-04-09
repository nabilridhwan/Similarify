import { motion, useAnimation } from "framer-motion"

import PropTypes from "prop-types";
import { useEffect } from "react";

DoneButton.propTypes = {
    overrideText: PropTypes.string,
    k: PropTypes.number,
    onClick: PropTypes.func.isRequired,
}

export default function DoneButton({ item, overrideText, k, onClick }) {

    const controls = useAnimation();

    useEffect(() => {
        (async () => {
            await controls.set({ opacity: 0, y: 70 });
            await controls.start({ opacity: 1, y: 0, });
        })();

    }, [])

    useEffect(() => {
        (async () => {
            const threshold = 3;
            if (item.length > 0) {
                await controls.set({ rotateX: 0 })
                await controls.start({ rotateZ: [0, -threshold, 0, threshold, 0], transition: { duration: 0.25, ease: "easeIn" } })
            }
        })();
    }, [item])

    return (
        <div
            className="w-full flex items-center justify-center">
            <motion.button
                animate={controls}
                exit={{ opacity: 0, y: 70 }}
                layout
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClick} className="done-button z-1">

                {overrideText ? overrideText : `Done`}

                <motion.div
                    key={k}
                    initial={{ scale: 1.3, }}
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