import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Copy,
  Download,
  MessageCircle,
  Nfc,
  Phone,
  QrCode,
  Send,
  Share2,
  X,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { CONTACT, SITE_URL, getServiceUrl, makeVCard } from "./contact";

const services = [
  {
    name: "Google review cards",
    description: "Let customers tap to leave a review.",
  },
  {
    name: "Custom NFC cards",
    description: "Share your contact details, socials, or website.",
  },
  {
    name: "Business websites",
    description: "A simple website for your business.",
  },
];

export default function App() {
  const [notice, setNotice] = useState("");
  const [qrOpen, setQrOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const qrTrigger = useRef<HTMLButtonElement>(null);
  const noticeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  useEffect(() => () => clearTimeout(noticeTimer.current), []);
  useEffect(() => {
    if (qrOpen) dialog.current?.showModal();
    else if (dialog.current?.open) dialog.current.close();
  }, [qrOpen]);

  function notify(message: string) {
    clearTimeout(noticeTimer.current);
    setNotice(message);
    noticeTimer.current = setTimeout(() => setNotice(""), 4000);
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(SITE_URL);
      notify("Page link copied.");
    } catch {
      setQrOpen(true);
      notify("You can select and copy the link below the QR code.");
    }
  }

  async function share() {
    if (navigator.share) {
      try {
        await navigator.share({ title: "Neo · DPHub NFC", url: SITE_URL });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError")
          return;
      }
    }
    await copyLink();
  }

  function saveContact() {
    const url = URL.createObjectURL(
      new Blob([makeVCard()], { type: "text/vcard;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "Neo-DPHub.vcf";
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <>
      <main className="contact-page">
        <header className="brand">
          <Nfc size={20} />
          <span>
            DPHub <span className="brand-light">NFC</span>
          </span>
        </header>

        <section className="profile" aria-labelledby="name">
          <div className="avatar" aria-hidden="true">
            N<span>3</span>O
          </div>
          <h1 id="name">Hi, I’m Neo.</h1>
          <p className="profile-description">NFC cards & business websites</p>
          <p className="location">Manila, Philippines</p>
        </section>

        <section className="contact-actions" aria-label="Contact Neo">
          <a
            className="button primary"
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={20} />
            Message on WhatsApp
            <ArrowUpRight className="action-arrow" size={18} />
          </a>
          <button className="button secondary" onClick={saveContact}>
            <Download size={20} />
            Save my contact
          </button>
          <div className="other-channels">
            <a href={CONTACT.telegram} target="_blank" rel="noreferrer">
              <Send size={17} />
              Telegram
            </a>
            <a href={CONTACT.viber}>
              <Phone size={17} />
              Viber
            </a>
            <a href={CONTACT.sms}>
              <MessageCircle size={17} />
              SMS
            </a>
          </div>
          <p className="phone">
            <a href={CONTACT.call}>0977 168 6786</a>
            <span>Please message before calling.</span>
          </p>
        </section>

        <section className="services" aria-labelledby="services-title">
          <h2 id="services-title">How I can help</h2>
          <p className="services-note">
            Tap a service to ask me about it on WhatsApp.
          </p>
          <div className="service-list">
            {services.map((service) => (
              <a
                className="service"
                key={service.name}
                href={getServiceUrl(service.name)}
                target="_blank"
                rel="noreferrer"
              >
                <div>
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                </div>
                <ArrowUpRight size={19} aria-hidden="true" />
              </a>
            ))}
          </div>
        </section>

        <div className="page-tools" aria-label="Share this page">
          <button ref={qrTrigger} onClick={() => setQrOpen(true)}>
            <QrCode size={17} />
            QR code
          </button>
          <button onClick={share}>
            <Share2 size={17} />
            Share page
          </button>
        </div>
        <footer>© {new Date().getFullYear()} DPHub Official</footer>
      </main>

      <div
        className={notice ? "toast visible" : "toast"}
        role="status"
        aria-live="polite"
      >
        {notice}
      </div>
      <dialog
        ref={dialog}
        className="qr-dialog"
        aria-label="Scan Neo’s contact page QR code"
        onCancel={() => setQrOpen(false)}
        onClose={() => {
          setQrOpen(false);
          qrTrigger.current?.focus();
        }}
        onClick={(event) => {
          if (event.target === dialog.current) setQrOpen(false);
        }}
      >
        <div className="qr-content">
          <button
            className="dialog-close"
            onClick={() => setQrOpen(false)}
            aria-label="Close QR code"
          >
            <X size={21} />
          </button>
          <h2>Scan to connect</h2>
          <p>Open this page on another phone.</p>
          <div className="real-qr">
            <QRCodeSVG
              value={SITE_URL}
              size={220}
              level="M"
              marginSize={4}
              title="Open Neo’s DPHub contact page"
            />
          </div>
          <a className="qr-url" href={SITE_URL}>
            {SITE_URL}
          </a>
          <button className="button primary" onClick={copyLink}>
            <Copy size={17} />
            Copy page link
          </button>
        </div>
      </dialog>
    </>
  );
}
