export default function Impressum() {
  return (
    <div
      style={{
        maxWidth: "75rem",
        margin: "auto",
        paddingTop: "40px",
        paddingBottom: "20px",
      }}
    >
      {/* Impressum Inhalt */}
      <main style={{ maxWidth: "75ch", padding: "20px", textAlign: "left" }}>
        <h1>Impressum</h1>
        <p>
          <strong>Verantwortlich für den Inhalt:</strong>
        </p>
        <p>
          Projektteam „Helm sucht Kopf“ – Studierendenprojekt der HTW Berlin
          (IMI Showtime WS 2024/25)
        </p>
        <p>
          Hochschule für Technik und Wirtschaft (HTW) Berlin
          <br />
          Treskowallee 8<br /> 10318 Berlin <br />
          <a href="http://www.htw-berlin.de">www.htw-berlin.de</a>
        </p>

        <h2>Haftungsausschluss:</h2>
        <p>
          Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung
          für die Inhalte externer Links. Für den Inhalt verlinkter Seiten sind
          ausschließlich deren Betreiber verantwortlich.
        </p>
      </main>
    </div>
  );
}
