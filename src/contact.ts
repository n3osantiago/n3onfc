export const SITE_URL = "https://n3osantiago.github.io/n3onfc/";
export const CONTACT = {
  phone: "09771686786",
  whatsapp: "https://wa.me/639771686786",
  telegram: "https://t.me/dphubofficial",
  viber: "viber://chat?number=%2B639771686786",
  sms: "sms:+639771686786",
  call: "tel:+639771686786",
};

export function getServiceUrl(service: string) {
  const message = `Hi Neo, I’m interested in ${service.toLowerCase()}. Could you share the options and pricing?`;
  return `${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
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
