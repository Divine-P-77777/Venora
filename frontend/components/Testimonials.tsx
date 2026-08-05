import { Flower2, Guitar, Sparkles, Star } from "lucide-react";

const testimonials = [
  {
    text: "Growing up in Assam, I always dreamed of an event that would celebrate our culture with the same grandeur as the big city festivals. Sewali Festival feels like that dream coming to life.",
    name: "Priya Baruah", role: "Guwahati, Assam", avatar: <Flower2 size={24} />,
  },
  {
    text: "A festival on the Brahmaputra with Papon and Zubeen? This is literally every Assamese person's fantasy. I've already bought tickets for my whole family!",
    name: "Arnab Dutta", role: "Music Enthusiast, Dibrugarh", avatar: <Guitar size={24} />,
  },
  {
    text: "The idea of a romantic evening festival that weaves together traditional culture and soulful music is something the Northeast has needed for a long time. Absolutely magical concept.",
    name: "Rimjhim Gogoi", role: "Cultural blogger, Jorhat", avatar: <Sparkles size={24} />,
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 md:py-[120px] bg-purple-dark">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-[70px] anim-fade-up">
          <p className="section-label">From the Community</p>
          <div className="divider-gold" />
          <h2 className="font-display" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            What People Are <span className="text-gold">Saying</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {testimonials.map((t, i) => (
            <div key={i} className="glass-card anim-fade-up p-9">
              <div className="text-[3rem] leading-none text-gold/50 mb-4 font-serif">&ldquo;</div>
              <p className="text-[1rem] leading-[1.75] text-white/80 italic mb-6">{t.text}</p>
              <div className="flex items-center gap-[14px]">
                <div
                  className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center text-white"
                  style={{ background: "linear-gradient(135deg, #d4af37, #c0392b)" }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-[0.95rem] text-gold">{t.name}</div>
                  <div className="text-[0.8rem] text-white/50">{t.role}</div>
                  <div className="flex gap-[3px] mt-[6px] text-gold-light">
                    {[...Array(5)].map((_, si) => (
                      <Star key={si} size={14} fill="currentColor" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
