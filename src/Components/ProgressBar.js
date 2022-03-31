export default function ProgressBar({ current }) {
    return (
        <div className="flex justify-center items-center w-full h-1 space-x-5">

            {
                Array.from([0, 1]).map(i => (
                    <div className={`w-1/2 h-1 rounded-full ${current == i + 1 ? "bg-black" : "bg-black/30"}`}>
                    </div>
                ))
            }

        </div>
    )
}