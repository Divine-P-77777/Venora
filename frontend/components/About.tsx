import Image from "next/image";
import { Flower2, Music, Sunrise, Heart } from "lucide-react";

const features = [
  { icon: <Flower2 size={24} />, title: "Cultural Immersion",  desc: "Live Bihu dance, traditional crafts and authentic Assamese cuisine stalls" },
  { icon: <Music size={24} />,   title: "Live Performances",   desc: "8+ Northeast artists spanning folk, indie, pop, and classical fusion" },
  { icon: <Sunrise size={24} />, title: "Scenic Venue",        desc: "Open-air amphitheatre on the banks of the Brahmaputra River" },
  { icon: <Heart size={24} />,   title: "Romance Curated",     desc: "Designed as an intimate evening for couples, families & culture lovers" },
];

export default function About() {
  return (
    <section
      id="about"
      className="py-16 md:py-[120px] relative overflow-hidden contain-[layout_style] bg-gradient-to-b from-purple-deep to-purple-dark"
    >
      {/* Decorative glow */}
      <div className="absolute -top-[200px] -right-[200px] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)" }} />

      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[50px] lg:gap-[80px] items-center">

          {/* Image stack */}
          <div className="relative h-[420px] lg:h-[560px] anim-fade-up mb-4 lg:mb-0">
            <Image
              src="/bihu_dance.png"
              alt="Traditional Bihu dance performance"
              width={500} height={460}
              className="absolute bottom-0 left-0 w-[80%] md:w-[75%] h-[280px] lg:h-[460px] object-cover rounded-[20px]"
              style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.5)" }}
            />
            <Image
              src="/gamosa.png"
              alt="Traditional Assamese Gamosa"
              width={350} height={320}
              className="absolute top-0 right-0 w-[60%] md:w-[55%] h-[200px] lg:h-[320px] object-cover rounded-[20px] border-[3px] border-gold"
              style={{ boxShadow: "var(--shadow-gold)" }}
            />
            <div className="glass-card absolute bottom-6 right-2 lg:bottom-10 lg:-right-5 p-4 lg:p-5 text-center z-10">
              <div className="font-display text-[2rem] lg:text-[2.5rem] font-black text-gold leading-none"
                style={{ fontFamily: "var(--font-display)" }}>1st</div>
              <div className="text-[0.6rem] lg:text-[0.7rem] tracking-[2px] uppercase text-white/70 mt-1">Edition</div>
            </div>
          </div>

          {/* Content */}
          <div className="anim-fade-up">
            <p className="section-label">About the Festival</p>
            <div className="divider-gold divider-gold--left" />
            <h2 className="font-display mb-6" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 4vw, 3.2rem)", lineHeight: 1.25 }}>
              Where <em>Tradition</em> Dances With <span className="text-gold">Romance</span>
            </h2>
            <p className="text-[1.05rem] leading-[1.85] text-white/75 mb-5">
              Sewali Festival — celebrating the extraordinary cultural heritage of Assam and the greater Northeast India through
              an evening of soulful, live performances.
            </p>
            <p className="text-[1.05rem] leading-[1.85] text-white/75 mb-5">
              As the sun dips behind the Brahmaputra and the sky transforms into a canvas of amber, crimson, and
              violet, some of the most celebrated voices of the Northeast will fill the evening air with songs that
              speak of love, longing, land, and legacy.
            </p>
            <p className="text-[1.05rem] leading-[1.85] text-white/75 mb-5">
              This is not just a concert. It is a <strong className="text-gold">cultural ceremony</strong> — a
              love letter to Assam and her people.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
              {features.map((f) => (
                <div key={f.title} className="flex items-start gap-[14px]">
                  <span className="text-gold flex-shrink-0 mt-[2px]">{f.icon}</span>
                  <div>
                    <h4 className="font-display font-semibold text-[1rem] text-gold mb-1" style={{ fontFamily: "var(--font-display)" }}>{f.title}</h4>
                    <p className="text-[0.85rem] leading-[1.5] text-white/60">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
