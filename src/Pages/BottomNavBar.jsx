import { NavLink } from "react-router-dom";
import Container from "../Components/Container";
import { motion } from "framer-motion";
import { FaHeadSideCough, FaHeart, FaRedoAlt, FaSearch } from "react-icons/fa";
import { RiPlayListFill } from "react-icons/ri";

export default function BottomNavBar() {
	return (
		<nav className="fixed bottom-0 bg-darkCard w-full py-3">
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{
					type: "tween",
					ease: "easeOut",
					duration: 0.5,
				}}
				className="w-11/12 lg:w-2/3 mx-auto"
			>
				<ul className="flex justify-evenly w-full text-white/50">
					<NavLink
						to="/search"
						className={({ isActive }) =>
							isActive
								? "flex flex-col items-center space-y-1 text-white"
								: "flex flex-col items-center space-y-1"
						}
					>
						<FaSearch />
						<p className="text-xs">Search</p>
					</NavLink>
					<NavLink
						to="/likedsongs"
						className={({ isActive }) =>
							isActive
								? "flex flex-col items-center space-y-1 text-white"
								: "flex flex-col items-center space-y-1"
						}
					>
						<FaHeart className="" />

						<p className="text-xs">Liked Songs</p>
					</NavLink>
					<NavLink
						to="/playlists"
						className={({ isActive }) =>
							isActive
								? "flex flex-col items-center space-y-1 text-white"
								: "flex flex-col items-center space-y-1"
						}
					>
						<RiPlayListFill className="" />

						<p className="text-xs">Playlists</p>
					</NavLink>
					<NavLink
						to="/recentlyplayed"
						className={({ isActive }) =>
							isActive
								? "flex flex-col items-center space-y-1 text-white"
								: "flex flex-col items-center space-y-1"
						}
					>
						<FaRedoAlt className="" />

						<p className="text-xs">Recently Played</p>
					</NavLink>
				</ul>
			</motion.div>
		</nav>
	);
}
