import { Ticket, Mic } from "lucide-react";

export default function CtaBanner() {
  return (
    <section className="py-16 md:py-[120px] relative overflow-hidden text-center">
      {/* Background image */}
      <div
        className="absolute inset-0"
        style={{ backgroundImage: "url('/lotus_romance.png')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.18 }}
      />
      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(135deg, rgba(26,5,51,0.95) 0%, rgba(44,10,82,0.8) 50%, rgba(26,5,51,0.95) 100%)" }}
      />

      {/* Content */}
      <div className="relative z-[1] max-w-[700px] mx-auto px-6 anim-fade-up">
        <div className="text-gold text-[3rem] mb-4" style={{ fontFamily: "var(--font-script)" }}>
          A night of Sewali blossoms &amp; melody
        </div>
        <h2 className="font-display mb-5" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.25 }}>
          Join 5,000 Souls at the <span className="text-gold">Brahmaputra</span>
        </h2>
        <p className="text-[1.1rem] text-white/80 leading-[1.7] mb-12">
          September nights in Assam are like no other. The air carries the fragrance of the earth,
          the stars shine brighter, and when the music starts — time stands still.
          Be there for one evening you&apos;ll never forget.
        </p>

        <div className="flex gap-5 justify-center flex-wrap">
          <a href="#tickets" className="btn btn-gold" id="cta-book-btn">
            <Ticket size={18} /> Book Now — Limited Seats
          </a>
          <a href="#artists" className="btn btn-outline" id="cta-artists-btn">
            <Mic size={18} /> See Full Lineup
          </a>
        </div>
      </div>
    </section>
  );
}
