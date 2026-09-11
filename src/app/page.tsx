"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { weddingData } from "../data/wedding";
import { createCalendarFile } from "../lib/ics";

type Countdown = { days: number; hours: number; minutes: number; seconds: number };

function getCountdown(): Countdown {
  const remaining = new Date(weddingData.event.date).getTime() - Date.now();
  if (remaining <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(remaining / 86400000),
    hours: Math.floor((remaining / 3600000) % 24),
    minutes: Math.floor((remaining / 60000) % 60),
    seconds: Math.floor((remaining / 1000) % 60),
  };
}

function getGuestName(): string {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get("kepada")?.replace(/[<>]/g, "").trim().slice(0, 60) ?? "";
}

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [countdown, setCountdown] = useState<Countdown>(getCountdown());
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [guestName, setGuestName] = useState("");

  useEffect(() => {
    const interval = window.setInterval(() => setCountdown(getCountdown()), 1000);
    const guestNameTick = window.setTimeout(() => setGuestName(getGuestName()), 0);
    return () => {
      window.clearInterval(interval);
      window.clearTimeout(guestNameTick);
    };
  }, []);

  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>(".reveal");
    if (!("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [opened]);

  useEffect(() => {
    if (activeImage === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveImage(null);
      if (event.key === "ArrowRight") setActiveImage((current) => current === null ? 0 : (current + 1) % weddingData.gallery.length);
      if (event.key === "ArrowLeft") setActiveImage((current) => current === null ? weddingData.gallery.length - 1 : (current - 1 + weddingData.gallery.length) % weddingData.gallery.length);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeImage]);

  const showToast = () => {
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  const shareInvitation = async () => {
    const shareData = {
      title: "Mohamad Fikri & Husna Syakirin | 13 March 2027",
      text: "Dengan penuh kesyukuran, kami menjemput anda ke majlis kami pada 13 March 2027.",
      url: window.location.href,
    };
    if (navigator.share) {
      await navigator.share(shareData).catch(() => undefined);
      return;
    }
    await navigator.clipboard?.writeText(window.location.href);
    showToast();
  };

  const downloadCalendar = () => {
    const file = createCalendarFile({
      uid: "wedding-fikri-husna-20270313",
      start: "20270313T100000",
      end: "20270313T160000",
      summary: "Majlis Perkahwinan Mohamad Fikri & Husna Syakirin",
      location: `${weddingData.event.venue}, ${weddingData.event.address}`,
      description: "Dengan penuh kesyukuran, kami menjemput anda ke majlis perkahwinan kami pada 13 March 2027.",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([file], { type: "text/calendar" }));
    link.download = "wedding-fikri-husna-20270313.ics";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  if (!opened) {
    return (
      <main className="opening-screen">
        <div className="opening-card card-frame">
          <div className="opening-line" aria-hidden="true" />
          <p className="arabic" lang="ar" dir="rtl">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
          <p className="kicker">The wedding of</p>
          {guestName && <p className="guest-name">Kepada<br /><strong>{guestName}</strong></p>}
          <div className="seal" aria-hidden="true">F<span>&amp;</span>H</div>
          <p className="opening-names">Mohamad Fikri<br /><i>&amp;</i><br />Husna Syakirin</p>
          <p className="opening-date">{weddingData.event.compactDate}</p>
          <button className="button gold-button" type="button" onClick={() => setOpened(true)}>Buka jemputan <span aria-hidden="true">↓</span></button>
        </div>
      </main>
    );
  }

  return (
    <main className="invitation-page" id="top">
      <div className="invitation-shell card-frame">
        <header className="invitation-header">
          <a className="mini-monogram" href="#top" aria-label="Kembali ke halaman utama">F<span>&amp;</span>H</a>
          <nav aria-label="Navigasi jemputan"><a href="#story">Cerita</a><a href="#details">Majlis</a><a href="#gallery">Galeri</a><a href="#rsvp">RSVP</a></nav>
          <button className="share-button" type="button" onClick={shareInvitation}>{copied ? "Pautan disalin" : "Kongsi"}</button>
        </header>

        <section className="cover hero-story" aria-labelledby="cover-title">
          <div className="cover-ornament top-ornament" aria-hidden="true">❦</div>
          <p className="arabic" lang="ar" dir="rtl">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
          <p className="kicker">The wedding of</p>
          {guestName && <p className="guest-name cover-guest">Kepada <strong>{guestName}</strong></p>}
          <h1 id="cover-title"><span>Mohamad Fikri</span><i>&amp;</i><span>Husna Syakirin</span></h1>
          <div className="cover-rule"><span>✦</span></div>
          <p className="cover-date">{weddingData.event.compactDate}<strong>{weddingData.event.venue}</strong></p>
          <p className="scroll-cue"><span /> Scroll untuk meneroka</p>
        </section>

        <section className="card-section message-section reveal" id="invitation" aria-labelledby="message-title">
          <p className="section-kicker">01 / Jemputan</p>
          <p className="arabic-message" lang="ar" dir="rtl">السَّلامُ عَلَيْكُمْ</p>
          <h2 id="message-title">Satu doa, <em>satu janji.</em></h2>
          <p>Dengan penuh kesyukuran ke hadrat Allah SWT, kami sekeluarga dengan segala hormatnya menjemput Dato&apos;/Datin/Tuan/Puan/Encik/Cik ke majlis perkahwinan putera kami.</p>
          <div className="signature">F<span>&amp;</span>H</div>
          <p className="parents">Anakanda kepada<br />Encik Ahmad Fadzil &amp; Puan Che Razizuwati<br /><span>dan</span><br />Encik Tarmizi &amp; Puan</p>
        </section>

        <section className="countdown-strip reveal" aria-label="Kiraan masa ke majlis perkahwinan"><p className="section-kicker">Counting down to {weddingData.event.compactDate}</p><div className="countdown-grid">{Object.entries(countdown).map(([label, value]) => <div key={label}><strong>{String(value).padStart(2, "0")}</strong><span>{label === "days" ? "Hari" : label === "hours" ? "Jam" : label === "minutes" ? "Minit" : "Saat"}</span></div>)}</div></section>

        <section className="story-section reveal" id="story" aria-labelledby="story-title"><div className="card-section"><p className="section-kicker">02 / Our story</p><h2 id="story-title">Cerita kecil yang membawa kami <em>ke sini.</em></h2><div className="story-timeline">{weddingData.story.map((item) => <article className="story-item" key={item.year}><span>{item.year}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div></div></section>

        <section className="card-section details-section reveal" id="details" aria-labelledby="details-title"><p className="section-kicker">03 / Majlis</p><h2 id="details-title">Hari yang akan kami <em>kenang selamanya.</em></h2><div className="event-list">{weddingData.events.map((event, index) => <article className="event-entry" key={event.title}><span className="event-index">0{index + 1}</span><div><p className="section-kicker">{event.title}</p><h3>{event.date}</h3><p>{event.day} · {event.time}</p></div></article>)}</div><div className="location-panel"><p className="section-kicker">Location</p><h3>{weddingData.event.venue}</h3><p>{weddingData.event.address}</p><div className="location-actions"><a className="button button-outline" href={weddingData.event.mapsUrl} target="_blank" rel="noopener noreferrer">Lihat lokasi ↗</a><button className="text-button" type="button" onClick={downloadCalendar}>Tambah ke kalendar ↓</button></div></div></section>

        <section className="schedule-section reveal" aria-labelledby="schedule-title"><div className="card-section"><p className="section-kicker">04 / Wedding programme</p><h2 id="schedule-title">Atur cara <em>majlis.</em></h2><div className="timeline">{weddingData.schedule.map((item) => <div className="timeline-item" key={item.time}><time>{item.time}</time><div><h3>{item.title}</h3><p>{item.description}</p></div></div>)}</div></div></section>

        <section className="card-section gallery-section reveal" id="gallery" aria-labelledby="gallery-title"><p className="section-kicker">05 / Gallery</p><h2 id="gallery-title">Sekilas <em>tentang kami.</em></h2><div className="gallery-grid">{weddingData.gallery.slice(0, 4).map((image, index) => <button className={`gallery-item gallery-${index + 1}`} type="button" key={image.src} onClick={() => setActiveImage(index)} aria-label={`Buka foto ${index + 1}: ${image.alt}`}><Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 700px) 50vw, 300px" /></button>)}</div></section>

        <section className="card-section wishes-section reveal" aria-labelledby="wishes-title"><p className="section-kicker">06 / Doa dan ingatan</p><h2 id="wishes-title">Titipkan <em>ucapan.</em></h2><div className="wishes-list">{weddingData.wishes.samples.map((wish) => <blockquote key={wish.by}>“{wish.quote}”<cite>— {wish.by}</cite></blockquote>)}</div><a className="text-button" href={weddingData.wishes.url} target="_blank" rel="noopener noreferrer">Hantar ucapan ↗</a></section>

        <section className="card-section extras-section reveal" aria-labelledby="extras-title"><div><p className="section-kicker">07 / Tanda kasih</p><h2 id="extras-title">Kehadiran anda <em>sudah mencukupi.</em></h2><p>{weddingData.gift.bank}</p><div className="account-line"><strong>{weddingData.gift.accountNumber}</strong><span>{weddingData.gift.accountName}</span></div><button className="text-button" type="button" onClick={() => navigator.clipboard?.writeText(weddingData.gift.accountNumber).then(showToast)}>{copied ? "✓ Disalin" : "Salin maklumat akaun"}</button></div><div><p className="section-kicker">Dress code</p><h3 className="extra-title">{weddingData.dressCode.title}</h3><p>{weddingData.dressCode.description}</p><div className="swatches">{weddingData.dressCode.colors.map((color) => <span key={color} style={{ backgroundColor: color }} aria-label={color} />)}</div><p className="parking-note">{weddingData.event.parking}</p></div></section>

        <section className="card-section rsvp-section reveal" id="rsvp" aria-labelledby="rsvp-title"><p className="section-kicker">08 / Kehadiran</p><h2 id="rsvp-title">Kami menanti <em>khabar anda.</em></h2><p>Mohon sahkan kehadiran sebelum {weddingData.rsvpDeadline}. Kami menanti untuk meraikan hari ini bersama anda.</p><div className="rsvp-actions"><a className="button gold-button" href={weddingData.rsvp.url} target="_blank" rel="noopener noreferrer">Sahkan kehadiran ↗</a><a className="text-button" href={weddingData.rsvp.whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp ↗</a></div></section>

        <section className="closing-section reveal"><span className="ornament">❦</span><p>Terima kasih atas doa dan ingatan yang diberikan.</p><p>Kehadiran serta doa restu daripada Dato&apos;/Datin/Tuan/Puan/Encik/Cik amat kami hargai.</p><div className="closing-names">Mohamad Fikri<br /><i>&amp;</i><br />Husna Syakirin</div><small>{weddingData.event.compactDate}</small></section>
      </div>
      {copied && <div className="toast" role="status">Pautan disalin</div>}
      {activeImage !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Paparan foto" onClick={(event) => { if (event.target === event.currentTarget) setActiveImage(null); }}><button className="lightbox-close" type="button" onClick={() => setActiveImage(null)} aria-label="Tutup foto">×</button><button className="lightbox-nav lightbox-prev" type="button" onClick={() => setActiveImage((activeImage - 1 + weddingData.gallery.length) % weddingData.gallery.length)} aria-label="Foto sebelumnya">←</button><Image src={weddingData.gallery[activeImage].src} alt={weddingData.gallery[activeImage].alt} width={weddingData.gallery[activeImage].width} height={weddingData.gallery[activeImage].height} sizes="90vw" priority /><button className="lightbox-nav lightbox-next" type="button" onClick={() => setActiveImage((activeImage + 1) % weddingData.gallery.length)} aria-label="Foto seterusnya">→</button></div>}
    </main>
  );
}
