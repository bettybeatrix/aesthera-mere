
export default function Home() {
  return (
    <main className="min-h-screen bg-[#F7F4EF]">
      <nav className="flex items-center justify-between px-8 py-6">
        <h1 className="font-serif text-2xl text-[#485D40]">
          Aesthera Mère
        </h1>

        <span className="text-sm text-[#485D40]">
          Beauty Creations
        </span>
      </nav>

      <section className="flex min-h-[75vh] flex-col items-center justify-center px-6 text-center">
        <p className="mb-5 text-sm tracking-[0.3em] text-[#485D40]">
          WELCOME TO AESTHERA MÈRE
        </p>

        <h2 className="mb-6 font-serif text-5xl text-[#485D40]">
          Where Beauty Meets Care
        </h2>

        <p className="mb-8 max-w-lg text-gray-600">
          Discover a personalized approach to beauty,
          confidence, and self-care.
        </p>

        <button className="bg-[#485D40] px-8 py-3 text-white">
          Explore Treatments
        </button>
      </section>
    </main>
  );
}
