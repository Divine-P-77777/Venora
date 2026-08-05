import Image from "next/image";

const items = [
  { src: "/brahmaputra.png",   alt: "Brahmaputra at sunset",   className: "col-span-2 md:col-span-4 md:row-span-1" },
  { src: "/bihu_dance.png",    alt: "Bihu dance performance",  className: "col-span-1 md:col-span-4 md:row-span-1" },
  { src: "/singer_stage.png",  alt: "Artist on stage",         className: "col-span-1 md:col-span-4 md:col-start-9 md:row-span-2" },
  { src: "/concert_crowd.png", alt: "Festival crowd",          className: "col-span-2 md:col-span-6 md:row-span-1" },
  { src: "/lotus_romance.png", alt: "Romantic lotus pond",     className: "col-span-2 md:col-span-2 md:row-span-1" },
];

export default function Gallery() {
  return (
    <section className="py-16 md:py-[120px] bg-purple-dark">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-[60px] anim-fade-up">
          <p className="section-label">Visual Story</p>
          <div className="divider-gold" />
          <h2 className="font-display" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
            The World of <span className="text-gold">Sewali Festival</span>
          </h2>
        </div>

        {/* Grid — 12 columns desktop, 2 columns mobile */}
        <div
          className="anim-fade-up grid grid-cols-2 md:grid-cols-12 gap-4 auto-rows-[200px] md:auto-rows-[260px]"
        >
          {items.map((item, i) => (
            <div
              key={i}
              className={`gallery-item relative overflow-hidden rounded-[14px] cursor-pointer group ${item.className}`}
            >
              <Image src={item.src} alt={item.alt} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.08]" />
              <div className="gallery-overlay" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
