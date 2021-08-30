class LastFMApi{
    constructor(apiKey){
        this.apiKey = apiKey;
    }

    // TODO: Add error functionality for status code != 200
    async getSimilarTrack(artist, track, limit){

        let request = await fetch(`https://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=${artist}&track=${track}&api_key=${this.apiKey}&limit=${limit}&format=json`)
        .catch(error => console.log(error))

        let response = await request.json()
        return response.similartracks.track;
        
    }
}

export default LastFMApi