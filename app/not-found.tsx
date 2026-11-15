import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ButtonLink } from "@/components/Button";

export default function NotFound() {
  return (
    <>
      <Header home={false} />
      <main id="main" className="legal">
        <div className="container">
          <span className="eyebrow">404</span>
          <h1 className="h1" style={{ margin: "var(--s3) 0 var(--s4)" }}>This aisle doesn&apos;t exist.</h1>
          <p className="lede">The page you were looking for has moved or never existed.</p>
          <div style={{ marginTop: "var(--s5)" }}><ButtonLink href="/" label="Back to home" /></div>
        </div>
      </main>
      <Footer />
    </>
  );
}
