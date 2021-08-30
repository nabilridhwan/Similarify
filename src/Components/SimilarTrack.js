function SimilarTrack(props) {
    let {track} = props;
    return (
        <div>
            <div>
                <h3>{track.name} - {track.match}%</h3>
                <img src={track.image} alt={track.name} />
                <a href={track.spotifyLink}>Spotify</a>
            </div>
        </div>
    )
}

export default SimilarTrack;