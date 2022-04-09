import PropTypes from "prop-types";

ModalHeader.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
}

export default function ModalHeader({ title, subtitle }) {
    return (
        <div className="mb-5">
            <h1 className="text-3xl font-bold my-2">
                {title}
            </h1>

            <p className="opacity-50">
                {subtitle}
            </p>
        </div>
    )
}