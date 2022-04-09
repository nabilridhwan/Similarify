export default class Track{
    constructor(id, name, artist, albumArt, explicit, duration_ms, preview_url, url=null, added_at=null){
        this.id = id;
        this.name = name;
        this.artist = artist;
        this.albumArt = albumArt;
        this.url = url;
        this.added_at = added_at;
        this.explicit = explicit;
        this.duration_ms = duration_ms;
        this.preview_url = preview_url;

        this.added = false;

        // Empty object for parameters
        this.parameters = {};
        this.similar = [];
    }

    setAdded(added){
        this.added = added;
    }
}