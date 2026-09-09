"use client";

import Image from "next/image";
import type { MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { weddingData } from "../data/wedding";

type Countdown = { days: number; hours: number; minutes: number; seconds: number };
const emptyCountdown: Countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };

function getCountdown(): Countdown {
  const remaining = new Date(weddingData.event.date).getTime() - Date.now();
  if (remaining <= 0) return emptyCountdown;
  return {
    days: Math.floor(remaining / 86400000),
    hours: Math.floor((remaining / 3600000) % 24),
    minutes: Math.floor((remaining / 60000) % 60),
    seconds: Math.floor((remaining / 1000) % 60),
  };
}

export default function Home() {
  const [countdown, setCountdown] = useState<Countdown>(emptyCountdown);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copied, setCopied] = useState(false);
  const lastFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const initialTick = window.setTimeout(() => setCountdown(getCountdown()), 0);
    const themeTick = window.setTimeout(() => {
      try {
        const storedTheme = window.localStorage.getItem("wedding-theme");
        if (storedTheme === "dark" || storedTheme === "light") setTheme(storedTheme);
      } catch {
        /* localStorage can be unavailable in private browsing. */
      }
    }, 0);
    const interval = window.setInterval(() => setCountdown(getCountdown()), 1000);
    return () => {
      window.clearTimeout(initialTick);
      window.clearTimeout(themeTick);
      window.clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      window.localStorage.setItem("wedding-theme", theme);
    } catch {
      /* Ignore unavailable storage. */
    }
  }, [theme]);

  useEffect(() => {
    if (activeImage === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveImage(null);
      if (event.key === "ArrowRight")
        setActiveImage((current) =>
          current === null ? 0 : (current + 1) % weddingData.gallery.length,
        );
      if (event.key === "ArrowLeft")
        setActiveImage((current) =>
          current === null
            ? weddingData.gallery.length - 1
            : (current - 1 + weddingData.gallery.length) % weddingData.gallery.length,
        );
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeImage]);

  const openGalleryImage = (index: number, event: MouseEvent<HTMLButtonElement>) => {
    lastFocused.current = event.currentTarget;
    setActiveImage(index);
  };
  const closeGallery = () => {
    setActiveImage(null);
    window.setTimeout(() => lastFocused.current?.focus(), 0);
  };
  const setCopiedBriefly = () => {
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };
  const shareInvitation = async () => {
    const shareData = {
      title: "Husna & Fikri",
      text: "Jemputan perkahwinan kami",
      url: window.location.href,
    };
    if (navigator.share) {
      await navigator.share(shareData).catch(() => undefined);
      return;
    }
    await navigator.clipboard?.writeText(window.location.href);
    setCopiedBriefly();
  };
  const copyAccount = async () => {
    await navigator.clipboard?.writeText(weddingData.gift.accountNumber);
    setCopiedBriefly();
  };

  return (
    <>
      <a className="skip-link" href="#main-content">
        Terus ke kandungan
      </a>
      <header className="site-header">
        <a className="monogram" href="#top" aria-label="Kembali ke atas">
          H<span>&amp;</span>F
        </a>
        <nav aria-label="Navigasi utama">
          <a href="#details">Majlis</a>
          <a href="#story">Kisah kami</a>
          <a href="#gallery">Galeri</a>
          <a href="#rsvp">RSVP</a>
        </nav>
        <div className="header-actions">
          <button
            className="icon-button"
            type="button"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label={`Tukar ke tema ${theme === "light" ? "gelap" : "cerah"}`}
          >
            {theme === "light" ? "☾" : "☼"}
          </button>
          <button className="share-button" type="button" onClick={shareInvitation}>
            {copied ? "Disalin" : "Kongsi"}
          </button>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-image" role="img" aria-label="Husna dan Fikri di taman">
            <div className="hero-overlay" />
          </div>
          <div className="hero-content">
            <p className="eyebrow">Jemputan perkahwinan</p>
            <p className="hero-kicker">Dengan penuh kesyukuran</p>
            <h1 id="hero-title">
              <span>{weddingData.couple.bride}</span>
              <i>&amp;</i>
              <span>{weddingData.couple.groom}</span>
            </h1>
            <p className="hero-date">
              {weddingData.event.day} · {weddingData.event.displayDate}
            </p>
            <a className="button button-light" href="#invitation">
              Lihat jemputan <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="hero-note">
            Kuala Lumpur <span /> 2026
          </div>
        </section>
        <section
          className="section intro-section"
          id="invitation"
          aria-labelledby="invitation-title"
        >
          <div className="section-label">01 / Jemputan</div>
          <div className="intro-copy">
            <p className="eyebrow">Assalamualaikum Warahmatullahi Wabarakatuh</p>
            <h2 id="invitation-title">
              Sebuah hari yang kami nantikan, <em>bersama anda.</em>
            </h2>
            <p>
              Dengan penuh kesyukuran ke hadrat Allah SWT, kami menjemput
              Dato&apos;/Datin/Tuan/Puan/Encik/Cik untuk hadir ke majlis perkahwinan kami.
            </p>
            <div className="signature">
              <span>Husna</span>
              <b>&amp;</b>
              <span>Fikri</span>
            </div>
          </div>
        </section>
        <section className="countdown-band" aria-label="Kiraan masa ke majlis perkahwinan">
          <div className="countdown-intro">
            <span className="eyebrow">Menuju hari bahagia</span>
            <strong>
              {countdown.days === 0 &&
              countdown.hours === 0 &&
              countdown.minutes === 0 &&
              countdown.seconds === 0
                ? "Hari ini"
                : "Kami menghitung hari"}
            </strong>
          </div>
          <div className="countdown-grid">
            {Object.entries(countdown).map(([label, value]) => (
              <div className="countdown-item" key={label}>
                <strong>{String(value).padStart(2, "0")}</strong>
                <span>
                  {label === "days"
                    ? "Hari"
                    : label === "hours"
                      ? "Jam"
                      : label === "minutes"
                        ? "Minit"
                        : "Saat"}
                </span>
              </div>
            ))}
          </div>
        </section>
        <section className="section couple-section" aria-labelledby="couple-title">
          <div className="section-label">02 / Pasangan</div>
          <div className="couple-heading">
            <p className="eyebrow">Dua insan, satu cerita</p>
            <h2 id="couple-title">
              Yang kami pilih, <em>setiap hari.</em>
            </h2>
          </div>
          <div className="couple-grid">
            <article className="person-card person-bride">
              <div className="person-image" />
              <p className="eyebrow">Pengantin perempuan</p>
              <h3>{weddingData.couple.brideFull}</h3>
              <p>Anakanda kepada Encik Tarmizi &amp; Puan </p>
            </article>
            <div className="ampersand" aria-hidden="true">
              &amp;
            </div>
            <article className="person-card person-groom">
              <div className="person-image" />
              <p className="eyebrow">Pengantin lelaki</p>
              <h3>{weddingData.couple.groomFull}</h3>
              <p>Anakanda kepada Encik Ahmad Fadzil &amp; Puan Che Razizuwati</p>
            </article>
          </div>
        </section>
        <section className="section details-section" id="details" aria-labelledby="details-title">
          <div className="section-label">03 / Majlis</div>
          <div className="section-heading">
            <p className="eyebrow">Simpan tarikh ini</p>
            <h2 id="details-title">
              Hari yang akan kami <em>kenang selamanya.</em>
            </h2>
          </div>
          <div className="event-grid">
            {weddingData.events.map((event, index) => (
              <article className="event-card" key={event.title}>
                <span className="event-index">0{index + 1}</span>
                <p className="eyebrow">{event.title}</p>
                <h3>{event.day}</h3>
                <p className="event-date">{event.date}</p>
                <div className="event-rule" />
                <p>{event.time}</p>
              </article>
            ))}
          </div>
          <div className="location-row">
            <div>
              <p className="eyebrow">Lokasi</p>
              <h3>{weddingData.event.venue}</h3>
              <p>{weddingData.event.address}</p>
              <p className="muted">{weddingData.event.parking}</p>
            </div>
            <a
              className="button button-dark"
              href={weddingData.event.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Buka Google Maps <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
        <section className="schedule-band" aria-labelledby="schedule-title">
          <div className="section schedule-inner">
            <div className="section-label">04 / Atur cara</div>
            <div className="schedule-content">
              <div>
                <p className="eyebrow">Satu hari untuk dikenang</p>
                <h2 id="schedule-title">
                  Atur cara <em>majlis.</em>
                </h2>
              </div>
              <div className="timeline">
                {weddingData.schedule.map((item) => (
                  <div className="timeline-item" key={item.time}>
                    <time>{item.time}</time>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="section story-section" id="story" aria-labelledby="story-title">
          <div className="section-label">05 / Kisah kami</div>
          <div className="story-intro">
            <p className="eyebrow">Dari satu detik ke detik seterusnya</p>
            <h2 id="story-title">
              Cerita kecil yang membawa kami <em>ke sini.</em>
            </h2>
          </div>
          <div className="story-grid">
            {weddingData.story.map((item) => (
              <article key={item.year}>
                <span>{item.year}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="gallery-section" id="gallery" aria-labelledby="gallery-title">
          <div className="section gallery-heading">
            <div className="section-label">06 / Galeri</div>
            <div>
              <p className="eyebrow">Beberapa detik yang kami simpan</p>
              <h2 id="gallery-title">
                Sekilas <em>tentang kami.</em>
              </h2>
            </div>
          </div>
          <div className="gallery-grid">
            {weddingData.gallery.map((image, index) => (
              <button
                className={`gallery-item gallery-${index + 1}`}
                type="button"
                key={image.src}
                onClick={(event) => openGalleryImage(index, event)}
                aria-label={`Buka foto ${index + 1}: ${image.alt}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="(max-width: 700px) 50vw, 33vw"
                />
              </button>
            ))}
          </div>
        </section>
        <section className="section rsvp-section" id="rsvp" aria-labelledby="rsvp-title">
          <div className="rsvp-card">
            <p className="eyebrow">07 / Kehadiran</p>
            <h2 id="rsvp-title">
              Kehadiran anda adalah <em>hadiah paling bermakna.</em>
            </h2>
            <p>
              Mohon sahkan kehadiran sebelum 15 November 2026. Kami tidak sabar untuk meraikan hari
              ini bersama anda.
            </p>
            <div className="rsvp-actions">
              <a
                className="button button-dark"
                href={weddingData.rsvp.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                RSVP sekarang <span aria-hidden="true">↗</span>
              </a>
              <a
                className="text-link"
                href={weddingData.rsvp.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                atau balas melalui WhatsApp
              </a>
            </div>
          </div>
        </section>
        <section className="section extras-grid">
          <div className="extra-panel gift-panel">
            <p className="eyebrow">Hadiah &amp; ingatan</p>
            <h2>
              Tanda kasih <em>anda.</em>
            </h2>
            <p>
              Kehadiran dan doa anda sudah lebih daripada mencukupi. Jika ingin berkongsi tanda
              kasih:
            </p>
            <div className="account">
              <span>{weddingData.gift.bank}</span>
              <strong>{weddingData.gift.accountNumber}</strong>
              <small>{weddingData.gift.accountName}</small>
            </div>
            <button className="text-link" type="button" onClick={copyAccount}>
              {copied ? "Nombor akaun disalin" : "Salin nombor akaun"}
            </button>
          </div>
          <div className="extra-panel dress-panel">
            <p className="eyebrow">08 / Dress code</p>
            <h2>{weddingData.dressCode.title}</h2>
            <p>{weddingData.dressCode.description}</p>
            <div className="swatches" aria-label="Warna pilihan dress code">
              {weddingData.dressCode.colors.map((color) => (
                <span key={color} style={{ backgroundColor: color }} aria-label={color} />
              ))}
            </div>
            <p className="hashtag">{weddingData.hashtag}</p>
          </div>
        </section>
        <section className="section faq-section" aria-labelledby="faq-title">
          <div className="section-label">09 / Soalan lazim</div>
          <div className="faq-layout">
            <div>
              <p className="eyebrow">Sebelum anda hadir</p>
              <h2 id="faq-title">
                Ada soalan? <em>Kami jawab.</em>
              </h2>
            </div>
            <div className="faq-list">
              {weddingData.faq.map((item, index) => (
                <div className="faq-item" key={item.question}>
                  <button
                    type="button"
                    aria-expanded={openFaq === index}
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <span>{item.question}</span>
                    <span aria-hidden="true">{openFaq === index ? "−" : "+"}</span>
                  </button>
                  {openFaq === index && <p>{item.answer}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="contact-band" aria-labelledby="contact-title">
          <div className="section contact-inner">
            <div>
              <p className="eyebrow">10 / Hubungi</p>
              <h2 id="contact-title">
                Kami menanti <em>khabar anda.</em>
              </h2>
            </div>
            <div className="contact-list">
              {weddingData.contacts.map((contact) => (
                <a href={contact.href} target="_blank" rel="noopener noreferrer" key={contact.name}>
                  <span>{contact.label}</span>
                  <strong>{contact.name} ↗</strong>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="footer-monogram">
          A<span>&amp;</span>R
        </div>
        <p className="footer-names">
          {weddingData.couple.bride} &amp; {weddingData.couple.groom}
        </p>
        <p>Dengan kasih, kami menanti kehadiran anda.</p>
        <span className="footer-line" />
        <small>
          {weddingData.event.displayDate} · {weddingData.hashtag}
        </small>
      </footer>
      {activeImage !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Paparan foto"
          onClick={(event) => {
            if (event.target === event.currentTarget) closeGallery();
          }}
        >
          <button
            className="lightbox-close"
            type="button"
            onClick={closeGallery}
            aria-label="Tutup foto"
          >
            ×
          </button>
          <button
            className="lightbox-nav lightbox-prev"
            type="button"
            onClick={() =>
              setActiveImage(
                (activeImage - 1 + weddingData.gallery.length) % weddingData.gallery.length,
              )
            }
            aria-label="Foto sebelumnya"
          >
            ←
          </button>
          <Image
            src={weddingData.gallery[activeImage].src}
            alt={weddingData.gallery[activeImage].alt}
            width={weddingData.gallery[activeImage].width}
            height={weddingData.gallery[activeImage].height}
            sizes="90vw"
            priority
          />
          <button
            className="lightbox-nav lightbox-next"
            type="button"
            onClick={() => setActiveImage((activeImage + 1) % weddingData.gallery.length)}
            aria-label="Foto seterusnya"
          >
            →
          </button>
        </div>
      )}
    </>
  );
}
