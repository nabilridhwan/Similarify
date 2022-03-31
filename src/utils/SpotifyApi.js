class SpotifyApi {

    constructor() {

        this.CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
        this.SCOPE = "";
    }

    setToken(token) {
        this.userToken = token;
    }

    authenticateUser() {

        let REDIRECT_URI;

        if (process.env.NODE_ENV !== 'production') {
            REDIRECT_URI = "http://localhost:3000/search";
        } else {
            REDIRECT_URI = "https://nabilridhwan.github.io/Similarify";
        }

        window.location = `https://accounts.spotify.com/authorize?client_id=${this.CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=${this.SCOPE}&state=first-auth&show_dialog=true`
    }

    getUserData() {
        fetch("https://api.spotify.com/v1/me", {
                headers: {
                    "Authorization": "Bearer " + this.userToken
                }
            }).then(res => res.json())
            .then(data => console.log(data))
    }


    // TODO: Add error functionality for status code != 200

    async search(trackName) {
        console.log("[Spotify API] Fetching Data")
        // Check if trackName string is empty
        let request = await fetch(`https://api.spotify.com/v1/search?q=${trackName}&type=track`, {
            headers: {
                "Authorization": "Bearer " + this.userToken
            }
        }).catch(error => {
            console.log("[Spotify API] Error encountered while fetching")
            console.log(error)
        })


        let response = await request.json();

        console.log("[Spotify API] A-OK")

        return response
    }

    async searchFirstSong(trackName) {
        let response = await this.search(trackName)

        // TODO: Sort by listens to get most accurate results
        return response.tracks.items[0]
    }

    async getRecommendation(track_id) {
        return await fetch(`https://api.spotify.com/v1/recommendations?seed_tracks=${track_id}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + this.userToken
            }
        }).then(res => res.json())
    }

}

export default SpotifyApi