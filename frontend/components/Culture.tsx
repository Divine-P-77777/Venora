import Image from "next/image";
import { Sparkles, Heart, Leaf } from "lucide-react";

const cards = [
  {
    num: "01", img: "/bihu_dance.png", icon: <Sparkles size={32} />,
    title: "Bihu — The Heartbeat",
    desc: "Bihu is the most vibrant festival of Assam — a celebration of the harvest, the seasons, and life itself. The Bihu dance, with its energetic movements and rhythmic dhol beats, is a living tradition that infuses every moment of our festival.",
  },
  {
    num: "02", img: "/gamosa.png", icon: <Heart size={32} />,
    title: "The Sacred Gamosa",
    desc: "The Gamosa — a white cloth adorned with red borders and intricate woven motifs — is the highest symbol of Assamese identity and respect. It is offered to honoured guests and beloved people. At Sewali Festival, each attendee receives one as a token of our love.",
  },
  {
    num: "03", img: "/tea_garden.png", icon: <Leaf size={32} />,
    title: "Land of the Red Tea",
    desc: "Assam's world-famous tea gardens roll across the horizon like green velvet carpets. The romance of misty mornings over the tea bushes, the scent of the earth after rain — these inspired our entire aesthetic, creating an atmosphere of timeless serenity and warmth.",
  },
];

export default function Culture() {
  return (
    <section id="culture" className="py-16 md:py-[120px] bg-purple-dark relative contain-[layout_style]">
      <div className="container">

        {/* Header */}
        <div className="text-center mb-[80px] anim-fade-up">
          <p className="section-label">The Soul of Assam</p>
          <div className="divider-gold" />
          <h2 className="font-display mb-5" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.2 }}>
            Rooted in <span className="text-gold">5,000 Years</span><br />of Living Culture
          </h2>
          <p className="text-[1.1rem] text-white/70 max-w-[600px] mx-auto leading-[1.8]">
            Every note played at Sewali Festival is an echo of Assam&apos;s ancient soul —
            from the bamboo groves of the Kaziranga to the silk looms of Sualkuchi.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((c) => (
            <div key={c.num} className="glass-card anim-fade-up cursor-pointer overflow-hidden">
              {/* Image */}
              <div className="relative h-[240px] overflow-hidden rounded-t-[16px]">
                <Image src={c.img} alt={c.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-deep/80 to-transparent" />
                <span className="absolute top-4 left-4 font-display text-[2.5rem] font-black text-gold/25 leading-none"
                  style={{ fontFamily: "var(--font-display)" }}>{c.num}</span>
              </div>

              {/* Body */}
              <div className="p-7">
                <div className="text-[2rem] mb-[14px] text-gold">{c.icon}</div>
                <h3 className="font-display text-[1.5rem] mb-3 text-gold" style={{ fontFamily: "var(--font-display)" }}>{c.title}</h3>
                <p className="text-[0.95rem] leading-[1.75] text-white/70">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
