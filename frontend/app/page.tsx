"use client";

import { useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Culture from "../components/Culture";
import ParallaxBanner from "../components/ParallaxBanner";
import Artists from "../components/Artists";
import Schedule from "../components/Schedule";
import Experience from "../components/Experience";
import Gallery from "../components/Gallery";
import Stats from "../components/Stats";
import Venue from "../components/Venue";
import Testimonials from "../components/Testimonials";
import Tickets from "../components/Tickets";
import CtaBanner from "../components/CtaBanner";
import Footer from "../components/Footer";

export default function Home() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Scroll animation observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".anim-fade-up");
    elements.forEach((el) => observerRef.current?.observe(el));

    // Navbar scroll effect
    const handleScroll = () => {
      const navbar = document.getElementById("navbar");
      if (navbar) {
        if (window.scrollY > 60) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Culture />
        <ParallaxBanner />
        <Artists />
        <Schedule />
        <Experience />
        <Gallery />
        <Stats />
        <Venue />
        <Testimonials />
        <Tickets />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
