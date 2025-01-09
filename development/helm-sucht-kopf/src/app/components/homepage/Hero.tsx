import Link from "next/link";

export default function Hero() {
  return (
      <div>
        <section className="homepage-hero">
          <img
              src="/assets/home/hero-image.jpg"
              alt="Hero Background"
              className="hero-background-image"
          />
          <div className="hero-content">
            <h1 className="hero-title">Lust auf den besten Job der Welt?</h1>
            <p className="hero-description">
              Bist du bereit für Action, Teamgeist und einen Job, der wirklich
              etwas bewegt? Dann bist du bei der Berliner Feuerwehr genau richtig!
            </p>
            <Link href="/ausbildungen" className="hero-button">
              Zum Navigator
            </Link>
          </div>
        </section>
      </div>
  );
}
