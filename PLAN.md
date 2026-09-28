## Cup'd Product Plan

Cup'd is a coffee-discovery prototype with a dating-app-inspired swipe flow. People browse nearby café drinks, save ones they want to try, and build a lightweight taste profile from their choices.

## Implemented

- Responsive desktop and mobile interface with a dark #1B1719 surface, warm beige status pills, and lime accents.
- Cup'd branding using a full-bleed `assets/cupd.png` app-icon tile, with a text fallback if the image cannot load.
- Login gate: the first saved coffee is free. Saving a second coffee, placing a pickup order, or reaching four swipes opens a modal to log in or create an account.
- Nearby café discovery using browser geolocation, OpenStreetMap Nominatim reverse geocoding, and the Overpass API; a local fallback list is used if location or live lookup fails.
- Swipe, Skip, and Love interactions for browsing and saving coffee, matcha, and tea options.
- Favorites card and a Reviews card, each with the saved count placed next to the headline.
- A dedicated taste-profile card above the pickup card, with a summary that unlocks after four swipes.
- Pickup-order preview, order placement state, and cancellation action.
- Compact card layout with drink image, description, café, address, price, rating, distance, and availability indicators.

## Prototype Boundaries

- Sign-in and account creation are visual placeholders; there is no authentication service. Logging in or creating an account in the modal simply marks the session as logged in.
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


