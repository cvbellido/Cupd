# Cup'd

Cup'd is a responsive coffee-discovery prototype. Browse nearby café drinks, swipe to save or skip, rate places you've tried, and see a taste profile after five swipes.

## Run locally

This is a static HTML, CSS, and JavaScript project with no package install or build step. Serve the project over localhost so browser geolocation works:

```sh
python3 -m http.server 8000
```

Open <http://localhost:8000/activate.html> for the location activation screen or <http://localhost:8000/index.html> for the main app. Geolocation requires permission. Live place lookup uses OpenStreetMap Nominatim and Overpass; if location is unavailable or a lookup fails, the app uses its built-in sample coffee list.

## Features

- Responsive coffee swipe deck with Skip and Love actions.
- Favorites and Already tried lists.
- Ratings for the café, coffee, and vibe.
- A taste profile summary after five swipes.
- Nearby café lookup and an order preview with cancellation.
- Cup'd wordmark image support with a text fallback.

## Brand asset

The app uses the supplied logo at `assets/cupd.png`. If it cannot load, it displays the Cup'd text wordmark instead.

## Prototype limitations

Authentication and account creation are visual placeholders. The app stores interactions only in in-memory browser state, so they reset on reload. Pickup orders are a local demonstration and are not sent to a café or payment provider. Menu details, prices, ratings, hours, availability, and some images are illustrative; OpenStreetMap provides place discovery, not live café menus or ordering. Do not use the prototype to place a real order.

## Deployment

The static files can be hosted on GitHub Pages, Vercel, or another static host. Browser geolocation requires HTTPS outside localhost. Live location lookup also depends on the third-party OpenStreetMap services being reachable.
