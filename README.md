# DPHub NFC

Neo’s contact page: save a contact, send a message, or ask about a service.

Live site: https://n3osantiago.github.io/n3onfc/

## Local development

Use Node.js 22.12 or newer.

```sh
npm ci
npm run dev
```

Open the local `/n3onfc/` URL printed by Vite.

```sh
npm test
npm run build
npm run preview
```

GitHub Actions runs tests, builds the static site, and deploys to GitHub Pages when `main` changes. The Vite base path is `/n3onfc/`.

## Content

- `src/App.tsx`: profile, contact buttons, short services list, and QR dialog.
- `src/contact.ts`: contact links, service inquiry links, and vCard.
- `src/index.css`: responsive styles using system fonts.
- `index.html`: page title, metadata, and canonical URL.

Services link directly to WhatsApp with a prepared question. No inquiry form or account is needed. QR generation runs locally with `qrcode.react`; there is no QR image service or backend.

The tests cover contact export, service message encoding, direct contact links, sharing fallback, and decoding the rendered QR. Browser layout and installed messaging apps should also be checked on real devices.
