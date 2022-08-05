import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useSelector } from "react-redux";
import AddedSongs from "./AddedSongs";
import DoneButton from "./DoneButton";

export default function DoneButtonWrapper() {
	let addedSongs = useSelector((state) => state.songs);

	let [showAddedSongs, setShowAddedSongs] = useState(false);
	return (
		<div className="mb-20">
			<AnimatePresence>
				{addedSongs.length > 0 && (
					<DoneButton
						item={addedSongs}
						onClick={() => setShowAddedSongs(true)}
						k={addedSongs.length}
					/>
				)}
			</AnimatePresence>

			{/* Added songs */}
			<AnimatePresence>
				{showAddedSongs && (
					<AddedSongs onClose={() => setShowAddedSongs(false)} />
				)}
			</AnimatePresence>
		</div>
	);
}
