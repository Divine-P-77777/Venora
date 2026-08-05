"use client";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-[1000] py-[18px] transition-all duration-400 bg-gradient-to-b from-purple-deep/95 to-transparent ${
        scrolled ? "navbar-scrolled" : ""
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <div className="flex flex-col leading-none">
          <span className="text-gold text-[2rem] leading-none" style={{ fontFamily: "var(--font-script)" }}>
            Sewali
          </span>
          <span className="text-[0.6rem] tracking-[4px] uppercase text-white/60 mt-[2px]">
            Music Festival 2026
          </span>
        </div>

        {/* Nav links */}
        <ul className="hidden md:flex items-center gap-9 list-none">
          {["about", "culture", "artists", "schedule", "venue"].map((link) => (
            <li key={link}>
              <a
                href={`#${link}`}
                className="text-[0.85rem] font-medium tracking-wide uppercase text-white/80 hover:text-gold transition-colors duration-300 relative
                  after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.charAt(0).toUpperCase() + link.slice(1)}
              </a>
            </li>
          ))}
          <li>
            <a href="#tickets" className="btn btn-primary" style={{ padding: "10px 24px", fontSize: "0.82rem" }}>
              Get Tickets
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
