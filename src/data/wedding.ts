export type WeddingEvent = {
  title: string;
  date: string;
  day: string;
  time: string;
};

export type TimelineItem = {
  time: string;
  title: string;
  description: string;
};

export type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const weddingData = {
  couple: {
    bride: "Husna",
    groom: "Fikri",
    brideFull: "Husna Syakirin Binti Tarmizi",
    groomFull: "Mohamad Fikri Bin Ahmad Fadzil",
  },
  event: {
    date: "2027-03-14T12:00:00+08:00",
    displayDate: "14 Mac 2027",
    day: "Ahad",
    venue: "Besut Crystal Hall, Terengganu",
    address: "Lot 1660, Kampung Pengkalan Nyireh, 22200 Kampung Raja, Terengganu",
    mapsUrl: "https://maps.app.goo.gl/qpMbADjPHvMVT8mCA",
    parking: "Parkir tetamu disediakan di aras P1 dan P2.",
  },
  events: [
    { title: "Akad Nikah", date: "13 Mac 2027", day: "Ahad", time: "10:00 pagi" },
    {
      title: "Majlis Resepsi",
      date: "13 Mac 2027",
      day: "Ahad",
      time: "12:00 tengah hari – 4:00 petang",
    },
  ] satisfies WeddingEvent[],
  schedule: [
    {
      time: "10:00 pagi",
      title: "Akad Nikah",
      description: "Sebuah janji yang dilafazkan dengan penuh kesyukuran.",
    },
    {
      time: "11:30 pagi",
      title: "Ketibaan Tetamu",
      description: "Selamat datang, terima kasih kerana hadir meraikan kami.",
    },
    {
      time: "12:30 tengah hari",
      title: "Majlis Bersanding",
      description: "Raikan pasangan pengantin bersama keluarga tercinta.",
    },
    {
      time: "1:30 petang",
      title: "Makan Beradab",
      description: "Jamuan tengah hari untuk semua tetamu.",
    },
    {
      time: "3:00 petang",
      title: "Sesi Bergambar",
      description: "Abadikan kenangan bersama keluarga dan sahabat.",
    },
    {
      time: "4:00 petang",
      title: "Majlis Bersurai",
      description: "Terima kasih atas doa dan kehadiran anda.",
    },
  ] satisfies TimelineItem[],
  story: [
    {
      year: "2019",
      title: "Pertama kali bertemu",
      text: "Sebuah pertemuan sederhana yang membuka cerita panjang.",
    },
    {
      year: "2021",
      title: "Memulakan perjalanan",
      text: "Belajar mengenal, memahami, dan memilih satu sama lain setiap hari.",
    },
    {
      year: "2025",
      title: "Satu lamaran",
      text: "Jawapan yang paling kami nantikan, di bawah langit yang tenang.",
    },
    {
      year: "2026",
      title: "Hari kita",
      text: "Dengan doa keluarga, kami melangkah ke bab yang seterusnya.",
    },
  ],
  gallery: [
    {
      src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=82",
      alt: "Pasangan berjalan bersama di taman",
      width: 1200,
      height: 1500,
    },
    {
      src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=82",
      alt: "Pasangan pengantin tersenyum",
      width: 1200,
      height: 900,
    },
    {
      src: "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1200&q=82",
      alt: "Tangan pasangan dengan cincin perkahwinan",
      width: 1200,
      height: 1200,
    },
    {
      src: "https://images.unsplash.com/photo-1460978812857-470ed1c77af0?auto=format&fit=crop&w=1200&q=82",
      alt: "Majlis perkahwinan di ruang terbuka",
      width: 1200,
      height: 1500,
    },
    {
      src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=82",
      alt: "Dekorasi meja bunga putih",
      width: 1200,
      height: 900,
    },
    {
      src: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1200&q=82",
      alt: "Pasangan berkongsi detik bahagia",
      width: 1200,
      height: 1200,
    },
  ] satisfies GalleryImage[],
  rsvp: {
    url: "https://forms.google.com/",
    whatsappUrl:
      "https://wa.me/60123456789?text=Assalamualaikum%2C%20saya%20ingin%20mengesahkan%20kehadiran%20ke%20majlis%20Husna%20%26%20Fikri.",
  },
  gift: {
    accountName: "Husna Syakirin & Mohamad Fikri",
    accountNumber: "0000 0000 0000",
    bank: "Maklumat akaun akan dikemas kini",
  },
  dressCode: {
    title: "Sopan & selesa",
    description:
      "Kami mengalu-alukan busana tradisional atau formal dalam warna lembut dan bersahaja.",
    colors: ["#e9dfd2", "#b7a58c", "#536158", "#2f2a27"],
  },
  contacts: [
    { label: "Wakil keluarga", name: "Shuhada", href: "https://wa.me/60123456789" },
    { label: "Wakil keluarga", name: "Nadia", href: "https://wa.me/60129876543" },
  ],
  faq: [
    {
      question: "Adakah parking disediakan?",
      answer:
        "Ya, parkir tetamu disediakan di aras P1 dan P2. Sila ikuti papan tanda ke ruang acara.",
    },
    {
      question: "Apakah dress code?",
      answer: "Sopan dan selesa. Busana tradisional atau formal amat dialu-alukan.",
    },
    {
      question: "Bolehkah membawa kanak-kanak?",
      answer: "Sudah tentu. Kehadiran seisi keluarga sangat kami nantikan.",
    },
    {
      question: "Apakah waktu ketibaan tetamu?",
      answer: "Tetamu dialu-alukan hadir mulai jam 11:30 pagi sebelum majlis resepsi bermula.",
    },
  ],
  hashtag: "#HusnaFikri2027",
} as const;
