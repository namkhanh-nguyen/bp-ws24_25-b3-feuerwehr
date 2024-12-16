import Link from "next/link";

function Hero() {
  return (
    <>
      <section className="homepage-hero">
        <div className="hero-content">
          <h1 className="hero-title">Lust auf den besten Job der Welt?</h1>
          <p className="hero-description">
            Bist du bereit für Action, Teamgeist und einen Job, der wirklich
            etwas bewegt? Dann bist du bei der Berliner Feuerwehr genau richtig!
          </p>
          <Link href="/jobs" className="hero-button">
            Zum Navigator
          </Link>
        </div>
      </section>
    </>
  );
}
export default Hero;
