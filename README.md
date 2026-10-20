# DPHub NFC

Neo’s digital contact page, NFC card services, and business website inquiries.

Live site: https://n3osantiago.github.io/n3onfc/

## Local development

Use Node.js 22.12 or newer.

```sh
npm ci
npm run dev
```

Open the local `/n3onfc/` URL printed by Vite.

```sh
npm run build
npm run preview
```

The build checks TypeScript and writes the static site to `dist/`. GitHub Actions deploys the build to GitHub Pages when `main` changes. The Vite base path is `/n3onfc/`.

## Content and contact details

- `src/App.tsx`: page content, service examples, and accessible QR dialog.
- `src/contact.ts`: contact links, inquiry message formatting, and vCard.
- `src/index.css`: responsive styles and reduced motion support.
- `index.html`: title, social metadata, and canonical URL.

The QR code encodes the live page URL locally with `qrcode.react`. It does not use a third-party QR image service. Inquiry messages are shown for review before opening the chosen app. WhatsApp and SMS support prepared text; Telegram and Viber require copying and pasting the message. This static site has no form backend, API keys, or AI service dependency.

The on-page card and website visuals are illustrative design examples, not customer work.

## Verification

```sh
npm test
npm run build
```

The tests cover the vCard, WhatsApp and SMS message encoding, service selection and inquiry preview, Telegram copy handoff, and decoding the rendered QR code to verify its destination. Browser layout and installed messaging apps should also be checked on real devices.
