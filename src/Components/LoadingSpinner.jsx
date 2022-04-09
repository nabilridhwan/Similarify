import { SwapSpinner } from "react-spinners-kit";

import PropTypes from "prop-types";

LoadingSpinner.propTypes = {
    size: PropTypes.number,
    loading: PropTypes.bool.isRequired,
}

export default function LoadingSpinner({ size = 30, loading }) {
    return (
        <div className="my-2">
            <SwapSpinner size={size} color={"#e11d48"} loading={loading} />
        </div>
    )
}