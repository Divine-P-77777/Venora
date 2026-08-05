import { Ticket, Sparkles } from "lucide-react";

type TierProps = { featured?: boolean };

const tiers = [
  {
    tier: "Silver", price: "₹999", period: "per person",
    features: ["Access to Silver Area", "Cultural zone & exhibition access", "Welcome Gamosa gift", "General food stalls access"],
    btn: "btn-outline", featured: false,
  },
  {
    tier: "Gold ", price: "₹2,499", period: "per person",
    features: ["Access to exclusive Gold Area", "Premium stage view", "Dedicated bar & dining access", "Priority entry from 3:30 PM", "Welcome Gamosa gift"],
    btn: "btn-primary", featured: true,
  },
  {
    tier: "Fan Pit", price: "₹2,999", period: "per person",
    features: ["Front-row Fan Pit access", "Exclusive VIP lounge entry", "Meet & greet opportunity", "Premium F&B services", "Exclusive Gamosa & merch kit"],
    btn: "btn-outline", featured: false,
  },
  {
    tier: "VIP", price: "₹3,999", period: "per person",
    features: ["Front-row Fan Pit access", "Exclusive VIP lounge entry", "Meet & greet opportunity", "Premium F&B services", "Exclusive Gamosa & merch kit"],
    btn: "btn-outline", featured: false,
  },
];

export default function Tickets() {
  return (
    <section id="tickets" className="py-16 md:py-[120px] relative overflow-hidden bg-gradient-to-b from-purple-deep to-purple-dark">
      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)" }}
      />

      <div className="container relative z-[1]">
        {/* Header */}
        <div className="text-center mb-[80px] anim-fade-up">
          <p className="section-label">Reserve Your Seat</p>
          <div className="divider-gold" />
          <h2 className="font-display mb-5" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
            Choose Your <span className="text-gold">Experience</span>
          </h2>
          <p className="text-[1.1rem] text-white/70 max-w-[520px] mx-auto">
            Every ticket is a pass to an evening that will live in your memory forever. Early bird pricing — limited seats available.
          </p>
        </div>

        {/* Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 max-w-[1000px] mx-auto anim-fade-up">
          {tiers.map((t, i) => (
            <div
              key={i}
              id={`ticket-${i}`}
              className={`glass-card p-11 text-center relative overflow-hidden ${t.featured
                ? "ticket-ribbon border-red/50 scale-[1.04]"
                : ""
                }`}
              style={t.featured ? { background: "linear-gradient(135deg, rgba(192,57,43,0.3) 0%, rgba(230,126,34,0.15) 100%)" } : {}}
            >
              <div className="text-[0.7rem] font-bold tracking-[4px] uppercase text-gold mb-4">{t.tier}</div>
              <div className="font-display text-[3.5rem] font-black text-white leading-none mb-[6px]"
                style={{ fontFamily: "var(--font-display)" }}>{t.price}</div>
              <div className="text-[0.85rem] text-white/50 mb-8">{t.period}</div>

              <ul className="flex flex-col gap-3 mb-9 list-none">
                {t.features.map((f) => (
                  <li key={f} className="flex items-center justify-center gap-[10px] text-[0.9rem] text-white/75">
                    <span className="text-gold"><Sparkles size={14} /></span>
                    {f}
                  </li>
                ))}
              </ul>

              <button className={`btn ${t.btn} w-full justify-center`}>
                <Ticket size={18} /> Get Tickets
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
