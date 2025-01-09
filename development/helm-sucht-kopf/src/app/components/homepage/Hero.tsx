import Link from "next/link";

export default function Hero() {
  return (
    <div>
      <section className="homepage-hero">
        <img
          src="/assets/home/hero-4.jpg"
          alt="Hero Background"
          className="hero-background-image"
        />
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Lust auf den besten Job der Welt?</h1>
            <p className="hero-description">
              Bist du bereit für Action, Teamgeist und einen Job, der wirklich
              etwas bewegt? Dann bist du bei der Berliner Feuerwehr genau
              richtig!
            </p>
            <Link href="/jobs" className="hero-button">
              Finde deinen Weg
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
