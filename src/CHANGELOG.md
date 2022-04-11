
## [Unreleased] - 2022-04-10

### Added

- The Spotify Player is now added to every little inch of the application. That includes the Recently Played, Playlists and Search page. (Tracks that can be previewed will have the eye icon beside it!)
- Added "Open in Spotify" button for the Spotify player.
- Added spinning animation for the refresh icon in recently played page and recommendation page.
-   If your token is invalid or you do not have token, after re-authenticating with Spotify, you will be redirected to the page you were before. (e.g. If your token is invalid at `/search`, you will be redirected to `/search` after re-authenticating.) There are a few exceptions:
    -   If you were on the `/playlist/<playlist_id>` page, you will be redirected to the `/playlists` (All your playlists) page after re-authenticating.
    -   If you were on the `/recommendation` page (or you are creating or adding to an existing playlist), you will be redirected to the `/search` page __*by default*__ after re-authenticating. __(UNDER TESTING)__
### Changed

- Changed contents of the About Me page (grammar-wise) and include a link to the "next" branch of Similarify.
-   Changed authentication callback to `/authenticate` instead of `/search`.
-   Changed the BackButton redirect `to` parameter for certain page because of the new authentication callback.

### Fixed

- None

### Removed

- None

### Security

- None
## [0.10.0] - 2022-04-10
>   Animations and new home page, because little details matter 🙌 and also, a huge update, but a small increment 😔.

### Added

- Parameters which are not "activated" will have a hollow dot beside it's name (Previously, the dot is hidden), and becomes solid when it is activated.
- Now, Spotify Player will automatically play the preview.
- Preview-able tracks will now have an eye icon beside the title of the song.
-   New About/FAQ page.

### Changed

- There is a new home page 🥳
    -   Changed layout and added animations of the home screen.
-   Added animations to the Done button. (It'll do a little wiggle every time a song is added/removed 💃)
-   The width of the application will take more space in desktop screen size.
- By default, the Spotify Player volume is now at 50%.
-   Changed the footer items
    -   Moved most of the footer items to the new About page.
- Changed styling of "Adjust Parameters" window's inputs.
    -   Along with that, we added animations and transitions in the parameter page 🥳.
- More padding for done button (from the bottom)
    -   This is because on mobile devices such as iPhone X and above have the home bar at the bottom, close to the done button.
- Changed the album art image size to be smaller in the Recommendation page (for the main track).
-   Tracks with no preview will open Spotify link when clicked.
- Changed styling of "Liked Songs", "Recently Played" and "Playlists" button in search page.
- Changed animation scaling of buttons in Playlist Created/Modified window
- Changed text in search page from "Alternatively, pick from" to "Alternatively, select from"
- __[DEV]__ Parameter name is now lowercase when initializing the instance of the class.

### Fixed

- Fixed the spacing issue of the "Liked Songs", "Recently Played" and "Playlists" button in the Search page on mobile.
-   Fixed the number of playlist not showing up in both "Playlists" page and "Add to existing playlist" window

### Removed

- None

### Security

- None

## [0.9.0] - 2022-04-09
>   We usually put humorous update notes here but that guy is on leave today and we have to take things seriously for today.

>   The semantic version naming convention have changed for Similarify. It went from `1.8.0` > `0.9.0`. However, note that the features remain the same, there is no downgrade of features. The version number changed because version `1.X.X` is supposed to be a very stable branch (which Similarify is far from that).

>   With the serious stuff out of the way, we upgraded the bridge and improved the management of the people who takes care of the bridge! (I just got hired today, as an ad-hoc, im inferring from the previous guy's release notes)

### Added

- Added the ability to click on the artist name, individually anywhere (except for the added songs and added playlist songs window).
-   Added an explicit icon on songs that are explicit.
-   Added back the __REVAMPED__ Spotify Player (only in Recommended page).
    -   The player only shows the audio preview (30 seconds).
    -   It also saves the audio volume (thank me later, PC users with headphones!).
-   __[DEV]__ Added propType checking for important components.

### Changed
-   Now, only 100 of your liked songs pop up! (instead of 150).
-   Changed Brand color.
-   Get Recommendation button color is now green.
-   Background color is now darker.
-   Increased margin of the input slider of the Adjusts Parameter page - This is so that fat fingers can adjusts the parameters easily!
- __[DEV]__ After the previous update's change that all song parameters are instances of the `Parameter` class. It is decided that Similarify adopts the Object Oriented Programming style. Now, Tracks are instances of the `Track` class, artists are instances of the `Artist` class and playlists are instances of the `Playlist` class. Check out the respective class files in `src/utils`!

### Fixed

- Add to playlist button in the Spotify player now changes to "Remove from playlist' when you add the song to your playlist.
-   Fixed an issue where clicking on the "Search" button will call the Spotify API 2 times.

### Removed

- None

### Security

- None

## [1.8.0] - 2022-04-08

>   Another one (feature)! along with a bug fix! 🥳

### Added

- Added new Parameter for your hands to tinkle with called Popularity. Hope you can find less popular songs, so you can show off how cool you are for 'discovering' an underground band and be proud of it!
    -   Get started now by adjusting parameters of a song.

### Changed

- Changed footer margin.
-   __[DEV]__ Parameters are now handled by the new Parameter class which can be found in `src/utils/Parameter.js`. Read the Parameter class file to find out it's properties and how it is used with `AdjustParameters.jsx`.

### Fixed

- Fixed an issue where the currently playing song, when added to your list won't show "Remove from list" when you exit and re-enter the Recently Played page.

### Removed

- None

### Security

- None

## [1.7.0] - 2022-04-08
>   One new feature to the list! ✨. And, we fixed some part of the bridge that was off limits. (We fixed a bug!) ✨

### Added

-   Added Better error messages messages (You'll see an error for every type, either in pop up boxes or shown on screen)
-   Added loading animations for creating or modifying playlists.
-   Added the ability to add your currently playing song to the list. Get started from the Recently Played page!

### Changed

- Changed "View Current Playlist" button colors and icon.
-   Changed animation of some stuff. (Especially noticeable in "Liked Songs" and "Recently Played" page)
-   Changed wording in home page

### Fixed

-   After creating a playlist **from** using the "View Current Playlist" button, the songs that are added (to your list or to the playlist) might still show "Remove from list/Remove from Playlist" even though the items are already removed. (This bug was initially found in version `1.6.3 - The upgrade time 😈`)
    -   This bug is fixed in this update!
    -   This bug fix also indirectly fixes:
        -   Every time the button is clicked, Spotify API will be called, this may affect bandwidth.
        -   Every time the button is clicked and the search box input is empty, the "Added Playlist Song" window might not pop up.

### Removed
-   The party popper emoji from the home page.

### Security

- None
## 1.6.3 - The upgrade time 😈
>   We upgraded the bridge and the workers too! (We upgraded React from 17 to 18) 🥳 and added one new teeny weeny feature that I found useful to myself.
### Added

- __[UNDER TESTING]__ Added the ability to view your current state of your playlist (when you go back from Recommendations, and there is still songs in your playlist) 

### Bugs
-   After creating a playlist from the new feature added above, the songs that are added (to your list or to the playlist) might still show "Remove from list/Remove from Playlist" even though the items are already removed.

### Changed

- Upgraded from React `17` to React `18`

### Fixed

- None

### Removed

- None
## 1.6.2 - Phew, dodged a bullet! ✋🔫
>   The bridge that the workers used to bring you your recommended songs broke after a human didn't double check the fixes done by the bot. It's okay now! Along with the original fix, there are new few fixes too!

>   Fixes which is development focused is prefixed with __[DEV]__

### Added
-   __[DEV]__ Added a custom hook to check for Spotify API key if it exists and if it is valid. This hook is found in `src/hooks/useApikey.js`
-   Added back Sentry for error tracking in production mode.

### Changed
-   None

### Fixed
-   The application should now work as per usual (and the adding of items to your list will now work again - songs won't show "Add to list" even though you have already added it to your list).
    -   The code merge made by the bot (which I non-hesitantly approved) broke some stuff and reverting back the mistake made a bigger mess than it should which is why Similarify goes down for maintainence.
-   __[NEW]__ In the recommendations page, if you added a song into your playlist and refreshed the recommendation, and if the same song appears in the refreshed recommendation, the button will display "Add to Playlist" even though it already has been added.
    -   This bug has been fixed (but the horrors of `O(n^2)` comes back and haunts the Recommended page)

### Removed
-   __[NEW]__ Removed `console.log()` in production mode. This prevents sensitive data from leaking out in the console.

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