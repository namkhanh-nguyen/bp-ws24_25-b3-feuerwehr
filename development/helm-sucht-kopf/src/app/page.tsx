import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen text-white">
      <main className="flex flex-col items-center">
        <div className="relative w-[140%] h-[65vh] sm:h-[700px]">
          {/* Verwende die Next.js-Image-Komponente */}
          <Image
            src="https://res.cloudinary.com/dygcx8hd8/image/upload/v1733934562/481d0a48aae8caa8524be9400064f21a_wmddji.png"
            alt="Berliner Feuerwehr Banner"
            layout="fill"
            className="object-center object-center"
            priority
          />

            {/* Halbtransparentes Overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>
          <h1
            className="absolute inset-0 flex items-center justify-center  text-5xl font-bold text-white"
            style={{
              top: "23%",
              left: "45%",
              transform: "translate(-50%, -50%)",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
            }}
          >
            Lust auf den besten Job der Welt?
          </h1>
        <p
            className="absolute inset-x-0 bottom-12  text-1.5xl text-white"
            style={{
              top: "50%",
              left: "45%",
              transform: "translateX(-50%)",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
            }}
          >
            Alle Wege führen nach Berlin. Informieren Sie sich im Ausbildungsnavigator über Ausbildung und Studium bei der Berliner Feuerwehr.
            </p>

            <div      className="absolute inset-x-0 bottom-10 flex justify-center"
                      style={{ marginTop: "2rem" }}
                    >
                      <button
                        style={{
                          padding: "0.5rem",
                          backgroundColor: "var(--red-primary)",
                          color: "white",
                          borderRadius: "9999px",
                          fontFamily: "var(--font-berlin-type-bold)",
                          fontSize: "1.5rem",
                           width: "auto",  // Automatische Breite, damit der Button nicht die ganze Breite einnimmt
                           minWidth: "300px",  // Mindestbreite des Buttons
                           maxWidth: "500px",  // Maximale Breite des Buttons
                           zIndex: "10",
                        }}
                        className="w-full"
                      >
                        Zum Navigator
                      </button>
          </div>
        </div>

        <div className="grid grid-cols-1 text-black sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 text-left">
          <div className="flex flex-col items-start ">
            <p className="text-4xl font-bold text-red-500">8.826</p>
            <div className="border-b-2 border-red-500 w-full mb-2"></div>
            <p className="text-red-500 mt-2">großartige Teammitglieder</p>
          </div>
          <div className="flex flex-col items-start">
            <p className="text-4xl font-bold text-red-500">514.866</p>
            <div className="border-b-2 border-red-500 w-full mb-2"></div>
            <p className="text-red-500 mt-2">Einsätze jährlich</p>
          </div>
          <div className="flex flex-col items-start">
            <p className="text-4xl font-bold text-red-500">57</p>
            <div className="border-b-2 border-red-500 w-full mb-2"></div>
            <p className="text-red-500 mt-2">Nationen vereint in einem Team</p>
          </div>
          <div className="flex flex-col items-start">
            <p className="text-4xl font-bold text-red-500">1.330</p>
            <div className="border-b-2 border-red-500 w-full mb-2"></div>
            <p className="text-red-500 mt-2">Fahrzeuge</p>
          </div>
        </div>
        <div className="mt-12 text-black text-left" >
           <div className="text-black-200">
           <p className="text-2xl font-bold text-black-500">Viele Wege führen zur Berliner Feuerwehr</p>
           <p className="text-balck text-2  mt-2">Wir bieten eine Vielzahl von Einstiegswegen in eine Feuerwehrlaufbahn von der Ausbildung oder dem dualen Studium direkt nach der Schule bis
                                                         zum Quereinstieg nach einer abgeschlossenen Berufsausbildung oder
                                                         nach einem Studium.</p>
            </div>
        </div>

      </main>
    </div>
  );
}
