import { Star } from "lucide-react";

const events = [
  { time: "4:00", ampm: "PM", title: "Gates Open & Welcome Ceremony", desc: "Traditional Assamese welcome with Xorai offerings, Tamul-Paan, and the gifting of the Gamosa to every guest.", tag: "Opening" },
  { time: "4:00", ampm: "PM", title: "Bihu Dance Ensemble", desc: "An electrifying opening performance by Assam's most celebrated Bihu dance troupe, setting the cultural tone for the evening.", tag: "Cultural Performance" },
  { time: "4:30", ampm: "PM", title: "Raanjha", desc: "Blending rich tradition with modern hits to guarantee regional emotional connection.", tag: "Modern Tradition" },
  { time: "6:00", ampm: "PM", title: "Sanko Raj", desc: "Electrifying rock icons producing absolute stage energy and audience synchronization.", tag: "Rock Icon" },
  { time: "7:00", ampm: "PM", title: "Diya Lantern Release", desc: "A magical interlude — a thousand lit diyas float onto the Brahmaputra as the stars begin to emerge, creating a moment of collective romance.", tag: "Cultural Ritual" },
  { time: "7:30", ampm: "PM", title: "Rito Riba — Headlining Act", desc: "Renowned cultural voice driving massive youth appeal and mainstream media engagement.", tag: "Headliner" },
  { time: "8:30", ampm: "PM", title: "DJMEXX", desc: "Ending the night by blending rich tradition with modern hits for an unforgettable finale.", tag: "Closing Act" },
  { time: "10:00", ampm: "PM", title: "Grand Finale & Closing", desc: "All artists join on stage for a final collective performance — a joyous, emotional celebration of culture, community, and the Northeast spirit.", tag: "Grand Finale" },
];

export default function Schedule() {
  return (
    <section id="schedule" className="py-16 md:py-[120px] bg-purple-dark relative overflow-hidden contain-[layout_style]">
      {/* Decorative glow */}
      <div className="absolute -bottom-[200px] -left-[200px] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(192,57,43,0.07) 0%, transparent 70%)" }} />

      <div className="container">
        {/* Header */}
        <div className="text-center mb-[80px] anim-fade-up">
          <p className="section-label">Evening Program</p>
          <div className="divider-gold" />
          <h2 className="font-display mb-5" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
            6 Hours of <span className="text-gold">Pure Magic</span>
          </h2>
          <p className="text-[1.1rem] text-white/70 max-w-[520px] mx-auto">
            From golden dusk to a star-lit finale — every hour of Sewali Festival is curated to perfection.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-[800px] mx-auto timeline-line">
          {events.map((item, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div key={i} className="timeline-item flex md:grid md:grid-cols-[1fr_60px_1fr] gap-4 md:gap-5 mb-10 md:mb-[50px] relative pl-[42px] md:pl-0">
                {/* Content (Mobile: right of dot, Desktop: alternating) */}
                <div className={`anim-fade-up flex flex-col ${isLeft ? "md:col-start-1 md:items-end md:text-right" : "md:col-start-3 md:items-start md:text-left"} items-start text-left`}>
                  {/* Mobile time (shows above title) */}
                  <div className="md:hidden mb-2">
                    <span className="font-display text-[1.2rem] font-bold text-gold leading-none"
                      style={{ fontFamily: "var(--font-display)" }}>{item.time}</span>
                    <span className="text-[0.7rem] text-white/50 tracking-[2px] uppercase ml-2">{item.ampm}</span>
                  </div>

                  <span className="tag mb-[10px] inline-block">
                    {item.tag === null ? <><Star size={14} className="inline mr-1" /> Headline</> : item.tag}
                  </span>
                  <h3 className="font-display text-[1.3rem] text-white mb-[6px]"
                    style={{ fontFamily: "var(--font-display)" }}>{item.title}</h3>
                  <p className="text-[0.9rem] text-white/60 leading-[1.6] max-w-[90%]">{item.desc}</p>
                </div>

                {/* Dot */}
                <div className="absolute left-0 top-0 md:static flex items-start justify-center pt-[10px] md:pt-1 md:col-start-2 w-[28px] md:w-auto z-[1]">
                  <div className="timeline-dot-inner" />
                </div>

                {/* Desktop Time */}
                <div className={`hidden md:flex flex-col ${isLeft ? "md:col-start-3 md:items-start md:text-left" : "md:col-start-1 md:items-end md:text-right"} justify-start pt-1`}>
                  <div className="font-display text-[1.3rem] font-bold text-gold leading-none"
                    style={{ fontFamily: "var(--font-display)" }}>{item.time}</div>
                  <div className="text-[0.7rem] text-white/50 tracking-[2px] uppercase mt-1">{item.ampm}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
