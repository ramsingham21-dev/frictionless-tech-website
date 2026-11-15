import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <Header home={false} />
      <main id="main" className="legal">
        <div className="container">
          <span className="eyebrow">Legal</span>
          <h1 className="h1" style={{ margin: "var(--s3) 0 var(--s4)" }}>{title}</h1>
          <div className="body-copy legal__copy">{children}</div>
        </div>
      </main>
      <Footer />
    </>
  );
}
