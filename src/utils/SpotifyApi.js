class SpotifyApi {

    static REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
    static SCOPE = "playlist-modify-private,user-library-read";
    static CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

    setToken(token) {
        this.userToken = token;
    }

    static authenticateUser() {

        window.location = `https://accounts.spotify.com/authorize?client_id=${this.CLIENT_ID}&response_type=token&redirect_uri=${this.REDIRECT_URI}&scope=${this.SCOPE}&state=first-auth&show_dialog=true`
    }

    async getUserData() {
        return await fetch("https://api.spotify.com/v1/me", {
            headers: {
                "Authorization": "Bearer " + this.userToken
            }
        }).then(res => {
            if (!res.ok) {
                throw Error(res.status)

            } else {
                return res.json()
            }
        })
    }

    async getLikedSongs(limit = 50) {
        return await fetch(`https://api.spotify.com/v1/me/tracks?limit=${limit}`, {
            headers: {
                "Authorization": "Bearer " + this.userToken
            }
        }).then(res => res.json())
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

    async getRecommendation(track_id, limit = 6) {
        return await fetch(`https://api.spotify.com/v1/recommendations?seed_tracks=${track_id}&limit=${limit}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + this.userToken
            }
        }).then(res => res.json())
    }

    async createPlaylist(track_uris, playlist_name, playlist_description) {
        console.log(track_uris, playlist_name, playlist_description)
        return new Promise((resolve, reject) => {
            // Get the User ID first
            this.getUserData().then(userData => {
                if (userData.hasOwnProperty("id")) {
                    const {
                        id: userID
                    } = userData;

                    // Create a playlist and obtain the playlist id
                    fetch("https://api.spotify.com/v1/users/" + userID + "/playlists", {
                            method: "POST",
                            headers: {
                                "Authorization": "Bearer " + this.userToken,
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                "name": playlist_name,
                                "description": playlist_description,
                                "public": false
                            })
                        }).then(res => res.json())
                        .then(data => {
                            console.log(data)
                            if (data.hasOwnProperty("id")) {
                                const {
                                    id: playlistID,
                                    external_urls: {
                                        spotify: playlistLink
                                    }
                                } = data;


                                // Add the uris to the playlist id
                                fetch("https://api.spotify.com/v1/playlists/" + playlistID + "/tracks", {
                                        method: "POST",
                                        headers: {
                                            "Authorization": "Bearer " + this.userToken,
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify({
                                            "uris": track_uris
                                        })

                                    })
                                    .then(res => res.json())
                                    .then(data => {
                                        resolve({
                                            ...data,
                                            link: playlistLink
                                        })
                                    }).catch(error => {
                                        reject("Error adding tracks to the created playlist")
                                    })

                            } else {
                                // Throw an error
                                console.log("[Spotify API] Error creating playlist")
                                reject("Error creating playlist")
                            }
                        }).catch(error => {

                                reject("Error creating playlist")
                        })

                }
            }).catch(error => {
                reject("Error getting user data. Try refreshing this page.")
            })
        })
    }

}

export default SpotifyApi