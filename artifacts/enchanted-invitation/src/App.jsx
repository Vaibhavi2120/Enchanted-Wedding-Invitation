import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";

import forest from "./assets/forest.jpg";
import storyBg from "./assets/story-bg.jpeg";

import haldi1 from "./assets/haldi/haldi-1.jpg.jpg";
import haldi2 from "./assets/haldi/Haldi-2.jpg.jpg";

import wedding1 from "./assets/wedding/wedding-1.jpg.jpg";
import wedding2 from "./assets/wedding/wedding-2.jpg.jpg";

import reception2 from "./assets/reception/reception-2.jpg.jpg";
import reception3 from "./assets/reception/reception-3.jpg.jpg";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const heroRef = useRef(null);
  const forestLayerRef = useRef(null);
  const glowRef = useRef(null);
  const particlesRef = useRef(null);
  const overlayRef = useRef(null);
  const scrollHintRef = useRef(null);
  const progressFillRef = useRef(null);
  const eventCardsRef = useRef([]);
  const eventsRef = useRef(null);
  const successRef = useRef(null);
  const reducedMotionRef = useRef(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = motionQuery.matches;

    const ctx = gsap.context(() => {
      const particles = particlesRef.current?.querySelectorAll("span") || [];

      if (reducedMotionRef.current) {
        gsap.set(progressFillRef.current, { scaleX: 1 });
        gsap.set([scrollHintRef.current, ...particles], { clearProps: "all" });
        return;
      }

      const heroTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=115%",
          scrub: 1,
          pin: true,
        },
      });

      heroTimeline
        .to(progressFillRef.current, { scaleX: 1, ease: "none" }, 0)
        .to(scrollHintRef.current, { opacity: 0, y: 18, duration: 0.1 }, 0)
        .to(forestLayerRef.current, { scale: 1.12, ease: "power1.inOut" }, 0)
        .to(
          glowRef.current,
          {
            scale: 0.48,
            opacity: 1,
            ease: "power2.inOut",
          },
          0.12,
        )
        .to(
          overlayRef.current,
          {
            opacity: 1,
            background:
              "radial-gradient(circle at 50% 48%, rgba(3,7,7,0.2) 0%, rgba(3,7,7,0.94) 74%)",
            ease: "power1.inOut",
          },
          0.18,
        )
        .to(
          heroRef.current,
          {
            scale: 0.84,
            ease: "power2.inOut",
          },
          0.28,
        );

      particles.forEach((particle) => {
        const rect = particle.getBoundingClientRect();
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight * 0.48;

        heroTimeline.to(
          particle,
          {
            x: centerX - rect.left - rect.width / 2,
            y: centerY - rect.top - rect.height / 2,
            scale: 0.3,
            opacity: 0,
            ease: "power2.in",
          },
          0,
        );
      });

      eventCardsRef.current.forEach((card, index) => {
        if (!card) return;

        const images = card.querySelector(".event-images");
        const mainImage = card.querySelector(".event-main-image");
        const smallImage = card.querySelector(".event-small-image");
        const info = card.querySelector(".event-info");
        const number = card.querySelector(".event-number");

        gsap.fromTo(
          images,
          { y: 70, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 84%",
              end: "top 38%",
              scrub: 1,
            },
          },
        );
        gsap.fromTo(
          mainImage,
          { scale: 1.1 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "top 30%",
              scrub: 1,
            },
          },
        );
        gsap.fromTo(
          smallImage,
          {
            x: index % 2 === 0 ? 55 : -55,
            y: 30,
            opacity: 0,
            rotation: index % 2 === 0 ? 4 : -4,
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            rotation: 0,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 72%",
              end: "top 35%",
              scrub: 1,
            },
          },
        );
        gsap.fromTo(
          info,
          { y: 42, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 67%",
              end: "top 40%",
              scrub: 1,
            },
          },
        );
        gsap.fromTo(
          number,
          { x: index % 2 === 0 ? -24 : 24, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 75%",
              end: "top 45%",
              scrub: 1,
            },
          },
        );
      });

      gsap.fromTo(
        ".rsvp-content",
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".rsvp-section",
            start: "top 76%",
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (submitted) {
      requestAnimationFrame(() => successRef.current?.focus());
    }
  }, [submitted]);

  const revealEvents = () => {
    eventsRef.current?.scrollIntoView({
      behavior: reducedMotionRef.current ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <main className="page">
      <a className="skip-link" href="#events" data-testid="link-skip-events">
        Skip to the celebration
      </a>

      <section className="hero" ref={heroRef} aria-labelledby="hero-title">
        <div className="forest-layer" ref={forestLayerRef}>
          <img src={forest} alt="A shadowed path through an enchanted forest" />
        </div>
        <div className="glow" ref={glowRef} aria-hidden="true" />
        <div className="particles" ref={particlesRef} aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="hero-overlay" ref={overlayRef} aria-hidden="true" />

        <div className="hero-content">
          <p className="hero-kicker">An invitation to wander with us</p>
          <h1 id="hero-title">
            Aarav <span>&amp;</span> Meera
          </h1>
          <p className="hero-line">Some stories are written.</p>
          <p className="hero-line">Some are meant to be lived.</p>
          <div className="scroll-hint" ref={scrollHintRef} aria-hidden="true">
            <span className="ornament-line" />
            <small>Scroll to enter</small>
            <span className="ornament-line" />
          </div>
        </div>
      </section>

      <section className="transition" aria-labelledby="story-title">
        <img
          src={storyBg}
          alt=""
          className="story-bg"
          aria-hidden="true"
        />
        <div className="transition-bg" aria-hidden="true" />

        <div className="story-interface">
          <div className="story-progress" aria-label="Invitation progress">
            <span className="progress-label">01</span>
            <div className="progress-track" aria-hidden="true">
              <div className="progress-fill" ref={progressFillRef} />
            </div>
            <span className="progress-label">03</span>
          </div>

          <div className="story-top">
            <span className="ornament-mark" aria-hidden="true" />
            <p>The story</p>
            <span className="ornament-mark" aria-hidden="true" />
          </div>

          <article className="story-card">
            <div className="card-corner top-left" aria-hidden="true" />
            <div className="card-corner top-right" aria-hidden="true" />
            <div className="card-corner bottom-left" aria-hidden="true" />
            <div className="card-corner bottom-right" aria-hidden="true" />
            <p className="story-number">Chapter 01</p>
            <h2 id="story-title">
              The Beginning
              <br />
              of Forever
            </h2>
            <div className="gold-line" aria-hidden="true" />
            <p className="story-copy">
              Somewhere between chance and fate, two paths crossed and a
              beautiful story began.
            </p>
            <p className="couple">
              AARAV <span aria-hidden="true">&amp;</span> MEERA
            </p>
            <div className="story-actions">
              <button
                className="story-btn"
                type="button"
                onClick={revealEvents}
                data-testid="button-discover-story"
              >
                <span className="btn-text">Discover our story</span>
                <span className="btn-arrow" aria-hidden="true">
                  →
                </span>
              </button>
            </div>
          </article>

          <div className="story-scroll" aria-hidden="true">
            <span />
            <small>Continue the journey</small>
          </div>
        </div>
      </section>

      <section
        className="events-section"
        id="events"
        ref={eventsRef}
        aria-labelledby="events-title"
      >
        <div className="section-intro events-heading">
          <span className="eyebrow">
            <i aria-hidden="true" /> The journey <i aria-hidden="true" />
          </span>
          <p className="section-overline">A celebration in three acts</p>
          <h2 id="events-title">
            Three moments,
            <br />
            one beautiful story
          </h2>
          <p>
            From laughter and rituals to the moment we said forever, these are
            the chapters we cannot wait to share with you.
          </p>
        </div>

        <div className="events-rail" aria-label="Wedding events">
          <article
            className="event-card"
            ref={(element) => (eventCardsRef.current[0] = element)}
            aria-labelledby="haldi-title"
          >
            <div className="event-number" aria-hidden="true">
              01
            </div>
            <div className="event-images">
              <figure className="event-main-frame">
                <img
                  src={haldi1}
                  alt="Friends and family gathered for the Haldi celebration"
                  className="event-main-image"
                />
              </figure>
              <figure className="event-small-frame">
                <img
                  src={haldi2}
                  alt="A bright Haldi ceremony detail"
                  className="event-small-image"
                />
              </figure>
            </div>
            <div className="event-info">
              <span className="event-label">The first celebration</span>
              <h3 id="haldi-title">Haldi</h3>
              <div className="event-line" aria-hidden="true" />
              <p>
                A day painted in yellow, filled with laughter, warmth and
                beautiful memories.
              </p>
              <span className="event-note">Rituals / laughter / colour</span>
            </div>
          </article>

          <article
            className="event-card reverse"
            ref={(element) => (eventCardsRef.current[1] = element)}
            aria-labelledby="wedding-title"
          >
            <div className="event-number" aria-hidden="true">
              02
            </div>
            <div className="event-images">
              <figure className="event-main-frame">
                <img
                  src={wedding1}
                  alt="A joyful moment from the wedding ceremony"
                  className="event-main-image"
                />
              </figure>
              <figure className="event-small-frame">
                <img
                  src={wedding2}
                  alt="A tender wedding memory"
                  className="event-small-image"
                />
              </figure>
            </div>
            <div className="event-info">
              <span className="event-label">The day we said yes</span>
              <h3 id="wedding-title">Wedding</h3>
              <div className="event-line" aria-hidden="true" />
              <p>
                Two hearts, two journeys, and one promise to walk through life
                together.
              </p>
              <span className="event-note">Promises / flowers / forever</span>
            </div>
          </article>

          <article
            className="event-card"
            ref={(element) => (eventCardsRef.current[2] = element)}
            aria-labelledby="reception-title"
          >
            <div className="event-number" aria-hidden="true">
              03
            </div>
            <div className="event-images">
              <figure className="event-main-frame">
                <img
                  src={reception2}
                  alt="Guests celebrating at the reception"
                  className="event-main-image"
                />
              </figure>
              <figure className="event-small-frame">
                <img
                  src={reception3}
                  alt="A joyful reception memory"
                  className="event-small-image"
                />
              </figure>
            </div>
            <div className="event-info">
              <span className="event-label">An evening to remember</span>
              <h3 id="reception-title">Reception</h3>
              <div className="event-line" aria-hidden="true" />
              <p>
                An evening of music, celebration and the people who made it
                unforgettable.
              </p>
              <span className="event-note">Music / dancing / together</span>
            </div>
          </article>
        </div>

        <div className="events-end">
          <span className="ornament-line" aria-hidden="true" />
          <p>The story continues</p>
          <span className="ornament-line" aria-hidden="true" />
        </div>
      </section>

      <section className="rsvp-section" aria-labelledby="rsvp-title">
        <div className="rsvp-glow" aria-hidden="true" />
        <div className="rsvp-content">
          {!submitted ? (
            <>
              <span className="rsvp-label">
                <i aria-hidden="true" /> A little note <i aria-hidden="true" />
              </span>
              <h2 id="rsvp-title">
                Will you join us
                <br />
                for this chapter?
              </h2>
              <p className="rsvp-intro">
                Your presence would make our celebration even more magical.
              </p>

              <form
                className="rsvp-form"
                onSubmit={(event) => {
                  event.preventDefault();
                  setSubmitted(true);
                }}
              >
                <div className="form-group">
                  <label htmlFor="guest-name">Your name</label>
                  <input
                    id="guest-name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    autoComplete="name"
                    required
                    data-testid="input-guest-name"
                  />
                </div>

                <fieldset className="form-group">
                  <legend>Will you be joining us?</legend>
                  <div className="attendance-options">
                    <label className="choice">
                      <input
                        type="radio"
                        name="attendance"
                        value="yes"
                        required
                        data-testid="radio-attending"
                      />
                      <span>Joyfully attending</span>
                    </label>
                    <label className="choice">
                      <input
                        type="radio"
                        name="attendance"
                        value="no"
                        data-testid="radio-not-attending"
                      />
                      <span>Sadly, can&apos;t make it</span>
                    </label>
                  </div>
                </fieldset>

                <div className="form-group">
                  <label htmlFor="guest-count">Number of guests</label>
                  <select
                    id="guest-count"
                    name="guests"
                    defaultValue=""
                    required
                    data-testid="select-guest-count"
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="guest-message">A little message</label>
                  <textarea
                    id="guest-message"
                    name="message"
                    placeholder="Leave us a wish..."
                    rows="4"
                    data-testid="textarea-guest-message"
                  />
                </div>

                <button
                  type="submit"
                  className="rsvp-button"
                  data-testid="button-submit-rsvp"
                >
                  <span>Send your wishes</span>
                  <b aria-hidden="true">→</b>
                </button>
              </form>
            </>
          ) : (
            <div
              className="rsvp-success"
              ref={successRef}
              tabIndex={-1}
              role="status"
              aria-live="polite"
              data-testid="status-rsvp-success"
            >
              <div className="success-star" aria-hidden="true">
                <span />
              </div>
              <span>Your wish has been received</span>
              <h2>Thank you</h2>
              <p>We can&apos;t wait to celebrate this beautiful day with you.</p>
              <div className="success-line" aria-hidden="true" />
              <small>With love, Aarav &amp; Meera</small>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default App;