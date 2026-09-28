## Cup'd Product Plan

Cup'd is a coffee-discovery prototype with a dating-app-inspired swipe flow. People browse nearby café drinks, save ones they want to try, and build a lightweight taste profile from their choices.

## Implemented

- Responsive desktop and mobile interface with a dark #1B1719 surface, warm beige status pills, and lime accents.
- Cup'd branding, including an image-based wordmark slot at `assets/cupd-logo.png` with a text fallback.
- Location activation screen with a location-permission prompt and a visual map preview.
- Nearby café discovery using browser geolocation, OpenStreetMap Nominatim reverse geocoding, and the Overpass API; a local fallback list is used if location or live lookup fails.
- Swipe, Skip, and Love interactions for browsing and saving coffee, matcha, and tea options.
- Favorites and Already tried lists, with ratings for the café, drink, and vibe.
- Taste profile summary after five swipes, inferred from the attributes of the selected drinks.
- Pickup-order preview, order placement state, and cancellation action.
- Compact card layout with drink image, description, café, address, price, rating, distance, and availability indicators.

## Prototype Boundaries

- Sign-in and account creation are visual placeholders; there is no authentication service.
- Favorites, reviews, swipe history, and orders are held in browser memory and do not persist across reloads.
- Pickup is a local UI demonstration only; no café receives an order or payment.
- Café availability, menu items, prices, ratings, and fallback photos may be illustrative. OpenStreetMap data is not a live menu or ordering feed.
- Location requires browser permission and network access for live lookup. The app falls back to its local coffee list when those services are unavailable.

## Future Work

- Add real authentication and persistent user profiles, favorites, reviews, and taste preferences.
- Add trusted menu, hours, pricing, and availability sources.
- Integrate a café-supported pickup and payment provider.
- Add accessibility and browser-device testing across the complete user flow.
- Add rewards, profile settings, and messaging only if they support the core discovery experience.

## Technology

- HTML, CSS, and vanilla JavaScript.
- Browser Geolocation API.
- OpenStreetMap Nominatim and Overpass APIs.
- Static coffee fallback data in `js/app.js`.


