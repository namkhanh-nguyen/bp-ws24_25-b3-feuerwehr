import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-100">
      {/* Container für den gesamten Inhalt, mit mehr Abstand an den Seiten */}
      <div className="w-full max-w-5xl px-8 py-12 bg-white text-black rounded-lg shadow-lg">
        {/* Header */}
        <header className="bg-white text-red-600 py-6 px-8 text-center">
          <div className="flex items-center justify-center gap-4">
            <Image
              src="/logo.png"
              alt="Berliner Feuerwehr Logo"
              width={40}
              height={40}
            />
            <span className="text-2xl font-bold">Karriere</span>
          </div>
          {/* Mobile Menu Button */}
          <button className="text-2xl sm:hidden mt-4">&#9776;</button>
        </header>

        {/* Main Content */}
        <main className="flex flex-col items-center px-4 py-8 space-y-8">
          {/* Banner Image */}
          <div className="w-full">
            <Image
              src="/header-image.jpg" // Ersetze dies mit dem Bildpfad
              alt="Berliner Feuerwehr Banner"
              width={1200}
              height={600}
              className="rounded-lg w-full h-auto"
            />
          </div>

          {/* Main Text */}
          <h1 className="text-3xl sm:text-4xl font-bold text-center">
            Lust auf den besten Job der Welt?
          </h1>
          <p className="text-center text-base sm:text-lg px-4">
            Alle Wege führen nach Berlin. Informieren Sie sich im Ausbildungsnavigator über Ausbildung und Studium bei der Berliner Feuerwehr.
          </p>

          {/* Call-to-Action Button */}
          <a
            href="/navigator"
            className="mt-4 bg-red-600 text-white py-3 px-6 rounded-full font-medium hover:bg-red-700 transition"
          >
            Zum Navigator
          </a>

          {/* Statistik Sektion */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 text-center">
            <div>
              <p className="text-3xl font-bold">8.826</p>
              <p className="text-sm">großartige Teammitglieder</p>
            </div>
            <div>
              <p className="text-3xl font-bold">514.866</p>
              <p className="text-sm">Einsätze jährlich</p>
            </div>
            <div>
              <p className="text-3xl font-bold">57</p>
              <p className="text-sm">Nationen vereint in einem Team</p>
            </div>
            <div>
              <p className="text-3xl font-bold">1.330</p>
              <p className="text-sm">Fahrzeuge</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
