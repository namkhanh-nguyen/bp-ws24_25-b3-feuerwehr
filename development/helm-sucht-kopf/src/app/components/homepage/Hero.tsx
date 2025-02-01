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
              Alle Wege führen nach Berlin – welcher ist deiner? Finde es heraus
              und entdecke, welche Ausbildung bei der Berliner Feuerwehr perfekt
              zu dir passt.
            </p>
            <Link href="/ausbildungen" className="hero-button">
              Zu Ausbildungen
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
