import SimilarTrack from "./SimilarTrack";

function SimilarTracks(props) {
    let {songList} = props;

    return (
        <div>
            {songList.map((queryTrack, index) => {
                console.log(queryTrack)
                        return (
                            <div key={index}>
                                <h1>{queryTrack.artist} - {queryTrack.name}</h1>

                                {
                                    queryTrack.similarTracks.map((track,i) => {
                                        return <SimilarTrack key={i} track={track}/>
                                    })
                                }
                                
                                
                            </div>
                        )
                    })}
        </div>
    )
}

export default SimilarTracks;