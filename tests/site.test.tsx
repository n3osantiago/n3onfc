import assert from "node:assert/strict";
import { test } from "node:test";
import { JSDOM } from "jsdom";
import React from "react";
import sharp from "sharp";
import jsQR from "jsqr";
import { CONTACT, getServiceUrl, makeVCard, SITE_URL } from "../src/contact";

const dom = new JSDOM("<!doctype html><html><body></body></html>", {
  url: SITE_URL,
});
Object.defineProperties(globalThis, {
  window: { value: dom.window, configurable: true },
  document: { value: dom.window.document, configurable: true },
  navigator: { value: dom.window.navigator, configurable: true },
  HTMLElement: { value: dom.window.HTMLElement, configurable: true },
  HTMLDialogElement: {
    value: dom.window.HTMLDialogElement,
    configurable: true,
  },
  DOMException: { value: dom.window.DOMException, configurable: true },
  IS_REACT_ACT_ENVIRONMENT: { value: true, writable: true },
});
window.HTMLDialogElement.prototype.showModal = function () {
  this.open = true;
};
window.HTMLDialogElement.prototype.close = function () {
  this.open = false;
  this.dispatchEvent(new window.Event("close"));
};

const { render, screen, cleanup } = await import("@testing-library/react");
const { default: userEvent } = await import("@testing-library/user-event");
const { default: App } = await import("../src/App");

test("contact export is a complete vCard with the live site and correct phone", () => {
  const card = makeVCard();
  assert.ok(card.startsWith("BEGIN:VCARD\r\nVERSION:3.0\r\n"));
  assert.ok(card.endsWith("END:VCARD\r\n"));
  assert.ok(card.includes("N:;Neo;;;"));
  assert.ok(card.includes("TEL;TYPE=CELL,VOICE:+639771686786"));
  assert.ok(card.includes(`URL:${SITE_URL}`));
});

test("service inquiries open the correct WhatsApp conversation with readable text", () => {
  const url = new URL(getServiceUrl("NFC cards & café links"));
  assert.equal(url.origin + url.pathname, CONTACT.whatsapp);
  assert.equal(
    url.searchParams.get("text"),
    "Hi Neo, I’m interested in nfc cards & café links. Could you share the options and pricing?",
  );
});

test("contact and service links are direct, and sharing falls back to copying the page URL", async () => {
  const user = userEvent.setup({ document });
  render(<App />);
  assert.equal(
    screen
      .getByRole("link", { name: "Message on WhatsApp" })
      .getAttribute("href"),
    CONTACT.whatsapp,
  );
  for (const name of ["Telegram", "Viber", "SMS"]) {
    assert.equal(
      screen.getByRole("link", { name }).getAttribute("href"),
      CONTACT[name.toLowerCase() as "telegram" | "viber" | "sms"],
    );
  }
  const websiteLink = screen.getByRole("link", { name: /Business websites/ });
  assert.equal(
    new URL(websiteLink.getAttribute("href")!).searchParams.get("text"),
    "Hi Neo, I’m interested in business websites. Could you share the options and pricing?",
  );
  await user.click(screen.getByRole("button", { name: "Share page" }));
  assert.equal(await navigator.clipboard.readText(), SITE_URL);
  assert.ok(
    screen.getByRole("status").textContent?.includes("Page link copied."),
  );
  cleanup();
});

test("the actual rendered QR decodes to the public contact page", async () => {
  const user = userEvent.setup({ document });
  render(<App />);
  await user.click(screen.getByRole("button", { name: "QR code" }));
  const modal = screen.getByRole("dialog", {
    name: "Scan Neo’s contact page QR code",
  });
  const svg = modal.querySelector(".real-qr svg")!;
  assert.ok(svg);
  const { data, info } = await sharp(Buffer.from(svg.outerHTML))
    .resize(660, 660)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  assert.equal(
    jsQR(new Uint8ClampedArray(data), info.width, info.height)?.data,
    SITE_URL,
  );
  await user.click(screen.getByRole("button", { name: "Close QR code" }));
  assert.equal(screen.queryByRole("dialog"), null);
  cleanup();
});
