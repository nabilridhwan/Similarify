## 1.6.1 - Little fixes here and there! 🪚
>   Made the bridge that the workers go on to deliver you your recommended songs fancier and with speed boosts too!

### Added
-   None

### Bugs
-   In the recommendations page, if you added a song into your playlist and refreshed the recommendation, and if the same song appears in the refreshed recommendation, the button will display "Add to Playlist" even though it already has been added.

### Changed

-   Changed certain UI Elements and text displayed in the application.
-   Changed the description of each parameters *again* to make it easier to understand!

### Fixed

-   After modifying playlists, clicking on "Go To Playlist" now will open the playlist in the Spotify Desktop App (On Desktop, duh!)
-   All API calls run in parallel. (e.g. `/me` and `/playlists` will run in parallel)
-   Now, the app uses one instance of `SpotifyApi()` instead of multiple scattered around each component. (This might have an improvement on performance). The new instance can be found at `/src/utils/SpotifyInstance.js`

### Removed

- Removed the detection for added songs in the recommendations page (since it wasn't working anyway, and it takes up time to run the O(n^2) time complexity code.)


## 1.6.0 - Select from your recently played songs 🔁🛠️
>   This update introduced the ability to select from 50 of your most recently played songs (and also bug fixes and optimizations)

### Added

- Added the ability to select songs from your 50 most recently played songs.

### Changed

- Refactored components for UI consistency.
-   Changed changelog page styling.

### Fixed

- Fixed back button being beside the header in the Select songs from playlist page.
    -   This is due to the header not being cleared from both floats.
-   Fixed the nested loop in every page where you can select songs (liked songs, search, etc.). The new time complexity for the process is `O(n)` which is linear and im super proud of this! 🎉
-   Fixed bug where users with less than 150 liked songs won't see their liked songs in the Liked Songs page.
-   Fixed jarring animation when you remove all songs from your list and the "Done" button just disappears. (same with Create Playlist button)

### Removed

- None

## 1.5.3 — Spotify approves 🎉
>   Spotify approves the quota extension. `v1.5.3` is the first public release of Similarify. With that, there are some fixes and optimizations that is included in this update. Going forward, Sentry is added to monitor any uncaught exceptions, errors and traffic of the application.

### Added
-   Added logout button (so you can sign in with a different Spotify account)

### Bugs
-   In the recommendations page, the refresh button will overlap the details of the song in smaller screen devices.
    -   This is due to the flex layout of the buttons and the details. Any suggestions on where the refresh button should go will be greatly appreciated!

### Changed
-   Spotify links now open in the Desktop app (only for Desktop users) instead of in the browser.
-   The parameter now has a step of 1% instead of 10%
-   Changed the description of the parameters so it's easier to understand.
-   Swapped positions of the remove and the cogwheel buttons in the added song list window.
-   Changed the error for expired token / authentication cancelled.

### Fixed

-   Fixed a jarring closing animation of the "Adjust parameters" window.
-   Fixed some UI text layout (because animation looks weird).
-   Fixed a bug where the refresh button does not work (thanks for Sentry for catching this!)
    -   This is due to the parameters update which was introduced in `v1.5.2`. Songs with no parameters breaks the recommendation refresh feature.
-   Songs won't be added if the songs already exists in the existing playlist.
    -   This means that if out of 5 tracks and 3 of them exists, only 2 of them will be added.

### Removed

- Removed the Spotify player introduced in `v1.4.0` in favor of the Spotify links open in the desktop app.

### Security

- None

## 1.5.2 — Hotfix 🚑

### Added

-   None

### Changed
- Changed message when no similar songs found from "No similar songs found." to "No similar songs found. Consider changing the parameters (if set).".

### Fixed

-   None

### Removed

- None

### Security

- None

## 1.5.1 — Hotfix 🚑

### Added

- Added the ability to clear parameters previously set with a click of a button. This new feature is found in the "Adjust Parameters" window.

### Changed
- None

### Fixed

-   Fixed the top padding of "Added Playlist Songs" window because it would clip on some mobile devices.

### Removed

- None

### Security

- None

## 1.5.0 — Adjust parameters and save to existing playlists!

### Added

- Added the ability to add songs to an existing playlist **_(In testing - provide feedback in the issues page)_**
    -   Caution: Songs will be added regardless if it exists in the existing playlist.
-   Added ability to change the parameters of a song to better suit your taste. **_(In testing - provide feedback in the issues page)_**
    -   Get started by adding a song to your list, Click "Done" and adjust the parameters by pressing the Cogwheel button.
        -   Click on any of the parameters to activate it.
        -   Click on the parameter again to deactivate it.
        -   Click save to save the parameters.
        -   Click cancel to cancel your changes.

### Changed
-   When adding a song to either your playlist or your list, the button will change from "Add..." to "Remove..."
-   Songs with modified parameters will now have a darker cogwheel icon to signify that there is some parameters that is adjusted.
-   Spotify Player: The muted text: instead of showing "Playing X", It just shows "X" where X is the title and artist of the song.
-   Changed Home screen text.
-   Changed the "Create Playlist" button to be green.

### Fixed

- Fixed Chevron icon being white in light mode making the icon invisible.

### Removed

- Removed unnecessary drop shadow/glowing effect from buttons in UI

### Security

- None

## 1.4.0

### Added

- Added a song preview in the Recommendations page. Get started by clicking on a title of a song, a Spotify player will pop up!

### Changed
-   None

### Fixed

- None

### Removed

- None

### Security

- None

## 1.3.4

### Added

- None

### Changed
-   None

### Fixed

- None

### Removed

- Playlists name can't be clicked on (in Pick a Playlist page)

### Security

- None


## 1.3.3

### Added

- Added proper loading animations for every section of the application (search, liked songs, playlists)

### Changed
-   Liked songs and Playlists links are now buttons in the search page
-   Change loading animation
-   The playlist page: Instead of showing "Select songs" button, the layout is now changed, there is a arrow right button signifying that the user can click on the individual playlist item.

### Fixed

- Recommendation page spewing out key error - it's now fixed!

### Removed

- None

### Security

- None



## 1.3.2

### Added

- None

### Changed

- All playlists and song links will open up in a new tab.
-   Changed the text from "X failed to add" to "X songs failed to load" in the playlist page when some songs failed to load.

### Fixed

- None

### Removed

- None

### Security

- None

## 1.3.1

### Added

- None

### Changed

- Change the default description of playlists created
    -   The playlists created now won't have the original songs name and titles inside the description.
-   Removed versioning from footer (and changed footer layout)
    -   The versioning won't render when deployed.
-   Removed input labels in the playlist creation modal.

### Fixed

- None

### Removed

- None

### Security

- None

## 1.3.0

### Added

- Added the ability to add songs from your playlist
-   Added loading spinners for liked songs and playlist songs when they're loading
-   Added changelog page at `(/changelog)`

### Bugs
-   Users with lower end devices may experience lags and stutters when viewing a playlist with a large amount of songs.

### Changed

- Selecting from Liked songs will show 150 of your latest songs (previously was 50)
-   Add to list button now has a "+" icon beside it
-   Better error handling and output.
    -   Any unknown error will yield the error message and error source and display it in the error page
-   In the added songs / playlist added songs, the title of the song is now bold.
-   All songs now have an underline signifying that clicking it will lead them to Spotify

### Fixed

- None

### Removed

- None

### Security

- None

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