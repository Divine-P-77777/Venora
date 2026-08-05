export default function ParallaxBanner() {
  return (
    <section className="relative min-h-[500px] py-14 md:py-[100px] overflow-hidden flex items-center justify-center isolation-isolate">
      {/* Parallax bg — kept as CSS class for background-attachment: fixed */}
      <div className="parallax-bg" />

      {/* Content */}
      <div className="relative z-[1] text-center max-w-[800px] px-6 anim-fade-up">
        <p className="tag mb-7">Assamese Proverb</p>
        <h2
          className="font-display mb-0"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.2 }}
        >
          &ldquo; Nadi-r buke surer dhara bohise —<br />
          <em style={{ color: "#d4af37", fontFamily: "var(--font-script)", fontSize: "1.2em" }}>
            A river of melody flows through the heart of the river.
          </em>
          &rdquo;
        </h2>
        <p className="mt-6 text-[1.15rem] text-white/85 leading-[1.7]">
          The Brahmaputra doesn&apos;t just carry water — she carries songs, stories, and the spirits of the Northeast.
        </p>
      </div>
    </section>
  );
}
