export const SITE_URL = "https://n3osantiago.github.io/n3onfc/";
export const CONTACT = {
  phone: "09771686786",
  whatsapp: "https://wa.me/639771686786",
  telegram: "https://t.me/dphubofficial",
  viber: "viber://chat?number=%2B639771686786",
  sms: "sms:+639771686786",
  call: "tel:+639771686786",
};
export type Channel = "whatsapp" | "telegram" | "viber" | "sms";

export function buildInquiry({
  name,
  business,
  service,
  details,
}: {
  name: string;
  business: string;
  service: string;
  details: string;
}) {
  return `Hi Neo, I’m ${name.trim()}${business.trim() ? ` from ${business.trim()}` : ""}. I’m interested in ${service.toLowerCase()}.${details.trim() ? `\n\n${details.trim()}` : ""}\n\nCould you share the options and pricing?`;
}

export function getInquiryUrl(channel: Channel, message: string) {
  if (channel === "whatsapp")
    return `${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
  if (channel === "sms") {
    const isApple =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    return `${CONTACT.sms}${isApple ? "&" : "?"}body=${encodeURIComponent(message)}`;
  }
  return CONTACT[channel];
}

export function makeVCard() {
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:;Neo;;;",
    "FN:Neo - DPHub Official",
    "ORG:DPHub Official",
    "TITLE:NFC Cards and Business Websites",
    "TEL;TYPE=CELL,VOICE:+639771686786",
    `URL:${SITE_URL}`,
    "X-SOCIALPROFILE;TYPE=telegram:https://t.me/dphubofficial",
    "NOTE:Please send a message before calling.",
    "END:VCARD",
    "",
  ].join("\r\n");
}
