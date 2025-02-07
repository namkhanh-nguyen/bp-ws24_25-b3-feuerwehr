export default function AboutUs() {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "75rem",
        margin: "auto",
        paddingTop: "40px",
        paddingBottom: "20px",
      }}
    >
      <main style={{ maxWidth: "75ch", padding: "20px", textAlign: "left" }}>
        <h1>Über das Projekt</h1>
        <p>
          Wir sind ein siebenköpfiges Team der HTW Berlin, das im Rahmen eines
          studentischen Projekts für die Internationale Medieninformatik (IMI)
          Showtime Wintersemester 2024/25 diese Anwendung entwickelt hat.
        </p>
        <p>
          Das Projekt entstand in enger Zusammenarbeit mit der Berliner
          Feuerwehr, um den Bewerbungsprozess interaktiver und
          benutzerfreundlicher zu gestalten.
        </p>
        <p>
          <a href="https://showtime.f4.htw-berlin.de/">
            👉 Mehr dazu: IMI-Showtime
          </a>
        </p>

        <h3>Projektteam:</h3>
        <ul>
          <li>Christoph Friedrich</li>
          <li>Duha Kasem</li>
          <li>Maria Ivanova</li>
          <li>Nam Khanh Nguyen</li>
          <li>Phuong Nhi Phan</li>
          <li>Sandip Sarraf</li>
          <li>Sara Tahmasebi Adar</li>
        </ul>
      </main>
    </div>
  );
}
