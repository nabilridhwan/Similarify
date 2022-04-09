export default class Playlist{
    constructor(id, name, albumArt, totalTracks, owner, url){
        this.id = id;
        this.name = name;
        this.albumArt = albumArt;
        this.totalTracks = totalTracks;
        this.owner = owner;
        this.url = url;
    }
}