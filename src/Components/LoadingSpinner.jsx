import { RotateSpinner } from "react-spinners-kit";

export default function LoadingSpinner({loading}) {
    return (
        <RotateSpinner size={30} color={"#e94798"} loading={loading} />
    )
}