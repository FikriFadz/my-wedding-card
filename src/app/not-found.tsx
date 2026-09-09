import Link from "next/link";

export default function NotFound() {
  return (
    <main className="section">
      <p className="eyebrow">404 / Tidak dijumpai</p>
      <h1>Halaman ini tidak tersedia.</h1>
      <Link className="button button-dark" href="/">
        Kembali ke jemputan
      </Link>
    </main>
  );
}
