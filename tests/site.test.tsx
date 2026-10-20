import assert from "node:assert/strict";
import { test } from "node:test";
import { JSDOM } from "jsdom";
import React from "react";
import sharp from "sharp";
import jsQR from "jsqr";
import {
  buildInquiry,
  CONTACT,
  getInquiryUrl,
  makeVCard,
  SITE_URL,
} from "../src/contact";

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
window.matchMedia = (query: string) => ({
  matches: true,
  media: query,
  onchange: null,
  addListener() {},
  removeListener() {},
  addEventListener() {},
  removeEventListener() {},
  dispatchEvent() { return true; },
});
window.HTMLElement.prototype.scrollIntoView = () => {};
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

test("inquiries preserve punctuation, Unicode, and newlines in app links", () => {
  const message = buildInquiry({
    name: "  Ana & José  ",
    business: "  Café #1  ",
    service: "Custom NFC cards",
    details: "  50 cards\nLogo: A&B  ",
  });
  const url = new URL(getInquiryUrl("whatsapp", message));
  assert.equal(url.searchParams.get("text"), message);
  assert.ok(message.includes("Ana & José from Café #1"));
  assert.ok(message.includes("50 cards\nLogo: A&B"));
  assert.equal(getInquiryUrl("telegram", message), CONTACT.telegram);
  assert.equal(getInquiryUrl("viber", message), CONTACT.viber);
  assert.ok(getInquiryUrl("sms", message).startsWith(`${CONTACT.sms}?body=`));
  Object.defineProperty(navigator, "userAgent", {
    value: "iPhone",
    configurable: true,
  });
  assert.ok(getInquiryUrl("sms", message).startsWith(`${CONTACT.sms}&body=`));
});

test("service selection, message preview, and Telegram copy handoff work together", async () => {
  const user = userEvent.setup({ document });
  render(<App />);
  await user.click(screen.getByRole("button", { name: "Ask about a website" }));
  assert.equal(
    (screen.getByLabelText("I’m interested in") as HTMLSelectElement).value,
    "Business websites",
  );
  await user.type(screen.getByLabelText("Your name"), "Ana");
  await user.type(screen.getByLabelText(/Business \(optional\)/), "Café & Co");
  await user.click(screen.getByRole("radio", { name: "Telegram" }));
  await user.click(screen.getByRole("button", { name: "Prepare my message" }));
  const preview = screen.getByRole("region", { name: "Message preview" });
  assert.ok(preview.textContent?.includes("Ana from Café & Co"));
  assert.ok(preview.textContent?.includes("business websites"));
  assert.equal(
    screen.getByRole("link", { name: "Open Telegram" }).getAttribute("href"),
    CONTACT.telegram,
  );
  await user.click(screen.getByRole("button", { name: "Copy message" }));
  assert.ok((await navigator.clipboard.readText()).includes("Café & Co"));
  await user.type(screen.getByLabelText("Your name"), " B");
  assert.equal(screen.queryByRole("region", { name: "Message preview" }), null);
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
  const decoded = jsQR(new Uint8ClampedArray(data), info.width, info.height);
  assert.equal(decoded?.data, SITE_URL);
  await user.click(screen.getByRole("button", { name: "Close QR code" }));
  assert.equal(screen.queryByRole("dialog"), null);
  cleanup();
});
