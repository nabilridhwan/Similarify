import { SwapSpinner } from "react-spinners-kit";

export default function LoadingSpinner({loading}) {
    return (
        <SwapSpinner size={40} color={"#e94798"} loading={loading} />
    )
}