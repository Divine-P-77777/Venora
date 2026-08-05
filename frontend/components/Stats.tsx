const stats = [
  { num: "8+",  label: "Northeast Artists" },
  { num: "6h",  label: "Hours of Live Music" },
  { num: "5K",  label: "Expected Attendees" },
  { num: "1",   label: "Unforgettable Evening" },
];

export default function Stats() {
  return (
    <section
      className="py-12 md:py-[90px] relative overflow-hidden contain-[layout_style]"
      style={{ background: "linear-gradient(135deg, #922b21, #c0392b, #e67e22)" }}
    >
      {/* Dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "24px 24px" }}
      />

      <div className="container relative z-[1]">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`text-center py-10 px-6 anim-fade-up ${i < stats.length - 1 ? "border-r border-white/20" : ""}`}
            >
              <div className="font-display text-[4rem] font-black text-white leading-none mb-2"
                style={{ fontFamily: "var(--font-display)" }}>{s.num}</div>
              <div className="text-[0.8rem] tracking-[3px] uppercase text-white/80">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
