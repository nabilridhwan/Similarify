import PropTypes from "prop-types";

const Playlist = PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    tracks: PropTypes.number.isRequired,
    owner: PropTypes.string.isRequired,
    albumArt: PropTypes.string.isRequired,
})

export default Playlist;