export default class Track{
    constructor(id, name, artist, albumArt, added_at, added, url=null){
        this.id = id;
        this.name = name;
        this.artist = artist;
        this.albumArt = albumArt;
        this.added_at = added_at;
        this.added = added;
        this.url = url;
    }
}