import Image from "next/image";
import { Heart, Flame } from "lucide-react";

const panels = [
  {
    icon: <Heart size={32} />,
    src: "/lotus_romance.png",
    alt: "Romance experience",
    title: "Romance & Magic",
    text: "As the evening unfolds, Sewali Festival transforms into a dreamscape of golden lights, floating diyas on the Brahmaputra, and music that reaches deep into the heart. It is designed to be shared — with a partner, a family, a friend, or with yourself.",
    list: [
      "Couples\u2019 seating area with river views",
      "Floating diya release on the Brahmaputra",
      "Romantic twilight photography zones",
      "Dedicated proposal & anniversary space",
      "Themed dinner tables under the stars",
    ],
  },
  {
    icon: <Flame size={32} />,
    src: "/bihu_dance.png",
    alt: "Culture experience",
    title: "Culture & Heritage",
    text: "Every corner of the festival grounds breathes Assamese culture. Traditional weavers demonstrate their art, potters shape clay by hand, and storytellers narrate the legends of the Ahom kingdom as the evening grows deeper.",
    list: [
      "Live Assamese silk weaving demonstration",
      "Traditional bamboo craft & pottery village",
      "Authentic Assamese cuisine — Masor Tenga, Pitha, Laru",
      "Heritage photo exhibition — Northeast in frames",
      "Storytelling sessions from Assam\u2019s folklore",
    ],
  },
];

export default function Experience() {
  return (
    <section className="py-16 md:py-[120px] bg-purple-deep">
      {/* Header */}
      <div className="text-center mb-[80px] anim-fade-up">
        <div className="container">
          <p className="section-label">What to Expect</p>
          <div className="divider-gold" />
          <h2 className="font-display mb-5" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
            A Festival for the <span className="text-gold">Senses</span>
          </h2>
          <p className="text-[1.1rem] text-white/70 max-w-[560px] mx-auto">
            Sewali Festival is designed as an all-encompassing romantic and cultural experience — from the food you taste to the songs you feel.
          </p>
        </div>
      </div>

      {/* Split panels */}
      <div className="container--wide">
        <div className="grid grid-cols-1 md:grid-cols-2 rounded-[28px] overflow-hidden border border-white/8 anim-fade-up">
          {panels.map((p, i) => (
            <div
              key={p.title}
              className={`relative px-[60px] py-[70px] overflow-hidden ${i === 0 ? "border-b md:border-b-0 md:border-r border-white/6" : ""}`}
              style={{
                background: i === 0
                  ? "linear-gradient(135deg, rgba(44,10,82,0.8) 0%, rgba(26,5,51,0.9) 100%)"
                  : "linear-gradient(135deg, rgba(26,5,51,0.9) 0%, rgba(44,10,82,0.8) 100%)",
              }}
            >
              <Image src={p.src} alt={p.alt} fill className="object-cover opacity-[0.12]" />
              <div className="relative z-[1]">
                <div className="text-[3.5rem] mb-6 text-gold">{p.icon}</div>
                <h3 className="font-display text-[2rem] mb-4 text-gold" style={{ fontFamily: "var(--font-display)" }}>{p.title}</h3>
                <p className="text-[1.05rem] leading-[1.8] text-white/75 mb-6">{p.text}</p>
                <ul className="flex flex-col gap-3">
                  {p.list.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-[0.95rem] text-white/80">
                      <span className="text-gold text-[0.6rem] flex-shrink-0">◆</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
