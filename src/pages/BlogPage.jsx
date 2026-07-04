export default function BlogPage() {
  return (
    <div className="bg-cream text-dark">

      {/* ── HERO ── */}
      <section className="relative h-[55dvh] min-h-[380px] flex items-center justify-center overflow-hidden bg-dark">
        <div className="absolute inset-0 w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=2400&q=90"
            alt="Amara Living blog"
            className="w-full h-full object-cover img-grade filter brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-dark/70" />
        </div>

        <div className="wrap relative z-10 text-center max-w-3xl">
          <span className="eyebrow mb-5 tracking-[0.4em] text-gold block">From The Journal</span>
          <h1 className="font-display text-[clamp(2.2rem,5.5vw,4.5rem)] font-medium leading-[1.05] tracking-tight text-white">
            Designing Interiors <span className="italic text-gold">That Last</span>
          </h1>
        </div>
      </section>

      {/* ── ARTICLE ── */}
      <section className="section-y">
        <div className="wrap max-w-3xl mx-auto">
          <p className="eyebrow mb-3">Interior Design</p>
          <h2 className="font-display text-2xl md:text-3xl font-medium text-dark mb-6">
            Choosing Materials That Age Gracefully
          </h2>

          <div className="mb-8 overflow-hidden rounded-sm shadow-editorial">
            <img
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85"
              alt="Luxury furniture and interior detailing"
              className="w-full h-[280px] md:h-[420px] object-cover img-grade"
            />
          </div>

          <div className="font-body text-base leading-[1.85] text-ink/80 space-y-5">
            <p>
              A truly luxurious interior is never defined by a single statement piece — it is the quiet
              result of considered materials working together over time. Natural stone, solid timber,
              and hand-finished textiles each carry their own character, and that character only deepens
              with age when the underlying craftsmanship is sound.
            </p>
            <p>
              At Amara Living, every material we recommend is chosen first for how it will wear a decade
              from now, not just how it photographs on day one. Granite surfaces are selected for veining
              that holds its depth under daily use, furniture frames are built to be re-upholstered rather
              than replaced, and finishes are sealed to resist the everyday realities of a lived-in home.
            </p>
            <p>
              The result is a space that feels complete on move-in day, yet continues to feel considered
              years later — luxury measured not in trend, but in permanence.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}