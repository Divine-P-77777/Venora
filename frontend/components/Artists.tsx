import Image from "next/image";
import { Star, Sparkles, Guitar, Flower2, Drum, Clock } from "lucide-react";

type ArtistCardProps = {
  id: string;
  src: string;
  alt: string;
  imgH: number;
  tagIcon: React.ReactNode;
  tagLabel: string;
  name: string;
  desc: string;
  time: string;
};

function ArtistCard({ id, src, alt, imgH, tagIcon, tagLabel, name, desc, time }: ArtistCardProps) {
  return (
    <div id={id} className="artist-card relative overflow-hidden rounded-[20px] cursor-pointer group">
      <Image
        src={src}
        alt={alt}
        width={600}
        height={imgH}
        className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.06] will-change-transform"
        style={{ height: imgH }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-deep/97 via-purple-dark/40 to-transparent transition-all duration-400 group-hover:via-purple-dark/60" />
      {/* Info */}
      <div className="absolute bottom-0 left-0 right-0 p-7">
        <p className="text-[0.65rem] font-bold tracking-[3px] uppercase text-orange-light mb-2 flex items-center gap-1">
          {tagIcon} {tagLabel}
        </p>
        <h3 className="font-display text-white mb-[6px] leading-[1.2]"
          style={{ fontFamily: "var(--font-display)", fontSize: imgH >= 400 ? "2rem" : "1.5rem" }}>{name}</h3>
        <p className="artist-card-desc text-[0.9rem] text-white/70 leading-[1.5]">{desc}</p>
        <span className="inline-flex items-center gap-2 mt-3 px-[14px] py-[6px] bg-gold/15 border border-gold/30 rounded-full text-[0.8rem] text-gold">
          <Clock size={14} /> {time}
        </span>
      </div>
    </div>
  );
}

export default function Artists() {
  return (
    <section id="artists" className="py-16 md:py-[120px] bg-gradient-to-b from-purple-deep to-purple-dark contain-[layout_style]">
      <div className="container">

        {/* Header */}
        <div className="text-center mb-[80px] anim-fade-up">
          <p className="section-label">The Voices of the Northeast</p>
          <div className="divider-gold" />
          <h2 className="font-display mb-5" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
            Featured <span className="text-gold">Artists</span>
          </h2>
          <p className="text-[1.1rem] text-white/70 max-w-[520px] mx-auto">
            Legends of their craft. Voices that carry the heartbeat of the Northeast into every note they sing.
          </p>
        </div>

        {/* Featured row: headliner + 2 small */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr_1fr] gap-7 mb-7 anim-fade-up">
          <ArtistCard
            id="artist-ritoriba" src="/singer_stage.png" alt="Rito Riba" imgH={420}
            tagIcon={<Star size={16} />} tagLabel="Headliner" name="Rito Riba"
            desc="Renowned cultural voice driving massive youth appeal and mainstream media engagement. His performance blends absolute stage energy with emotional connection."
            time="7:30 PM – 8:30 PM"
          />
          <div className="flex flex-col gap-7">
            <ArtistCard
              id="artist-sankoraj" src="/concert_crowd.png" alt="Sanko Raj" imgH={196}
              tagIcon={<Guitar size={16} />} tagLabel="Rock Icon" name="Sanko Raj"
              desc="Electrifying rock icons producing absolute stage energy and audience synchronization."
              time="6:00 PM – 7:00 PM"
            />
            <ArtistCard
              id="artist-raanjha" src="/lotus_romance.png" alt="Raanjha" imgH={196}
              tagIcon={<Sparkles size={16} />} tagLabel="Modern Tradition" name="Raanjha"
              desc="Blending rich tradition with modern hits to guarantee regional emotional connection."
              time="4:30 PM – 5:30 PM"
            />
          </div>
          <div className="flex flex-col gap-7">
            <ArtistCard
              id="artist-djmexx" src="/bihu_dance.png" alt="DJMEXX" imgH={196}
              tagIcon={<Drum size={16} />} tagLabel="Closing Act" name="DJMEXX"
              desc="Ending the night by blending rich tradition with modern hits for an unforgettable finale."
              time="8:30 PM – 10:00 PM"
            />
            <ArtistCard
              id="artist-bihu" src="/tea_garden.png" alt="Bihu Dance Troupe" imgH={196}
              tagIcon={<Flower2 size={16} />} tagLabel="Cultural" name="Bihu Ensemble"
              desc="Authentic Bihu dance troupe opening the evening with fire and joy."
              time="4:00 PM – 4:30 PM"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
