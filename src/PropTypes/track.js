import PropTypes from "prop-types"
const Track = PropTypes.shape({
    added_at: PropTypes.string,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    albumArt: PropTypes.string.isRequired,
    added: PropTypes.bool.isRequired
})

export default Track;