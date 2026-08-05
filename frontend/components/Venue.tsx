import Image from "next/image";
import { MapPin, Car, Tent, CloudRain } from "lucide-react";

const details = [
  { icon: <MapPin size={24} />,    title: "Location",      desc: "Brahmaputra Riverfront Cultural Grounds, Guwahati, Assam" },
  { icon: <Car size={24} />,       title: "Getting There", desc: "40 minutes from Lokpriya Gopinath Bordoloi Airport. Shuttle buses from Guwahati City." },
  { icon: <Tent size={24} />,      title: "Seating",       desc: "Open-air amphitheatre with 5,000 capacity — reserved seating, premium lawn & VIP enclosure." },
  { icon: <CloudRain size={24} />, title: "Weather",       desc: "September brings clear, warm evenings — perfect concert weather. Light shawl recommended for after 8 PM." },
];

export default function Venue() {
  return (
    <section id="venue" className="py-16 md:py-[120px] bg-purple-deep">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[50px] lg:gap-[80px] items-center">

          {/* Content */}
          <div className="anim-fade-up">
            <p className="section-label">The Venue</p>
            <div className="divider-gold divider-gold--left" />
            <h2 className="font-display mb-6" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 4vw, 3.2rem)", lineHeight: 1.25 }}>
              On the Banks of the <span className="text-gold">Brahmaputra</span>
            </h2>
            <p className="text-[1.05rem] leading-[1.85] text-white/75 mb-5">
              The stage is set on the historic riverfront of the mighty Brahmaputra — a river that has
              witnessed the rise of empires, the blooming of cultures, and the birth of songs for thousands of years.
            </p>
            <p className="text-[1.05rem] leading-[1.85] text-white/75 mb-9">
              As you listen to the music, the river flows silently beside you, reflecting the stage lights
              and the moon — a natural backdrop that no venue in the world can replicate.
            </p>

            <div className="flex flex-col gap-4">
              {details.map((v) => (
                <div key={v.title} className="glass-card flex items-center gap-4 p-4">
                  <span className="text-gold flex-shrink-0">{v.icon}</span>
                  <div>
                    <h4 className="font-semibold text-[1rem] text-gold mb-[3px]">{v.title}</h4>
                    <p className="text-[0.9rem] text-white/65 leading-[1.4] m-0">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative anim-fade-up">
            <Image
              src="/tea_garden.png"
              alt="Assam landscape near the venue"
              width={600} height={500}
              className="w-full h-[500px] object-cover rounded-[20px]"
              style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.5)" }}
            />
            {/* Rotating badge */}
            <div
              className="absolute -top-5 -right-5 w-[120px] h-[120px] rounded-full flex flex-col items-center justify-center text-center p-4 venue-badge-rotate"
              style={{ background: "linear-gradient(135deg, #d4af37, #e67e22)", boxShadow: "var(--shadow-gold)" }}
            >
              <div className="venue-badge-rotate-in flex flex-col items-center">
                <div className="font-display text-[1.8rem] font-black text-purple-deep leading-none"
                  style={{ fontFamily: "var(--font-display)" }}>SEP</div>
                <div className="text-[0.55rem] font-bold tracking-[1px] uppercase text-purple-dark">2026</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
