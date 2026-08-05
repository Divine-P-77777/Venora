"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Ticket, Music, Sunrise, Moon, Mic, Calendar } from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   SPRITE CACHE
   Pre-render each flower size to a tiny offscreen canvas once.
   drawImage() is a GPU texture-copy — far faster than re-drawing
   paths every frame.
───────────────────────────────────────────────────────────── */
const SIZES = [8, 11, 14] as const;
type Sz = (typeof SIZES)[number];

function buildSprites(scale: number = 1): Map<Sz, HTMLCanvasElement> {
  const map = new Map<Sz, HTMLCanvasElement>();
  for (const baseS of SIZES) {
    const s = baseS * scale;
    const pad = Math.ceil(s * 1.8); // room to rotate without clipping
    const oc  = document.createElement("canvas");
    oc.width = oc.height = pad * 2;
    const cx = pad;
    const g   = oc.getContext("2d")!;
    g.translate(cx, cx);

    // 6 petals
    for (let i = 0; i < 6; i++) {
      g.save();
      g.rotate((i / 6) * Math.PI * 2);
      g.beginPath();
      g.ellipse(0, -s * 0.6, s * 0.22, s * 0.5, 0, 0, Math.PI * 2);
      g.fillStyle = "rgba(255,253,238,0.92)";
      g.fill();
      g.restore();
    }
    // Orange calyx tube
    g.beginPath();
    g.moveTo(-s * 0.1, 0); g.lineTo(s * 0.1, 0);
    g.lineTo(s * 0.07, s * 0.52); g.lineTo(-s * 0.07, s * 0.52);
    g.closePath();
    g.fillStyle = "#e97e1e";
    g.fill();
    // Centre disk
    g.beginPath();
    g.arc(0, 0, s * 0.19, 0, Math.PI * 2);
    g.fillStyle = "#f4a228";
    g.fill();

    map.set(baseS, oc);
  }
  return map;
}

/* ─────────────────────────────────────────────────────────────
   PARTICLE TYPE
───────────────────────────────────────────────────────────── */
interface Petal {
  x: number; y: number;
  vx: number; vy: number;
  rot: number; rotV: number;
  sz: Sz; opacity: number;
  age: number; swayPhase: number;
}

function mkPetal(W: number): Petal {
  return {
    x: Math.random() * (W + 60) - 30,
    y: -20,
    vx: (Math.random() - 0.5) * 0.6,
    vy: 0.9 + Math.random() * 1.2,
    rot: Math.random() * Math.PI * 2,
    rotV: (Math.random() - 0.5) * 0.055,
    sz: SIZES[Math.floor(Math.random() * SIZES.length)],
    opacity: 0.68 + Math.random() * 0.32,
    age: 0,
    swayPhase: Math.random() * Math.PI * 2,
  };
}

/** Blit a cached sprite with rotation — one drawImage call */
function blit(
  ctx: CanvasRenderingContext2D,
  sprites: Map<Sz, HTMLCanvasElement>,
  p: Petal
) {
  const sp = sprites.get(p.sz)!;
  const half = sp.width / 2;
  ctx.save();
  ctx.globalAlpha = p.opacity;
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rot);
  ctx.drawImage(sp, -half, -half);
  ctx.restore();
}

/* ─────────────────────────────────────────────────────────────
   MAIN HOOK
───────────────────────────────────────────────────────────── */
const BUCKET_W   = 24;   // px per pile column
const MAX_ACTIVE = 35;   // max airborne flowers
const MAX_SETTLED = 140; // max accumulated flowers
const SPAWN_MS   = 420;  // ms between spawns

function useSewali(ref: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    // Alpha context — no opaque background needed
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Build sprites on first mount (scaled down on mobile)
    const isMobile = window.innerWidth < 768;
    const sprites = buildSprites(isMobile ? 0.6 : 1);
    const maxActive = isMobile ? 15 : MAX_ACTIVE;
    const maxSettled = isMobile ? 50 : MAX_SETTLED;

    /* ── Settled layer on an offscreen canvas ──────────────────
       Settled flowers are drawn once here, never redrawn.
       Per frame we do: ctx.drawImage(settledC, 0, 0) — one op.
    ─────────────────────────────────────────────────────────── */
    const settledC   = document.createElement("canvas");
    const settledCtx = settledC.getContext("2d", { alpha: true })!;
    let   settledCnt = 0;

    let pile = new Float32Array(0);

    const sync = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width   = w;
      canvas.height  = h;
      settledC.width = w;
      settledC.height = h;
      pile = new Float32Array(Math.ceil(w / BUCKET_W));
      // Note: clearing settledC also clears its content — that's fine on resize
      settledCnt = 0;
    };
    const ro = new ResizeObserver(sync);
    ro.observe(canvas);
    sync();

    const floorAt = (x: number) => {
      const bi = Math.max(0, Math.min(Math.floor(x / BUCKET_W), pile.length - 1));
      return canvas.height - 8 - pile[bi] * 8;
    };
    const raisePile = (x: number) => {
      const bi = Math.max(0, Math.min(Math.floor(x / BUCKET_W), pile.length - 1));
      for (let d = -2; d <= 2; d++) {
        const nb = bi + d;
        if (nb >= 0 && nb < pile.length) pile[nb] += 0.28 / (Math.abs(d) + 1);
      }
    };

    let active: Petal[] = [];
    let animId: number;
    let tick_n = 0;

    const spawner = setInterval(() => {
      if (active.length < maxActive) active.push(mkPetal(canvas.width));
    }, SPAWN_MS);

    const tick = () => {
      tick_n++;
      /* 30fps throttle — skip every other rAF.
         Flowers fall slowly; 30fps is imperceptible to the eye
         but halves all GPU work. */
      if (tick_n % 2 !== 0) {
        animId = requestAnimationFrame(tick);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ONE draw call for the entire settled pile
      ctx.drawImage(settledC, 0, 0);

      const next: Petal[] = [];
      for (const p of active) {
        p.age++;
        // Sway: cheap sin approximation via precomputed phase
        const sway = Math.sin(p.age * 0.04 + p.swayPhase) * 0.42;
        p.vx = p.vx * 0.976 + sway * 0.04;
        p.vy = Math.min(p.vy + 0.016, 2.4);
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.rotV;

        const floor = floorAt(p.x);
        if (p.y >= floor) {
          p.y = floor;
          // Settled: draw once to offscreen canvas
          if (settledCnt < maxSettled) {
            blit(settledCtx, sprites, p);
            settledCnt++;
          }
          raisePile(p.x);
        } else {
          blit(ctx, sprites, p);
          next.push(p);
        }
      }
      active = next;

      animId = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(spawner);
      ro.disconnect();
    };
  }, [ref]);
}

/* ─────────────────────────────────────────────────────────────
   HERO COMPONENT
───────────────────────────────────────────────────────────── */
export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useSewali(canvasRef);

  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex flex-col justify-center items-center text-center overflow-hidden"
      style={{ contain: "layout style" }}
    >
      {/* Background */}
      <Image
        src="/brahmaputra.png"
        alt="Brahmaputra River at sunset, Assam"
        fill priority
        className="object-cover object-center z-0 will-change-transform"
        style={{ animation: "heroZoom 20s ease-in-out infinite alternate" }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-purple-deep/75 via-purple-dark/55 to-purple-deep/95" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent,transparent 38px,rgba(192,57,43,0.04) 38px,rgba(192,57,43,0.04) 40px),repeating-linear-gradient(90deg,transparent,transparent 38px,rgba(212,175,55,0.03) 38px,rgba(212,175,55,0.03) 40px)",
        }}
      />

      {/* Hero text — z-3 */}
      <div
        className="relative z-[3] max-w-[900px] px-6"
        style={{ animation: "fadeSlideUp 1.4s ease forwards" }}
      >
        <p className="text-[0.8rem] tracking-[8px] uppercase text-gold/90 mb-5">
          ✦ September 2026 ✦ Assam, Northeast India ✦
        </p>
        <h1
          className="text-gold leading-none mb-3"
          style={{
            fontFamily: "var(--font-script)",
            fontSize: "clamp(4rem, 10vw, 8rem)",
            textShadow: "0 0 60px rgba(212,175,55,0.5)",
            animation: "glowPulse 4s ease-in-out infinite",
          }}
        >
          Sewali
        </h1>
        <p
          className="tracking-[8px] uppercase text-gold/70 mb-4 text-[0.85rem] font-medium"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Music Festival 2026
        </p>
        <p
          className="font-normal italic text-white/90 tracking-[2px] md:tracking-[4px] mb-6 md:mb-8"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.1rem, 3.5vw, 2.4rem)",
          }}
        >
          An Evening of Melodies &amp; Romance
        </p>
        <p className="text-[0.95rem] md:text-[1.1rem] leading-[1.8] text-white/80 max-w-[600px] mx-auto mb-8 md:mb-12">
          Where the soulful rhythms of the Northeast meet the golden dusk of the Brahmaputra.
          Experience tradition, romance, and music in one unforgettable evening under the Assam sky.
        </p>
        <div className="flex gap-4 md:gap-5 justify-center flex-wrap mb-10 md:mb-20">
          <a href="#tickets" className="btn btn-primary" id="hero-book-btn">
            <Ticket size={18} /> Book Your Seat
          </a>
          <a href="#artists" className="btn btn-outline" id="hero-lineup-btn">
            <Music size={18} /> View Lineup
          </a>
        </div>
      </div>

      {/* Sewali flower canvas — z-4, pointer-events none */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-[4] pointer-events-none w-full h-full"
      />

      {/* Stat badges — z-5, above flowers */}
      <div
        className="relative z-[5] grid grid-cols-2 md:flex md:justify-center mt-auto mb-[20px] md:mb-[60px] mx-4 md:mx-0 opacity-0 rounded-[20px] border border-white/10"
        style={{
          animation: "fadeSlideUp 1.6s 0.4s ease forwards",
          background: "rgba(0,0,0,0.38)",
          backdropFilter: "blur(10px)",
        }}
      >
        {[
          { icon: <Sunrise size={20} />, value: "5,000+", label: "Attendees" },
          { icon: <Mic size={20} />,     value: "1M+",    label: "Digital Reach" },
          { icon: <Moon size={20} />,    value: "10 PM",  label: "Last Performance" },
          { icon: <Calendar size={20} />,value: "Sep'26", label: "Month of Show" },
        ].map((b, i) => (
          <div
            key={i}
            className={`flex flex-col items-center gap-[4px] md:gap-[6px] py-4 md:py-7 px-2 sm:px-8 md:px-12 ${
              i % 2 !== 0 ? "border-l border-white/12" : ""
            } ${i > 1 ? "border-t border-white/12 md:border-t-0" : ""} ${
              i > 0 ? "md:border-l md:border-white/12" : ""
            }`}
          >
            <span className="flex items-center justify-center text-gold/90 scale-75 md:scale-100">{b.icon}</span>
            <span
              className="text-[1.4rem] font-bold text-gold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {b.value}
            </span>
            <span className="text-[0.7rem] tracking-[3px] uppercase text-white/60">
              {b.label}
            </span>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-[30px] left-1/2 -translate-x-1/2 z-[6] hidden md:flex flex-col items-center gap-2 text-white/50 text-[0.7rem] tracking-[3px] uppercase scroll-indicator">
        <div className="w-px h-10 bg-gradient-to-b from-gold to-transparent" />
        <span>Scroll</span>
      </div>
    </section>
  );
}
