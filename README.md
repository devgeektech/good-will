# Goodwill India | Film Experience

Production-oriented Next.js microsite for the Goodwill India invitation campaign.

## Current source of truth

The page follows Anagha's latest direction:

- explain why Goodwill India matters before listing programmes;
- show the India journey in chronological order;
- December 3: rest in Mumbai;
- December 4: Pune filming, two to three initiatives;
- December 5: Pune filming, with Jim Keyes session tentative;
- December 6: shopping and motivational sessions, Skip Martin concert tentative;
- December 7-8: Brahma Kumaris spiritual retreat in Pune;
- December 9: Taj Mahal;
- December 10-11: Jaipur;
- December 12: return via Delhi or Mumbai;
- Host: Anagha Deshmukh;
- Co-host: Padmakar Nandekar;
- tentative guests: Makarand Javdekar, Skip Martin, Cathy Goldstein, Kevin Goldstein and Jim Keyes;
- primary invitation CTA uses Anagha's Calendly link;
- Goodwill initiatives appear later in the page as a rotating visual experience;
- crowdfunding remains a separate future pathway and is not linked until a real URL is configured.

## Design and interaction

- dark cinematic editorial interface;
- glass navigation with larger readable menu labels;
- real Goodwill imagery and video used throughout;
- visual journey stage with date rail and active destination panel;
- full-screen service transition;
- large rectangular 3D cause carousel with no media-type labels;
- drag/swipe works across the whole cause stage;
- only the active card and nearby cards remain visible;
- active cause video autoplays muted and loops;
- Host and Co-host receive the highest visual hierarchy in the people section;
- film team and tentative guests follow beneath;
- Guinness certificate modal;
- responsive layouts and reduced-motion handling;
- no generic donation CTA.

## Local media

The `/public/media` folder contains the supplied Goodwill India project assets used by the page. Higher-resolution versions supplied in the conversation replace several older compressed images.

The public `goodwillindia.setoo.work` site could not be fetched from the current build runtime, so this package does **not** hotlink that site or pretend to include assets that were not successfully retrieved. When those files are available locally, they can be dropped into `/public/media` without changing the page architecture.

The shared Dropbox Oscar-event folder was also not imported into this package because Dropbox is not connected in this workspace. The page is complete without those photos; they can be added as an optional film/recognition gallery later.

## Environment

Create `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_CROWDFUNDING_URL=
```

The crowdfunding URL can remain empty until Dan Weiseman's page is ready.

## Run

```bash
npm install
npm run typecheck
npm run build
npm start
```

Node 20.9+ is recommended.

## Before launch

1. Confirm the tentative guest list.
2. Confirm Jim Keyes and Skip Martin itinerary items.
3. Add the crowdfunding URL when available.
4. Replace the local Mumbai/Brahma Kumaris editorial illustrations with client-approved photographs if those exact assets are supplied later.
5. Run final browser QA on desktop, tablet and mobile.
