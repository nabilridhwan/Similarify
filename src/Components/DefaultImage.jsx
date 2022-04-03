import { BiMusic } from "react-icons/bi"
export default function DefaultAlbumImage() {
    return (
        <div className={`h-20 w-20 bg-defaultAlbumCover flex justify-center items-center`}>
            <BiMusic className="text-white/50" size={35} />
        </div>
    )
}