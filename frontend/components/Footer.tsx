import { Camera, Globe, Video, MessageSquare, MapPin, Phone, Mail, Clock, Heart } from "lucide-react";

const quickLinks = ["about", "culture", "artists", "schedule", "venue", "tickets"];
const infoLinks  = ["FAQs", "Travel & Stay", "Food & Beverages", "Accessibility", "Press & Media", "Volunteer"];
const contactItems = [
  { icon: <MapPin size={20} />, text: "Lokhra, Guwahati, Assam, Northeast India" },
  { icon: <Phone size={20} />, text: "+91 93871 36913" },
  { icon: <Mail size={20} />,  text: "kesariventure1@gmail.com" },
  { icon: <Clock size={20} />, text: "Mon–Sat: 10 AM – 6 PM IST" },
];
const socialIcons = [
  { icon: <Camera size={20} />, label: "Instagram" },
  { icon: <Globe size={20} />,  label: "Facebook" },
  { icon: <Video size={20} />,  label: "YouTube" },
  { icon: <MessageSquare size={20} />, label: "Twitter/X" },
];

export default function Footer() {
  return (
    <footer className="pt-12 md:pt-[80px] pb-10 border-t border-gold/15" style={{ background: "rgb(10, 3, 20)" }}>
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-[40px] lg:gap-[60px] mb-[60px]">

          {/* Brand */}
          <div>
            <div className="text-gold text-[3rem] leading-none mb-4" style={{ fontFamily: "var(--font-script)" }}>
              Sewali
            </div>
            <div className="divider-gold divider-gold--left mb-5" />
            <p className="text-[0.85rem] text-white/50 leading-[1.7] mb-7">
              An evening of melodies and romance on the banks of the mighty Brahmaputra.
              Celebrating the culture, music, and spirit of Assam and the Northeast.
            </p>
            <div className="flex gap-[14px]">
              {socialIcons.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="w-[42px] h-[42px] rounded-full border border-gold/30 bg-gold/5 flex items-center justify-center text-white/80 transition-all duration-300 hover:bg-gold/20 hover:border-gold hover:-translate-y-[3px]"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-[1rem] text-gold mb-5 pb-[10px] border-b border-gold/20"
              style={{ fontFamily: "var(--font-display)" }}>Quick Links</h4>
            <ul className="flex flex-col gap-[10px] list-none">
              {quickLinks.map((l) => (
                <li key={l}>
                  <a href={`#${l}`} className="text-[0.9rem] text-white/55 hover:text-gold transition-colors duration-300">
                    {l.charAt(0).toUpperCase() + l.slice(1).replace("-", " ")}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="font-display font-semibold text-[1rem] text-gold mb-5 pb-[10px] border-b border-gold/20"
              style={{ fontFamily: "var(--font-display)" }}>Information</h4>
            <ul className="flex flex-col gap-[10px] list-none">
              {infoLinks.map((l) => (
                <li key={l}>
                  <a href="#" className="text-[0.9rem] text-white/55 hover:text-gold transition-colors duration-300">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-[1rem] text-gold mb-5 pb-[10px] border-b border-gold/20"
              style={{ fontFamily: "var(--font-display)" }}>Contact Us</h4>
            {contactItems.map((c) => (
              <div key={c.text} className="flex items-start gap-3 mb-3">
                <span className="text-gold flex-shrink-0 mt-[2px]">{c.icon}</span>
                <span className="text-[0.9rem] text-white/55 leading-[1.5]">{c.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-8 border-t border-white/6 gap-4 flex-wrap">
          <p className="text-[0.85rem] text-white/35 flex items-center gap-1">
            © 2026 Sewali Music Festival. All rights reserved. Made with{" "}
            <Heart size={16} fill="currentColor" className="text-red" /> in Assam.
          </p>
          <div className="flex gap-7">
            {["Privacy Policy", "Terms of Service", "Refund Policy"].map((l) => (
              <a key={l} href="#" className="text-[0.85rem] text-white/35 hover:text-gold transition-colors duration-300">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
