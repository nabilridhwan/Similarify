class SpotifyApi {
    constructor(userToken) {
        this.userToken = userToken;
        this.CLIENT_ID = "29cd3a150b9a4762996005246064b49d";
        // ! TODO: Replace redirect uri with https://localhost:3000 for local and dev builds.
        this.REDIRECT_URI = "https://nabilridhwan.github.io/Similarify"
        this.SCOPE = "user-read-private, user-read-email, playlist-read-private, playlist-modify-public, playlist-modify-private"
    }

    authenticateUser() {
        window.location = `https://accounts.spotify.com/authorize?client_id=${this.CLIENT_ID}&response_type=token&redirect_uri=${this.REDIRECT_URI}&scope=${this.SCOPE}&state=first-auth&show_dialog=true`
    }

    getUserData() {
        fetch("https://api.spotify.com/v1/me", {
                headers: {
                    "Authorization": "Bearer " + this.userToken
                }
            }).then(res => res.json())
            .then(data => console.log(data))
    }

    search(trackName) {
        return fetch(`https://api.spotify.com/v1/search?q=${trackName}&type=track`, {
                headers: {
                    "Authorization": "Bearer " + this.userToken
                }
            }).then(res => res.json())
            .then(data => {
                return data;
            })
    }
        
}

export default SpotifyApi