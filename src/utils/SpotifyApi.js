class SpotifyApi {

    static REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI || window.location.hostname + "/search"
    static SCOPE = "playlist-modify-private,user-library-read,user-read-recently-played,user-read-currently-playing";
    static CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

    setToken(token) {
        this.userToken = token;
    }

    static authenticateUser(url=null) {

        if(!url) url = this.REDIRECT_URI
        if(url) console.log("URL Gotten from argument")

        window.location = `https://accounts.spotify.com/authorize?client_id=${this.CLIENT_ID}&response_type=token&redirect_uri=${url}&scope=${this.SCOPE}&state=first-auth&show_dialog=true`
    }

    async getUserData() {
        // throw new Error("Mock Error in User Data")
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
        // throw new Error("Mock Error in Liked Songs")
        let tracks = [];
        let next = null;
        let iteration = 0;
        let link = `https://api.spotify.com/v1/me/tracks?limit=${limit}`;

        do {
            await fetch(link, {
                    headers: {
                        "Authorization": "Bearer " + this.userToken
                    }
                }).then(res => {
                    if (!res.ok) {
                        throw Error(res.status)
                    }
                    return res.json()
                })
                .then(likedSongs => {
                    iteration++
                    next = likedSongs.next;
                    tracks = [...tracks, ...likedSongs.items]
                    link = next;
                }).catch(error => {
                    console.log(`[Spotify API] Error encountered while fetching liked songs in iteration ${iteration}`)
                    throw new Error(`Error fetching liked songs: ${error.message}`)
                })
        } while (next !== null && iteration < 2)

        return tracks;
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

    async getRecommendation(track_id, limit = 6, songParameters = {}) {
        let mappedParams = Object.keys(songParameters).map(parameterName => {
            return "&target_" + parameterName + "=" + songParameters[parameterName]
        }).join("")

        return await fetch(`https://api.spotify.com/v1/recommendations?seed_tracks=${track_id}&limit=${limit}${mappedParams}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + this.userToken
            }
        }).then(res => res.json())
    }

    async getUserPlaylists() {
        // throw new Error("Mock Error in User Playlists")
        return await fetch("https://api.spotify.com/v1/me/playlists?limit=50", {
            headers: {
                "Authorization": "Bearer " + this.userToken
            },
        }).then(res => res.json())
    }

    async getTracksByPlaylistId(playlist_id) {
        // throw new Error("Mock Error in Tracks by Playlist ID")
        let tracks = [];
        let next = null;
        let link = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks?limit=100`;

        do {
            await fetch(link, {
                    headers: {
                        "Authorization": "Bearer " + this.userToken
                    }
                }).then(res => res.json())
                .then(playlistTracks => {
                    next = playlistTracks.next;
                    tracks = [...tracks, ...playlistTracks.items]
                    link = next;
                })
        } while (next != null)

        return tracks;

    }

    async createPlaylist(track_uris, playlist_name, playlist_description) {
        // throw new Error("Mock Error in Create Playlist")
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


                                this.addTracksToPlaylist(playlistID, track_uris)
                                    .then(d => {
                                        resolve(d)
                                    }).catch(e => {
                                        reject(e)
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

    async addTracksToPlaylist(playlistID, track_uris) {
        // throw new Error("Mock Error in Add Tracks to Playlist")
        return new Promise((resolve, reject) => {
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
                        link: `https://open.spotify.com/playlist/${playlistID}`
                    })
                }).catch(error => {
                    reject("Error adding tracks to the created playlist")
                })
        })
    }

    async getRecentlyPlayedSongs(limit = 50) {
        // throw new Error("Mock Error in Recently Played Songs")
        console.log("[Spotify API] Fetching Recently Played Songs")
        let tracks = [];
        let next = null;
        let iteration = 0;
        let link = `https://api.spotify.com/v1/me/player/recently-played?limit=${limit}`;

        do {

            await fetch(link, {
                    headers: {
                        "Authorization": "Bearer " + this.userToken
                    }
                }).then(res => res.json())
                .then(likedSongs => {
                    iteration++
                    next = likedSongs.next;
                    tracks = [...tracks, ...likedSongs.items]
                    link = next;
                })
        } while (next !== null && iteration < 3)

        return tracks;
    }

    async getCurrentlyPlayed(){
        return await fetch("https://api.spotify.com/v1/me/player", {
            headers: {
                "Authorization": "Bearer " + this.userToken
            }
        }).then(res => res.json())
    }

}

export default SpotifyApi