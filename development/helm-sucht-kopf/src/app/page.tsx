import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-berlin-type-regular)]">

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-center">

        <Image
              src="/header/Helmsuchtkopf-1920x1080.jpg"
              alt="Banner"
              width={960}
              height={480}
              priority
        />

        <h1 className="text-4xl sm:text-5xl font-bold justify-center text-center">
          Bewirb dich jetzt!
        </h1>

        <div className="flex gap-4 items-center flex-col">
          <a
              className="rounded-full border border-solid border-transparent transition-colors
            flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] 
            text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              href="/jobs"
              // target="_blank"
              // rel="noopener noreferrer"
          >
            Zu Stellen
          </a>
        </div>

      </main>

    </div>
  );
}
