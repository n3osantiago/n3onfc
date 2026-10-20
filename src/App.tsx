import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  Download,
  MapPin,
  MessageCircle,
  Nfc,
  Phone,
  QrCode,
  Send,
  Share2,
  X,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import {
  CONTACT,
  SITE_URL,
  buildInquiry,
  getInquiryUrl,
  makeVCard,
  type Channel,
} from "./contact";

const services = [
  {
    name: "Google review cards",
    label: "FOR YOUR COUNTER",
    description:
      "Give customers a direct link to leave a Google review. A tap opens your review page, so they can share their experience while it’s still fresh.",
    detail: "For cafés, salons, shops, and local businesses.",
    kind: "reviews",
  },
  {
    name: "Custom NFC cards",
    label: "FOR YOUR NEXT INTRODUCTION",
    description:
      "Put your contact details, social profiles, or website behind one card. We’ll work on a design that looks like your business.",
    detail: "For business owners, creators, and teams.",
    kind: "cards",
  },
  {
    name: "Business websites",
    label: "FOR YOUR ONLINE HOME",
    description:
      "A clear place to show what you do and how to reach you. Business pages, portfolios, and contact pages built around what you need.",
    detail: "For a new business or a fresh start online.",
    kind: "web",
  },
];

function ServiceVisual({ kind }: { kind: string }) {
  return (
    <div className={`service-visual visual-${kind}`} aria-hidden="true">
      {kind === "reviews" ? (
        <div className="review-sample">
          <span className="google-mark">G</span>
          <span>Your experience matters.</span>
          <strong>Leave us a review</strong>
          <div className="sample-tap">
            <Nfc size={19} /> Tap here
          </div>
          <small>DESIGN EXAMPLE</small>
        </div>
      ) : kind === "cards" ? (
        <>
          <div className="sample-card card-back">
            <Nfc />
            <span>MAKE IT YOURS.</span>
          </div>
          <div className="sample-card card-front">
            <span>
              YOUR
              <br />
              NAME.
            </span>
            <Nfc />
            <small>YOUR BUSINESS · YOUR LINKS</small>
          </div>
        </>
      ) : (
        <div className="browser-sample">
          <div className="browser-bar">
            <i />
            <i />
            <i />
            <span>yourbusiness.com</span>
          </div>
          <div className="browser-content">
            <small>YOUR BUSINESS</small>
            <strong>
              A place for
              <br />
              what you do.
            </strong>
            <span className="browser-button">
              Let’s talk <ArrowUpRight size={12} />
            </span>
            <div className="browser-blocks">
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [notice, setNotice] = useState("");
  const [qrOpen, setQrOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const qrTrigger = useRef<HTMLButtonElement>(null);
  const noticeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const [service, setService] = useState(services[0].name);
  const [channel, setChannel] = useState<Channel>("whatsapp");
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [details, setDetails] = useState("");
  const [draft, setDraft] = useState("");

  useEffect(() => () => clearTimeout(noticeTimer.current), []);
  useEffect(() => {
    if (qrOpen) dialog.current?.showModal();
    else if (dialog.current?.open) dialog.current.close();
  }, [qrOpen]);

  function notify(message: string) {
    clearTimeout(noticeTimer.current);
    setNotice(message);
    noticeTimer.current = setTimeout(() => setNotice(""), 4500);
  }

  async function copy(text: string, success = "Link copied.") {
    try {
      await navigator.clipboard.writeText(text);
      notify(success);
    } catch {
      notify(
        "Copy isn’t available here. You can select and copy the text below.",
      );
    }
  }

  async function share() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Neo · DPHub NFC",
          text: "NFC cards and websites for your business.",
          url: SITE_URL,
        });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError")
          return;
      }
    }
    await copy(SITE_URL);
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

  function chooseService(value: string) {
    setService(value);
    setDraft("");
    document
      .getElementById("inquiry")
      ?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
  }

  function prepareInquiry(event: FormEvent) {
    event.preventDefault();
    setDraft(buildInquiry({ name, business, service, details }));
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="container nav-wrap">
          <a className="brand" href="#" aria-label="DPHub NFC home">
            <span className="brand-symbol">
              <Nfc size={23} strokeWidth={2} />
            </span>
            <span>
              DPHub<span className="brand-suffix"> / NFC</span>
            </span>
          </a>
          <nav aria-label="Main navigation">
            <a href="#services">What I do</a>
            <a href="#how-it-works">How it works</a>
            <a href="#inquiry">
              Get in touch <ArrowUpRight size={14} />
            </a>
          </nav>
          <button className="header-save" onClick={saveContact}>
            <Download size={16} /> Save contact
          </button>
        </div>
      </header>

      <main id="main">
        <section className="hero container" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="little-rule" /> A SMALL CARD. A BETTER
              INTRODUCTION.
            </p>
            <h1 id="hero-title">
              Good connections
              <br />
              start with
              <br />
              <span>a simple tap.</span>
            </h1>
            <p className="hero-description">
              I’m Neo. I make NFC cards and websites that help people find your
              business, save your details, and stay in touch.
            </p>
            <div className="hero-actions">
              <a className="button button-dark" href="#inquiry">
                Let’s make your card <ArrowUpRight size={19} />
              </a>
              <a className="text-link" href="#services">
                See what I do <ArrowDown size={16} />
              </a>
            </div>
            <div className="location">
              <MapPin size={14} />
              <span>
                Manila, Philippines <span className="location-divider">/</span>{" "}
                Working with businesses nationwide
              </span>
            </div>
          </div>

          <aside
            className="contact-panel"
            aria-label="Neo’s digital business card"
          >
            <div className="contact-panel-top">
              <span>YOUR NEXT CONTACT</span>
              <Nfc size={24} />
            </div>
            <div className="contact-identity">
              <div className="monogram">
                N<span>3</span>O<span className="monogram-dot">.</span>
              </div>
              <div>
                <h2>Neo</h2>
                <p>DPHub Official</p>
              </div>
            </div>
            <p className="contact-specialty">
              NFC cards. Business websites.
              <br />
              Made for the way you connect.
            </p>
            <div className="contact-rule" />
            <a
              className="contact-primary"
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={19} />
              <span>Message on WhatsApp</span>
              <ArrowUpRight size={18} />
            </a>
            <div className="contact-secondary">
              <a href={CONTACT.telegram} target="_blank" rel="noreferrer">
                <Send size={16} />
                Telegram
              </a>
              <a href={CONTACT.viber}>
                <Phone size={16} />
                Viber
              </a>
              <a href={CONTACT.sms}>
                <MessageCircle size={16} />
                Text me
              </a>
            </div>
            <div className="phone-line">
              <a href={CONTACT.call}>0977 168 6786</a>
              <button
                onClick={() => copy(CONTACT.phone, "Phone number copied.")}
                aria-label="Copy phone number"
              >
                <Copy size={14} />
              </button>
            </div>
            <p className="text-first">Please send a message before calling.</p>
            <div className="contact-tools">
              <button onClick={saveContact}>
                <Download size={15} />
                Save contact
              </button>
              <button ref={qrTrigger} onClick={() => setQrOpen(true)}>
                <QrCode size={15} />
                QR code
              </button>
              <button onClick={share} aria-label="Share Neo’s contact page">
                <Share2 size={15} />
              </button>
            </div>
          </aside>
        </section>

        <div className="principles">
          <div className="container principles-inner">
            <span>
              <Nfc size={17} />
              Tap to open your link
            </span>
            <span>
              <QrCode size={17} />
              QR for another way in
            </span>
            <span>
              <Download size={17} />
              Save the contact. Keep in touch.
            </span>
          </div>
        </div>

        <section
          id="services"
          className="services container section-space"
          aria-labelledby="services-title"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">01 / WHAT I DO</p>
              <h2 id="services-title">
                A useful little card.
                <br />A proper place online.
              </h2>
            </div>
            <p>
              Choose what fits your business.
              <br />
              We can work out the details together.
            </p>
          </div>
          <div className="service-grid">
            {services.map((item, index) => (
              <article className="service" key={item.kind}>
                <ServiceVisual kind={item.kind} />
                <div className="service-title">
                  <h3>{item.name}</h3>
                  <span>0{index + 1}</span>
                </div>
                <p className="service-label">{item.label}</p>
                <p className="service-description">{item.description}</p>
                <p className="service-detail">{item.detail}</p>
                <button
                  className="service-link"
                  onClick={() => chooseService(item.name)}
                >
                  Ask about {item.kind === "web" ? "a website" : "these cards"}{" "}
                  <ArrowUpRight size={17} />
                </button>
              </article>
            ))}
          </div>
          <p className="design-note">
            Card and website visuals are design examples. Your design and
            project scope are agreed before production.
          </p>
        </section>

        <section
          id="how-it-works"
          className="process-section"
          aria-labelledby="process-title"
        >
          <div className="container process-layout">
            <div>
              <p className="eyebrow">02 / FROM CARD TO CONNECTION</p>
              <h2 id="process-title">
                Hand it over.
                <br />
                Let the tap do the rest.
              </h2>
              <p className="process-note">
                NFC needs a compatible phone with NFC enabled. A QR code gives
                people another way to open the same link.
              </p>
            </div>
            <ol className="steps">
              <li>
                <span>01</span>
                <div>
                  <h3>We choose the destination.</h3>
                  <p>
                    Your contact page, social profile, website, or Google review
                    link.
                  </p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <h3>We make it your card.</h3>
                  <p>
                    Share your name, logo, and links. We’ll discuss the layout
                    and setup.
                  </p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <h3>They tap. Your link opens.</h3>
                  <p>
                    Hold a compatible phone near the card or scan its QR code.
                    The page opens in their browser.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section
          id="inquiry"
          className="container inquiry-section section-space"
          aria-labelledby="inquiry-title"
        >
          <div className="inquiry-intro">
            <p className="eyebrow">03 / LET’S TALK</p>
            <h2 id="inquiry-title">
              What do you
              <br />
              have in mind<span className="amber-text">?</span>
            </h2>
            <p>
              A card for yourself? Review cards for your shop? A website you’ve
              been meaning to get started?
            </p>
            <p>
              Tell me a little about it. I’ll help you figure out the next step.
            </p>
            <a
              className="text-link"
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noreferrer"
            >
              Or just message me directly <ArrowUpRight size={17} />
            </a>
          </div>
          <form
            className="inquiry-form"
            onSubmit={prepareInquiry}
            onChange={() => setDraft("")}
          >
            <div className="form-row">
              <label htmlFor="name">
                Your name
                <input
                  id="name"
                  autoComplete="name"
                  value={name}
                  maxLength={120}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="What should I call you?"
                  required
                />
              </label>
              <label htmlFor="business">
                Business <span className="optional">(optional)</span>
                <input
                  id="business"
                  autoComplete="organization"
                  value={business}
                  maxLength={160}
                  onChange={(e) => setBusiness(e.target.value)}
                  placeholder="Your business name"
                />
              </label>
            </div>
            <label htmlFor="service">
              I’m interested in
              <select
                id="service"
                value={service}
                onChange={(e) => setService(e.target.value)}
              >
                {services.map((item) => (
                  <option key={item.kind}>{item.name}</option>
                ))}
                <option>Something else</option>
              </select>
            </label>
            <label htmlFor="details">
              A few details <span className="optional">(optional)</span>
              <textarea
                id="details"
                rows={3}
                maxLength={2000}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="What do you need? Add quantities, ideas, or a link."
              />
            </label>
            <fieldset>
              <legend>Where would you like to chat?</legend>
              <div className="channel-options">
                {(["whatsapp", "telegram", "viber", "sms"] as const).map(
                  (value) => (
                    <label
                      className={
                        channel === value ? "channel selected" : "channel"
                      }
                      key={value}
                    >
                      <input
                        type="radio"
                        name="channel"
                        value={value}
                        checked={channel === value}
                        onChange={() => setChannel(value)}
                      />
                      <span>
                        {value === "sms"
                          ? "SMS"
                          : value[0].toUpperCase() + value.slice(1)}
                      </span>
                      {channel === value && <Check size={13} />}
                    </label>
                  ),
                )}
              </div>
            </fieldset>
            <button type="submit" className="button button-dark form-submit">
              Prepare my message <ArrowRight size={18} />
            </button>
            <p className="form-note">
              You’ll review your message before opening your chat app.
            </p>
            {draft && (
              <div
                className="message-preview"
                role="region"
                aria-label="Message preview"
              >
                <strong>Your message</strong>
                <p className="draft-text">{draft}</p>
                {(channel === "telegram" || channel === "viber") && (
                  <p className="paste-note">
                    Copy this message, then paste it into your chat with Neo.
                  </p>
                )}
                <div className="draft-actions">
                  <button
                    className="text-link"
                    type="button"
                    onClick={() =>
                      copy(draft, "Message copied. Paste it in your chat.")
                    }
                  >
                    <Copy size={15} />
                    Copy message
                  </button>
                  <a
                    className="button button-dark"
                    href={getInquiryUrl(channel, draft)}
                    target={
                      channel === "whatsapp" || channel === "telegram"
                        ? "_blank"
                        : undefined
                    }
                    rel="noreferrer"
                  >
                    Open{" "}
                    {channel === "sms"
                      ? "SMS"
                      : channel[0].toUpperCase() + channel.slice(1)}{" "}
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            )}
          </form>
        </section>

        <section className="container faq-section" aria-labelledby="faq-title">
          <h2 id="faq-title">A few things to know.</h2>
          <div className="faq-list">
            <details>
              <summary>Does everyone need an app?</summary>
              <p>
                For a card that opens a web link, the recipient uses their
                phone’s browser. Their phone needs to support NFC and have it
                enabled, or they can scan the QR code with their camera.
              </p>
            </details>
            <details>
              <summary>Can I get a quote first?</summary>
              <p>
                Yes. Send your card quantity, design ideas, and the link you
                want it to open. For websites, tell me which pages and features
                you need. We’ll agree on the scope and price before starting.
              </p>
            </details>
            <details>
              <summary>Can the information be changed later?</summary>
              <p>
                If the card links to a page we manage, that page’s content can
                be updated. Changing the destination encoded on a card depends
                on the card and setup. Let’s discuss this before ordering.
              </p>
            </details>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-top">
          <a className="brand" href="#">
            <span className="brand-symbol">
              <Nfc size={21} />
            </span>
            <span>
              DPHub<span className="brand-suffix"> / NFC</span>
            </span>
          </a>
          <p>
            Good to meet you.
            <br />
            <span>Even better to stay in touch.</span>
          </p>
          <button className="text-link" onClick={saveContact}>
            Save my contact <Download size={16} />
          </button>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} DPHub Official</span>
          <span>Manila, Philippines</span>
          <a href="#main">Back to top ↑</a>
        </div>
      </footer>
      <div className="mobile-actions">
        <button onClick={saveContact}>
          <Download size={17} />
          Save contact
        </button>
        <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer">
          <MessageCircle size={18} />
          Message Neo <ArrowUpRight size={16} />
        </a>
      </div>
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
        <div className="qr-dialog-inner">
          <button
            className="dialog-close"
            onClick={() => setQrOpen(false)}
            aria-label="Close QR code"
          >
            <X size={21} />
          </button>
          <p className="eyebrow">KEEP IN TOUCH</p>
          <h2>Scan to meet Neo.</h2>
          <div className="real-qr">
            <QRCodeSVG
              value={SITE_URL}
              size={220}
              level="M"
              marginSize={4}
              title="Open Neo’s DPHub contact page"
            />
          </div>
          <p>
            Open your camera and point it here
            <br />
            to visit this contact page.
          </p>
          <a className="qr-url" href={SITE_URL}>
            {SITE_URL}
          </a>
          <button className="button button-dark" onClick={() => copy(SITE_URL)}>
            Copy page link <Copy size={16} />
          </button>
        </div>
      </dialog>
    </>
  );
}
