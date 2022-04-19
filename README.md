# Similarify

Read the [changelog](./src/CHANGELOG.md) here.
Go to the `beta` website deployment [here](https://next--similarify.netlify.app/).

### How the branches work

-   main
    -   The most 'stable' branch.
-   next
    -   Next update pushing to Similarify, usually, in testing. If the branch is the same as main, then `next` contents have been pushed to main.

### Deploy status

[![Netlify Status](https://api.netlify.com/api/v1/badges/583fef5b-fa3f-4df3-af2f-3f53419dbc50/deploy-status)](https://app.netlify.com/sites/similarify/deploys)

Powered by recommendations from Spotify, Similarify is an application that helps you discover the songs you like based on the songs you already like!

Since the application is fully client side, the authentication method used for Spotify is the Implicit grant.

## Environment Variables

```
REACT_APP_SPOTIFY_CLIENT_ID=<SPOTIFTY API KEY>
REACT_APP_REDIRECT_URI=<SPOTIFY_REDIRECT_URI>
```
