#   Changelog
All notable changes to this project will be documented in this file.

## 1.2.1

### Added
-   None

### Changed
-   None

### Removed
-   Removed back button from Search page

### Fixed
-   None

### Security
-   None

## 1.2.0

### Added
-   A modal for when the playlist is created
-   Better error handling for when a playlist has failed to be created

### Changed
-   After a playlist is created, it will now show a modal showing that the playlist is created (and also clear your added songs and added to playlist songs). The old behaviour is that the "Create Playlist" button will change into "Go to playlist".

### Removed
-   None

### Fixed
-   None

### Security
-   None

## 1.1.0

### Added
-   Added the ability to add songs from your liked songs
-   Added the ability to refresh recommendations directly from the Recommendation page
-   Added changelog link in footer
-   Added album art for recommended song for the original song in the recommended page.
-   The individual original song in the recommended page cards' now have a distinct lighter background in dark mode!

### Changed
-   Change to keeping the redux state (only apiKey) in localStorage.
-   Changed button text at Recommendation page to "Create Playlist"
-   Changed the layout of the error page
-   Changed error redirects from `/error?n=errorCode` to `/error/errorCode`
-   When clicking "login with spotify" from the home page, it will not redirect you to the Spotify authentication page if you already reauthenticate before (and within 1 hour of authentication)

### Removed
-   None

### Fixed
-   Pressing the back button from the Search page won't ask you to reauthenticate with Spotify again, and will instead go to the home page

### Security
-   None

## 1.0.0

### Added
-   Initial release!

### Changed
-   None

### Removed
-   None

### Fixed
-   None

### Security
-   None