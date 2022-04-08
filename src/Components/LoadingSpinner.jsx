import { SwapSpinner } from "react-spinners-kit";

export default function LoadingSpinner({ size = 30, loading }) {
    return (
        <div className="my-2">
            <SwapSpinner size={size} color={"#e94798"} loading={loading} />
        </div>
    )
}