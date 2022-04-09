import { BiMusic } from "react-icons/bi"
export default function DefaultAlbumImageCompact() {
    return (
        <div className={`h-14 w-14 bg-defaultAlbumCover flex justify-center items-center`}>
            <BiMusic className="text-white/50" size={35} />
        </div>
    )
}