"use client";

import {
  CSSProperties,
  PointerEvent as ReactPointerEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const CALENDLY_URL = "https://calendly.com/anagha-deshmukh";
const CROWDFUNDING_URL = process.env.NEXT_PUBLIC_CROWDFUNDING_URL || "";

type ItineraryStop = {
  date: string;
  city: string;
  title: string;
  copy: string;
  meta: string;
  image: string;
  note?: string;
  fallback?: string;
};

const itinerary: ItineraryStop[] = [
  {
    date: "DEC 3",
    city: "Mumbai",
    title: "Arrive. Rest. Reset.",
    copy: "Land in Mumbai, settle in and meet the people you will share the journey with. The first day is deliberately quiet before filming begins in Pune.",
    meta: "Arrival • Rest • Welcome",
    image: "/media/mumbai-gateway.webp",
  },
  {
    date: "DEC 4",
    city: "Pune",
    title: "The cameras turn toward service.",
    copy: "Film two to three Goodwill initiatives in one day. Meet the teams, enter the communities and understand the work before the camera asks you to speak about it.",
    meta: "Filming • 2 to 3 initiatives",
    image: "/media/feeding-children-hires-v2.webp",
  },
  {
    date: "DEC 5",
    city: "Pune",
    title: "Go deeper into the story.",
    copy: "A second filming day moves through another two to three initiatives, giving the group more time with the people and programmes behind Goodwill India.",
    meta: "Filming • Community",
    image: "/media/computer-donation-hires-v2.webp",
    note: "Tentative: Jim Keyes speech to a dealers organisation may be included.",
  },
  {
    date: "DEC 6",
    city: "Pune",
    title: "Ideas, shopping and voices.",
    copy: "A lighter bridge between filming and reflection, with shopping and motivational sessions woven into the Pune experience.",
    meta: "Shopping • Motivational sessions",
    image: "/media/pune-shopping.jpg",
    note: "Tentative: Skip Martin concert.",
  },
  {
    date: "DEC 7",
    city: "Pune",
    title: "Go within.",
    copy: "The journey changes pace at Brahma Kumaris Jagdamba Bhawan in Pisoli, Pune, creating room for stillness, reflection and a different kind of conversation.",
    meta: "Brahma Kumaris • Jagdamba Bhawan",
    image: "/media/bk-jagdamba-pune.jpg",
  },
  {
    date: "DEC 8",
    city: "Pune",
    title: "Stay with the quiet.",
    copy: "A second retreat day lets the group slow down before the journey moves into its final cultural chapters.",
    meta: "Spiritual retreat • Pune",
    image: "/media/bk-jagdamba-pune-2.avif",
  },
  {
    date: "DEC 9",
    city: "Agra",
    title: "The Taj Mahal.",
    copy: "Stand before one of the world’s most recognised monuments. After days of filming and service, this chapter is about scale, beauty and perspective.",
    meta: "Agra • Taj Mahal",
    image: "/media/taj-mahal-agra.webp",
  },
  {
    date: "DEC 10",
    city: "Jaipur",
    title: "Enter the Pink City.",
    copy: "Architecture, colour, craft and centuries of visual history take over as the journey reaches Jaipur.",
    meta: "Jaipur • Pink City",
    image: "/media/jaipur-hawa-mahal-v2.webp",
  },
  {
    date: "DEC 11",
    city: "Jaipur",
    title: "Experience Jaipur slowly.",
    copy: "A full second day for culture, food, design and the atmosphere of Jaipur without reducing the city to a quick stop.",
    meta: "Jaipur • Culture • Discovery",
    image: "/media/jaipur-hawa-mahal-v22.jpg",
  },
  {
    date: "DEC 12",
    city: "Return",
    title: "Carry the story home.",
    copy: "Fly back via Delhi or Mumbai with the people, causes and conversations continuing long after the itinerary ends.",
    meta: "Delhi or Mumbai • Departure",
    image: "/media/return-mumbai.jpg",
  },
];

type Cause = {
  no: string;
  title: string;
  tagline: string;
  copy: string;
  type: "photo" | "video";
  media: string;
  poster?: string;
};

const causes: Cause[] = [
  {
    no: "01",
    title: "Clothes Recycling",
    tagline: "A record built on reuse and dignity",
    copy: "Clothing is collected, sorted, cleaned and prepared for redistribution. The work became part of a Guinness World Records achievement involving 293,623 items collected for recycle and donation.",
    type: "photo",
    media: "/media/clothing.webp",
  },
  {
    no: "02",
    title: "Blanket Distribution",
    tagline: "Taking care of people sleeping outdoors",
    copy: "Goodwill teams go out at night to reach people sleeping outdoors with blankets, warm clothing and practical support.",
    type: "video",
    media: "/media/blanket-outreach.mp4",
    poster: "/media/blanket-outreach-hires.webp",
  },
  {
    no: "03",
    title: "Computer Donation",
    tagline: "Technology for schools and students",
    copy: "Computers are placed into learning environments where access to technology can widen a student’s opportunity, confidence and exposure.",
    type: "photo",
    media: "/media/computer-donation-hires-v2.webp",
  },
  {
    no: "04",
    title: "Bicycle Donation",
    tagline: "Turning a long walk into possibility",
    copy: "Bicycles help students travel to school with greater independence, saving time and making education easier to reach every day.",
    type: "photo",
    media: "/media/cycle-donation-hires-v2.webp",
  },
  {
    no: "05",
    title: "Feeding Children",
    tagline: "A meal can change the shape of a school day",
    copy: "Meals prepared through Goodwill reach children through school programmes across Pune. Learning should not begin with hunger.",
    type: "photo",
    media: "/media/feeding-children-hires-v2.webp",
  },
  {
    no: "06",
    title: "Group Weddings",
    tagline: "Dignity, ceremony and belonging",
    copy: "Goodwill has organised large community wedding ceremonies for couples with disabilities and hardship backgrounds, including gatherings of around 36 couples in one place. The focus is dignity, ceremony and belonging.",
    type: "video",
    media: "/media/group-weddings.mp4",
    poster: "/media/group-weddings.webp",
  },
  {
    no: "07",
    title: "Goodwill Laundry",
    tagline: "Dignity lives in the details",
    copy: "Donated garments are washed, cleaned and prepared before redistribution so that what is given is passed on with care and respect.",
    type: "photo",
    media: "/media/laundry-hires-v2.webp",
  },
  {
    no: "08",
    title: "Women’s Sewing",
    tagline: "Skill becomes livelihood",
    copy: "With sewing machines supported through Amazon, women produce uniforms and garments through paid work, building income, confidence and practical independence around a sustainable livelihood model.",
    type: "photo",
    media: "/media/sewing-unit.webp",
  },
  {
    no: "09",
    title: "Grocery Donation",
    tagline: "Support measured in weeks, not hours",
    copy: "Grocery kits help families put food on the table beyond a single meal, providing practical household support when it is needed most.",
    type: "photo",
    media: "/media/grocery-hires-v2.webp",
  },
  {
    no: "10",
    title: "Books to Schools",
    tagline: "Tools for the classroom",
    copy: "Books and school materials go directly to students. This initiative can later connect to Dan Weiseman’s crowdfunding pathway once that campaign is live.",
    type: "video",
    media: "/media/books-schools.mp4",
    poster: "/media/books-school-photo.webp",
  },
  {
    no: "11",
    title: "A Home of Her Own",
    tagline: "Rukwat, a dignified beginning",
    copy: "A young bride receives household essentials needed to begin married life with dignity, including utensils and practical basics for a new home.",
    type: "photo",
    media: "/media/kanyaratna-hires-v2.webp",
  },
  {
    no: "12",
    title: "Toys for Children",
    tagline: "Because childhood matters too",
    copy: "Toys are given to children who may rarely have something they can simply call their own. Small in scale, deeply human in meaning.",
    type: "photo",
    media: "/media/toys-hires-v2.webp",
  },
  {
    no: "13",
    title: "Inspire Women to Lead",
    tagline: "Stories shared with future women leaders",
    copy: "The plan is to take accomplished visitors and speakers to women and students at Cummins College of Engineering, sharing leadership stories, questions and possibility.",
    type: "photo",
    media: "/media/inspire-women.webp",
  },
];

const hosts = [
  {
    name: "Anagha Deshmukh",
    role: "Host",
    image: "/media/anagha-deshmukh-v2.webp",
    copy: "Connecting guests to India, Goodwill and the people behind the experience.",
  },
  {
    name: "Padmakar Nandekar",
    role: "Co-host",
    image: "/media/padmakar-nandekar-v2.webp",
    copy: "Bringing the Pune journey, local relationships and on-ground context together.",
  },
];

const filmTeam = [
  { name: "Nick Nanton", role: "Filmmaker", image: "/media/nick-nanton-v2.webp" },
  { name: "Dan Weiseman", role: "Production • Crowdfunding", image: "/media/dan-wiseman-v2.webp" },
  { name: "Greg Reid", role: "Producer • Collaborator", image: "/media/greg-reid-v2.webp" },
];

const tentativeGuests = [
  "Makarand Javdekar",
  "Skip Martin",
  "Cathy Goldstein",
  "Kevin Goldstein",
  "Jim Keyes",
];

function LotusMark() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="lotusMark">
      <path d="M32 7c6 8 8 15 5 22-2 5-5 9-5 9s-4-4-6-9c-2-7 0-14 6-22Z" />
      <path d="M11 19c9 1 16 5 19 11 3 6 2 12 2 12s-7-1-12-5c-5-4-8-10-9-18Z" />
      <path d="M53 19c-9 1-16 5-19 11-3 6-2 12-2 12s7-1 12-5c5-4 8-10 9-18Z" />
      <path d="M7 35c10-2 18 0 24 5 4 4 6 9 6 9s-8 2-15 0C15 47 10 42 7 35Z" />
      <path d="M57 35c-10-2-18 0-24 5-4 4-6 9-6 9s8 2 15 0c7-2 12-7 15-14Z" />
      <path d="M17 55h30" />
    </svg>
  );
}

function Arrow({ back = false }: { back?: boolean }) {
  return <span className={back ? "arrow isBack" : "arrow"}>→</span>;
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m8 6 10 6-10 6V6Z" fill="currentColor" />
    </svg>
  );
}

function SafeImage({
  src,
  fallback,
  alt,
  className = "",
}: {
  src: string;
  fallback?: string;
  alt: string;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={(event) => {
        if (fallback && !event.currentTarget.dataset.fallbackApplied) {
          event.currentTarget.dataset.fallbackApplied = "1";
          event.currentTarget.src = fallback;
        }
      }}
    />
  );
}

function useReveal() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("isVisible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("isVisible");
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -4% 0px" }
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="siteHeader">
      <a className="brand" href="#top" aria-label="Goodwill India home">
        <LotusMark />
        <span>
          <strong>GOODWILL INDIA</strong>
          <small>People • Purpose • A brighter tomorrow</small>
        </span>
      </a>

      <button
        className="menuToggle"
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label="Toggle navigation"
      >
        <span />
        <span />
      </button>

      <nav className={open ? "mainNav isOpen" : "mainNav"} aria-label="Primary navigation">
        <a href="#why" onClick={() => setOpen(false)}>Why Goodwill</a>
        <a href="#journey" onClick={() => setOpen(false)}>The Journey</a>
        <a href="#causes" onClick={() => setOpen(false)}>13 Causes</a>
        <a href="#film" onClick={() => setOpen(false)}>The Film</a>
        <a href="#people" onClick={() => setOpen(false)}>The People</a>
        <a href="#impact" onClick={() => setOpen(false)}>Impact</a>
      </nav>

      <a className="headerCta" href={CALENDLY_URL} target="_blank" rel="noreferrer">
        Request an invitation <Arrow />
      </a>
    </header>
  );
}

function Hero({ onFilm }: { onFilm: () => void }) {
  return (
    <section className="hero" id="top">
      <div className="heroFilm" aria-hidden="true">
        <video autoPlay muted loop playsInline poster="/media/video-poster.jpg">
          <source src="/media/goodwill-film-v2.mp4" type="video/mp4" />
        </video>
        <div className="heroShade" />
        <div className="heroNoise" />
      </div>

      <div className="pageShell heroGrid">
        <div className="heroCopy" data-reveal>
          <p className="heroEyebrow">INDIA WITH PURPOSE <span /> DEC 3-12, 2026</p>
          <h1>
            <span>13 People.</span>
            <span>13 Causes.</span>
            <em>One Film.</em>
          </h1>
          <p className="heroLead">
            A private India journey through service, story and human connection. Come experience the work, meet the people and help carry Goodwill India’s story further.
          </p>
          <div className="heroActions">
            <a className="primaryButton" href={CALENDLY_URL} target="_blank" rel="noreferrer">
              Request an invitation <Arrow />
            </a>
            <button className="watchButton" type="button" onClick={onFilm}>
              <span className="playCircle"><PlayIcon /></span>
              Watch the film
            </button>
          </div>
          <div className="routeLine" aria-label="Journey route">
            {['Mumbai', 'Pune', 'Agra', 'Jaipur'].map((item, index) => (
              <span key={item}>{index > 0 && <i />} {item}</span>
            ))}
          </div>
        </div>

        <div className="heroVisual" data-reveal>
          <div className="heroFrame heroFrameMain">
            <SafeImage src="/media/taj-mahal-agra.webp" alt="Taj Mahal in Agra" />
            <div className="frameLabel"><span>DEC 9</span><strong>AGRA</strong></div>
          </div>
          <div className="heroFrame heroFrameService">
            <SafeImage src="/media/feeding-children-hires-v2.webp" alt="Goodwill India school meal programme" />
            <div className="frameLabel"><span>PUNE</span><strong>REAL WORK</strong></div>
          </div>
          <div className="heroSeal">
            <strong>13</strong>
            <span>INVITATION-ONLY PLACES</span>
          </div>
          <div className="heroHandnote">More than a trip.<br />A story you step inside.</div>
        </div>
      </div>

      <div className="heroBottom pageShell">
        <span>Goodwill India • More Welfare Trust • Pune</span>
        <a href="#why">Discover why <Arrow /></a>
      </div>
    </section>
  );
}

function WhyGoodwill({ onCertificate }: { onCertificate: () => void }) {
  return (
    <section className="whySection" id="why">
      <div className="pageShell">
        <div className="sectionIntro" data-reveal>
          <span className="chapter">01</span>
          <div>
            <p className="eyebrow">WHY GOODWILL INDIA</p>
            <h2>The work came first.<br /><em>The film follows.</em></h2>
          </div>
          <p>
            Before the itinerary and before the camera, there is a reason this journey exists. Goodwill India has spent years turning everyday resources into practical dignity, food, education, livelihoods and second chances.
          </p>
        </div>

        <div className="whyEditorial">
          <article className="whyLarge" data-reveal>
            <SafeImage src="/media/blanket-outreach-hires.webp" alt="Goodwill India blanket outreach" />
            <div className="whyOverlay">
              <span>REAL PEOPLE</span>
              <strong>Impact you can meet.</strong>
              <p>Service is not shown from a distance. Guests step inside the work and meet the people already doing it.</p>
            </div>
          </article>

          <article className="whySmall whySmallTop" data-reveal>
            <SafeImage src="/media/sewing-unit.webp" alt="Women working in Goodwill sewing initiative" />
            <div className="whyOverlay compact"><span>LOCAL LIVELIHOODS</span><strong>Skills that keep giving.</strong></div>
          </article>

          <button className="recordCard" type="button" onClick={onCertificate} data-reveal>
            <div>
              <small>GUINNESS WORLD RECORDS</small>
              <strong>293,623</strong>
              <span>items collected for recycle and donation</span>
            </div>
            <SafeImage src="/media/guinness-certificate-v2.webp" alt="Guinness World Records certificate" />
          </button>
        </div>

        <div className="principleStrip" data-reveal>
          <article><span>01</span><strong>Real people</strong><small>Impact you can meet</small></article>
          <article><span>02</span><strong>Local communities</strong><small>Change rooted in Pune</small></article>
          <article><span>03</span><strong>Practical dignity</strong><small>Help designed to last</small></article>
          <article><span>04</span><strong>A story worth sharing</strong><small>Film as an amplifier</small></article>
        </div>
      </div>
    </section>
  );
}

function JourneySection() {
  const [active, setActive] = useState(0);
  const [dragX, setDragX] = useState(0);
  const pointerStart = useRef<number | null>(null);
  const stop = itinerary[active];

  const go = (direction: number) => {
    setActive((current) => (current + direction + itinerary.length) % itinerary.length);
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    pointerStart.current = event.clientX;
    setDragX(0);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (pointerStart.current === null) return;
    setDragX(event.clientX - pointerStart.current);
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (pointerStart.current === null) return;
    const delta = event.clientX - pointerStart.current;
    pointerStart.current = null;
    setDragX(0);
    if (Math.abs(delta) > 55) go(delta < 0 ? 1 : -1);
  };

  return (
    <section className="journeySection" id="journey">
      <div className="pageShell">
        <div className="sectionIntro journeyIntro" data-reveal>
          <span className="chapter">02</span>
          <div>
            <p className="eyebrow">THE INDIA JOURNEY</p>
            <h2>A journey that<br /><em>changes energy.</em></h2>
          </div>
          <p>Rest. Film. Serve. Reflect. Explore. Then carry the story home.</p>
        </div>

        <div
          className="journeyStage"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          style={{ "--drag-x": `${dragX * 0.08}px` } as CSSProperties}
          data-reveal
        >
          <div className="journeyImage" key={`${stop.date}-${stop.city}`}>
            <SafeImage src={stop.image} fallback={stop.fallback} alt={`${stop.city}: ${stop.title}`} />
            <div className="journeyImageShade" />
            <div className="journeyStamp"><small>{stop.date}</small><strong>{stop.city}</strong></div>
            <div className="journeyIndex">{String(active + 1).padStart(2, "0")} / {String(itinerary.length).padStart(2, "0")}</div>
          </div>

          <div className="journeyCopy">
            <p className="eyebrow">{stop.meta}</p>
            <h3>{stop.title}</h3>
            <p>{stop.copy}</p>
            {stop.note && <div className="tentative">{stop.note}</div>}
            <div className="journeyControls">
              <button type="button" onClick={() => go(-1)} aria-label="Previous stop"><Arrow back /></button>
              <button type="button" onClick={() => go(1)} aria-label="Next stop"><Arrow /></button>
            </div>
          </div>
        </div>

        <div className="journeyRail" data-reveal>
          {itinerary.map((item, index) => (
            <button
              key={`${item.date}-${item.city}`}
              type="button"
              className={index === active ? "journeyStop isActive" : "journeyStop"}
              onClick={() => setActive(index)}
            >
              <span className="journeyThumb">
                <SafeImage src={item.image} fallback={item.fallback} alt="" />
                <i />
              </span>
              <small>{item.date}</small>
              <strong>{item.city}</strong>
              <span className="journeyProgress" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceTransition() {
  return (
    <section className="serviceTransition">
      <video autoPlay muted loop playsInline poster="/media/blanket-outreach-hires.webp" aria-hidden="true">
        <source src="/media/blanket-outreach.mp4" type="video/mp4" />
      </video>
      <div className="serviceShade" />
      <div className="pageShell serviceCopy" data-reveal>
        <p className="eyebrow">DEC 4-5 • PUNE</p>
        <h2><span>NOW</span><span>WE</span><em>SERVE.</em></h2>
        <p>When the itinerary stops being about places and becomes about people.</p>
      </div>
    </section>
  );
}

function CausesSection() {
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [hovering, setHovering] = useState(false);
  const start = useRef(0);
  const startTime = useRef(0);
  const suppressClickUntil = useRef(0);
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const go = (direction: number) => {
    setActive((current) => (current + direction + causes.length) % causes.length);
  };

  const offsetFor = (index: number) => {
    let offset = index - active;
    if (offset > causes.length / 2) offset -= causes.length;
    if (offset < -causes.length / 2) offset += causes.length;
    return offset;
  };

  useEffect(() => {
    Object.entries(videoRefs.current).forEach(([key, video]) => {
      if (!video) return;
      const index = Number(key);
      if (index === active) {
        video.muted = true;
        video.currentTime = Math.max(0, video.currentTime);
        void video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    });
  }, [active]);

  useEffect(() => {
    if (hovering || dragging) return;
    const timer = window.setInterval(() => go(1), 6500);
    return () => window.clearInterval(timer);
  }, [hovering, dragging]);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    const target = event.target as HTMLElement;
    if (target.closest(".causeControls, .causeDots")) return;
    start.current = event.clientX;
    startTime.current = performance.now();
    setDragging(true);
    setDragX(0);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    setDragX(event.clientX - start.current);
  };

  const onPointerEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const delta = event.clientX - start.current;
    const elapsed = Math.max(1, performance.now() - startTime.current);
    const velocity = Math.abs(delta) / elapsed;
    setDragging(false);
    setDragX(0);
    if (Math.abs(delta) > 42 || velocity > 0.34) {
      suppressClickUntil.current = performance.now() + 280;
      go(delta < 0 ? 1 : -1);
    }
  };

  const activeCause = causes[active];

  return (
    <section className="causesSection" id="causes">
      <div className="pageShell">
        <div className="causesHeading" data-reveal>
          <div>
            <span className="chapter">03</span>
            <p className="eyebrow">13 CAUSES • REAL IMPACT</p>
            <h2>One guest.<br /><em>One story to lead.</em></h2>
          </div>
          <div className="causesHeadingSide">
            <p>Everyone experiences the full journey. Each guest focuses more deeply on one cause for the film, while every story remains connected to the whole.</p>
            <div className="causeControls">
              <button type="button" onClick={() => go(-1)} aria-label="Previous cause"><Arrow back /></button>
              <button type="button" onClick={() => go(1)} aria-label="Next cause"><Arrow /></button>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={sectionRef}
        className={dragging ? "causeExperience isDragging" : "causeExperience"}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") { event.preventDefault(); go(-1); }
          if (event.key === "ArrowRight") { event.preventDefault(); go(1); }
        }}
        role="region"
        aria-label="Explore the 13 Goodwill India causes"
        tabIndex={0}
        style={{ "--drag-x": `${dragX}px` } as CSSProperties}
      >
        <div className="causeOrbitGlow" aria-hidden="true" />
        <div className="causeOrbit">
          {causes.map((cause, index) => {
            const offset = offsetFor(index);
            const distance = Math.abs(offset);
            if (distance > 2) return null;
            return (
              <article
                key={cause.no}
                className={offset === 0 ? "causeCard isActive" : "causeCard"}
                style={{ "--offset": offset, "--distance": distance } as CSSProperties}
                onClick={() => {
                  if (performance.now() < suppressClickUntil.current) return;
                  if (!dragging && offset !== 0) setActive(index);
                }}
              >
                <div className="causeMedia">
                  {cause.type === "video" ? (
                    <video
                      ref={(node) => { videoRefs.current[index] = node; }}
                      muted
                      loop
                      playsInline
                      autoPlay={offset === 0}
                      preload={Math.abs(offset) <= 1 ? "auto" : "metadata"}
                      poster={cause.poster}
                    >
                      <source src={cause.media} type="video/mp4" />
                    </video>
                  ) : (
                    <SafeImage src={cause.media} alt={cause.title} />
                  )}
                  <div className="causeMediaShade" />
                </div>
                <div className="causeNumber">{cause.no}</div>
                <div className="causeCardCopy">
                  <h3>{cause.title}</h3>
                  <p>{cause.tagline}</p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="causeStory pageShell">
          <div className="causeStoryNumber">{activeCause.no}</div>
          <div>
            <p className="eyebrow">{activeCause.tagline}</p>
            <h3>{activeCause.title}</h3>
          </div>
          <p>{activeCause.copy}</p>
          <div className="causeDots" aria-label="Choose a cause">
            {causes.map((cause, index) => (
              <button
                key={cause.no}
                type="button"
                className={index === active ? "isActive" : ""}
                onClick={() => setActive(index)}
                aria-label={`Show cause ${cause.no}: ${cause.title}`}
              >
                <span>{cause.no}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ImpactSection({ onCertificate }: { onCertificate: () => void }) {
  return (
    <section className="impactSection" id="impact">
      <div className="pageShell">
        <div className="impactHeader" data-reveal>
          <span className="chapter">04</span>
          <div>
            <p className="eyebrow">GOODWILL IN NUMBERS</p>
            <h2>Proof that quiet work<br /><em>can become enormous.</em></h2>
          </div>
        </div>

        <div className="impactLayout">
          <div className="impactStats" data-reveal>
            <article><strong>293,623</strong><span>items collected</span><small>Guinness World Records clothing collection</small></article>
            <article><strong>1,000+</strong><span>children fed daily</span><small>through school programmes</small></article>
            <article><strong>100+</strong><span>women in paid roles</span><small>across Goodwill programmes</small></article>
            <article><strong>7</strong><span>community centres</span><small>across the city</small></article>
          </div>

          <button className="certificateFeature" type="button" onClick={onCertificate} data-reveal>
            <SafeImage src="/media/guinness-certificate-v2.webp" alt="Guinness World Records certificate" />
            <div><small>VIEW THE CERTIFICATE</small><strong>Officially amazing.</strong></div>
          </button>
        </div>
      </div>
    </section>
  );
}

function FilmSection({ onFilm }: { onFilm: () => void }) {
  return (
    <section className="filmSection" id="film">
      <div className="pageShell filmLayout">
        <div className="filmCopy" data-reveal>
          <span className="chapter">05</span>
          <p className="eyebrow">THE FILM</p>
          <h2>A story worth<br /><em>carrying further.</em></h2>
          <p>The documentary is not a catalogue of programmes. It is about the people behind the work, the people being served and the guests willing to step inside the story.</p>
          <button type="button" className="textButton" onClick={onFilm}>Watch Goodwill in action <Arrow /></button>
        </div>

        <button type="button" className="filmWindow" onClick={onFilm} data-reveal aria-label="Play Goodwill India film">
          <video autoPlay muted loop playsInline poster="/media/video-poster.jpg">
            <source src="/media/goodwill-film-v2.mp4" type="video/mp4" />
          </video>
          <div className="filmWindowShade" />
          <span className="filmPlay"><PlayIcon /></span>
          <div className="filmCaption"><small>GOODWILL INDIA • THE FILM</small><strong>Real change lives in real people.</strong></div>
        </button>
      </div>
    </section>
  );
}

function PeopleSection() {
  return (
    <section className="peopleSection" id="people">
      <div className="pageShell">
        <div className="sectionIntro peopleIntro" data-reveal>
          <span className="chapter">06</span>
          <div>
            <p className="eyebrow">THE PEOPLE BEHIND THE STORY</p>
            <h2>Hosted with context.<br /><em>Filmed with purpose.</em></h2>
          </div>
          <p>The journey is held together by people who know the work, know India and know how to turn human stories into something that can travel.</p>
        </div>

        <div className="hostRow">
          {hosts.map((person) => (
            <article className="hostCard" key={person.name} data-reveal>
              <SafeImage src={person.image} alt={person.name} />
              <div className="hostShade" />
              <div className="hostRole">{person.role}</div>
              <div className="hostCopy"><h3>{person.name}</h3><p>{person.copy}</p></div>
            </article>
          ))}
        </div>

        <div className="teamLabel" data-reveal>
          <span>FILM & PRODUCTION</span>
          <i />
        </div>
        <div className="filmTeamRow">
          {filmTeam.map((person) => (
            <article className="teamCard" key={person.name} data-reveal>
              <SafeImage src={person.image} alt={person.name} />
              <div><strong>{person.name}</strong><span>{person.role}</span></div>
            </article>
          ))}
        </div>

        <div className="guestPanel" data-reveal>
          <div>
            <p className="eyebrow">TENTATIVE GUEST LIST</p>
            <h3>To be confirmed.</h3>
          </div>
          <div className="guestNames">
            {tentativeGuests.map((guest, index) => (
              <article key={guest}><span>{String(index + 1).padStart(2, "0")}</span><strong>{guest}</strong><small>Guest</small></article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function InvitationSection() {
  return (
    <section className="invitationSection" id="invite">
      <div className="invitationFilm" aria-hidden="true">
        <SafeImage src="/media/jaipur-hawa-mahal-v2.webp" alt="" />
        <div />
      </div>
      <div className="pageShell invitationGrid">
        <div className="invitationCopy" data-reveal>
          <p className="eyebrow">13 PLACES • DECEMBER 2026</p>
          <h2>There are only<br /><em>13 seats at this table.</em></h2>
          <p>If you feel called to be part of this experience, schedule a conversation directly with Anagha.</p>
          <a className="primaryButton" href={CALENDLY_URL} target="_blank" rel="noreferrer">Request your invitation <Arrow /></a>
        </div>

        <div className="supportCard" data-reveal>
          <span>CAN’T TRAVEL BUT WANT TO SUPPORT?</span>
          <h3>Help the story reach further.</h3>
          <p>Dan Weiseman’s crowdfunding pathway.</p>
          {CROWDFUNDING_URL ? (
            <a className="ghostButton" href={CROWDFUNDING_URL} target="_blank" rel="noreferrer">Support through crowdfunding <Arrow /></a>
          ) : (
            <div className="pendingLink">Crowdfunding link coming soon</div>
          )}
        </div>
      </div>
    </section>
  );
}

function FilmModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    if (!videoRef.current) return;
    if (open) void videoRef.current.play().catch(() => undefined);
    else videoRef.current.pause();
  }, [open]);
  if (!open) return null;
  return (
    <div className="modalBackdrop" role="dialog" aria-modal="true" aria-label="Goodwill India film">
      <button className="modalClose" type="button" onClick={onClose} aria-label="Close film">×</button>
      <div className="filmModal">
        <video ref={videoRef} controls playsInline poster="/media/video-poster.jpg">
          <source src="/media/goodwill-film-v2.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

function CertificateModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="modalBackdrop" role="dialog" aria-modal="true" aria-label="Guinness World Records certificate">
      <button className="modalClose" type="button" onClick={onClose} aria-label="Close certificate">×</button>
      <div className="certificateModal"><SafeImage src="/media/guinness-certificate-v2.webp" alt="Guinness World Records certificate" /></div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="siteFooter">
      <div className="pageShell footerGrid">
        <div className="footerBrand"><LotusMark /><div><strong>GOODWILL INDIA</strong><span>More Welfare Trust • Pune, Maharashtra, India</span></div></div>
        <nav aria-label="Footer navigation"><a href="#journey">Journey</a><a href="#causes">13 Causes</a><a href="#film">Film</a><a href="#people">People</a><a href="#impact">Impact</a></nav>
        <div className="footerCredit"><span>Created with purpose by</span><strong>Geek Informatic</strong></div>
      </div>
    </footer>
  );
}

export default function PremiumExperience() {
  const [filmOpen, setFilmOpen] = useState(false);
  const [certificateOpen, setCertificateOpen] = useState(false);
  useReveal();

  return (
    <main className="siteCanvas">
      <Header />
      <Hero onFilm={() => setFilmOpen(true)} />
      <WhyGoodwill onCertificate={() => setCertificateOpen(true)} />
      <JourneySection />
      <ServiceTransition />
      <CausesSection />
      <ImpactSection onCertificate={() => setCertificateOpen(true)} />
      <FilmSection onFilm={() => setFilmOpen(true)} />
      <PeopleSection />
      <InvitationSection />
      <Footer />
      <FilmModal open={filmOpen} onClose={() => setFilmOpen(false)} />
      <CertificateModal open={certificateOpen} onClose={() => setCertificateOpen(false)} />
    </main>
  );
}
