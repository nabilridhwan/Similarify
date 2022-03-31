class LastFMApi{
    setApiKey(apiKey){
        this.apiKey = apiKey;
    }

    // TODO: Add error functionality for status code != 200
    async getSimilarTrack(artist, track, limit=5){

        console.log(artist, track, limit)

        let response = {};
        let numberOfTimes = 0;

        // Do until we get tracks that is not null
        do{

            // Increment
            numberOfTimes++;
            console.log(`Called LastFM API ${numberOfTimes} times`)

            let request = await fetch(`https://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=${artist}&track=${track}&api_key=${this.apiKey}&limit=${limit}&format=json`)
                .catch(error => console.log(error))

            response = await request.json()
            console.log(response)
        }while(response.similartracks.track == null)


        // Reset it back to 0
        numberOfTimes = 0;
        return response.similartracks.track;
        
    }
}

export default LastFMApi