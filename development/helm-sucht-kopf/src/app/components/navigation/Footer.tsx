import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faYoutube,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import styles from "../../styles/footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const isMobile = () => {
    if (typeof navigator !== "undefined") {
      return /Mobi|Android/i.test(navigator.userAgent);
    }
    return false;
  };

  const geoLink = isMobile()
    ? "geo:0,0?q=Berliner+Feuerwehr,+10150+Berlin"
    : "https://www.google.com/maps/search/?api=1&query=Berliner+Feuerwehr,10150+Berlin";

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.mainSection}>
          <div className={styles.column}>
            <h2>Navigation</h2>
            <ul>
              <li>
                <a href="/ausbildungen">Ausbildung</a>
              </li>
              <li>
                <a
                  href="https://www.berliner-feuerwehr.de/karriere/benefits/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Warum wir?
                </a>
              </li>
              <li>
                <a
                  href="https://www.berliner-feuerwehr.de/technik"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Technik
                </a>
              </li>
              <li>
                <a
                  href="https://www.berliner-feuerwehr.de/ueber-uns"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Über uns
                </a>
              </li>
              <li>
                <a
                  href="https://www.berliner-feuerwehr.de/karriere/faq/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Häufige Fragen
                </a>
              </li>
            </ul>
          </div>
          <div className={styles.column}>
            <h2>Kontakt</h2>
            <ul>
              <li>
                <a href="mailto:info@berliner-feuerwehr.de">
                  info@berliner-feuerwehr.de
                </a>
              </li>
              <li>
                <a href="tel:+4930387111">+49 30 387 111</a>
              </li>
              <li>
                <a href={geoLink} target="_blank" rel="noopener noreferrer">
                  Berliner Feuerwehr
                  <br />
                  10150 Berlin
                </a>
              </li>
            </ul>
          </div>
          <div className={styles.column}>
            <h2>Social Media</h2>
            <ul className={styles.socialLinks}>
              <li>
                <a
                  href="https://stage.bio/berliner-feuerwehr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Übersicht aller Postings <br />
                  der Berliner Feuerwehr (Stage)
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/berliner_fw/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faInstagram} /> Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/Berliner.Fw/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faFacebook} /> Facebook
                </a>
              </li>
              <li>
                <a
                  href="http://www.youtube.com/berlinerfeuerwehrtv"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faYoutube} /> YouTube
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/Berliner_Fw"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faXTwitter} /> X (Twitter)
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <div className="container">
          <div>&copy; {currentYear}, Berliner Feuerwehr</div>
          <div>
            <a href="https://www.berliner-feuerwehr.de/impressum/">Impressum</a>{" "}
            |{" "}
            <a href="https://www.berliner-feuerwehr.de/datenschutz/">
              Datenschutz
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
