import Link from "next/link";
import { ArrowUpRight, CircleDot, Footprints, ShieldCheck, Wind } from "lucide-react";
import { site } from "@/data/site";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { createPageMetadata } from "@/data/metadata";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbStructuredData } from "@/data/structuredData";

export const metadata = createPageMetadata({
  title: "About Darkan Goju-Ryu Karate Academy",
  description: "Discover Darkan Academy’s traditional Okinawan Goju-Ryu Karate-Do and Kobudo teaching method, instructors, values and training approach in Tamil Nadu.",
  path: "/about",
  image: "/images/gallery/belt-grading-december-2025-hd.webp",
  imageAlt: "Darkan students and instructors after a karate belt grading in Tamil Nadu",
  imageWidth: 2400,
  imageHeight: 1800,
});

const method = [
  { mark: "基", title: "Build the base", text: "Stance, balance, guard and movement are corrected first, so later technique has a dependable foundation." },
  { mark: "形", title: "Study the form", text: "Kata gives students a clear sequence in which to practise direction, breathing, timing and control." },
  { mark: "用", title: "Understand the use", text: "Partner exercises connect formal movement with distance, response and practical application in a controlled setting." },
  { mark: "古", title: "Extend through Kobudo", text: "Traditional weapons practice develops coordination and awareness, introduced progressively with careful attention to safety." },
];

export default function About() {
  return <>
    <JsonLd data={breadcrumbStructuredData("About", "/about")}/>
    <section className="about-hero">
      <div className="container about-hero__grid">
        <div className="about-hero__copy">
          <p className="about-kicker">About Darkan · Established {site.established}</p>
          <h1>Old knowledge.<br/><span>Clear teaching.</span><br/>Real practice.</h1>
          <p>Darkan is a traditional Okinawan Goju-Ryu Karate-Do and Kobudo school serving children and adults in Tamil Nadu. We teach the details that make technique reliable: posture, breathing, timing, control and respectful conduct.</p>
          <div className="about-hero__actions"><Link href="/dojos" className="btn btn-red">Find a class</Link><Link href="/#faculty-title" className="about-text-link">Meet the instructors <ArrowUpRight aria-hidden="true"/></Link></div>
        </div>
        <div className="about-hero__mark" role="img" aria-label="Darkan academy emblem">
          <span className="about-hero__word" aria-hidden="true">剛柔</span>
          <ResponsiveImage src="/images/brand/darkan-academy-logo-clean.webp" fallbackSrc="/images/brand/darkan-academy-logo-clean.png" width={1254} height={1254} sizes="(max-width: 600px) 300px, 520px" priority alt=""/>
        </div>
      </div>
      <div className="container about-facts" aria-label="Academy at a glance">
        <div><strong>04</strong><span>Training locations</span></div>
        <div><strong>02</strong><span>Authorised instructors</span></div>
        <div><strong>20+</strong><span>Students</span></div>
        <div><strong>02</strong><span>Karate-Do and Kobudo</span></div>
      </div>
    </section>

    <section className="about-origin" aria-labelledby="about-origin-title">
      <div className="container about-origin__grid">
        <figure className="about-origin__photo">
          <ResponsiveImage src="/images/gallery/belt-grading-december-2025-hd.webp" fallbackSrc="/images/gallery/belt-grading-december-2025-hd.jpg" width={2400} height={1800} fill sizes="(min-width: 900px) 52vw, 100vw" alt="Darkan students and instructors together after a karate belt grading in Tamil Nadu"/>
          <figcaption><span>Training made visible</span> Students, instructors and earned progress.</figcaption>
        </figure>
        <div className="about-origin__story">
          <p className="about-kicker">Why we began</p>
          <h2 id="about-origin-title">A dojo should make progress understandable.</h2>
          <p>Darkan was established to give local students a steady route into traditional martial arts. Every class has a purpose: learn one detail, practise it correctly, receive a useful correction and return with a clearer understanding.</p>
          <p>That approach matters for a six-year-old entering a dojo for the first time and for an adult returning to physical training. The pace can differ; the standard of care does not.</p>
          <div className="about-origin__note"><CircleDot aria-hidden="true"/><p><strong>Our measure of progress</strong> is not how quickly a student collects techniques, but how well they can repeat sound movement with attention and control.</p></div>
        </div>
      </div>
    </section>

    <section className="about-method" aria-labelledby="about-method-title">
      <div className="container">
        <header className="about-section-head"><div><p className="about-kicker">How training is organised</p><h2 id="about-method-title">One lesson leads naturally to the next.</h2></div><p>Traditional practice becomes easier to understand when students know what they are building and why it matters.</p></header>
        <div className="about-method__grid">{method.map((item, index)=><article key={item.title}><span className="about-method__number">0{index + 1}</span><b aria-hidden="true">{item.mark}</b><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
      </div>
    </section>

    <section className="about-goju" aria-labelledby="about-goju-title">
      <div className="container about-goju__grid">
        <div className="about-goju__title"><p className="about-kicker">The meaning inside the name</p><h2 id="about-goju-title"><span>Go</span> gives structure.<br/><span>Ju</span> gives response.</h2></div>
        <div className="about-goju__principles">
          <article><ShieldCheck aria-hidden="true"/><div><h3>Firm without being rigid</h3><p>Strong posture, purposeful technique and responsible effort give training its shape.</p></div></article>
          <article><Wind aria-hidden="true"/><div><h3>Adaptable without losing form</h3><p>Breathing, sensitivity and timing help students respond without unnecessary tension.</p></div></article>
          <article><Footprints aria-hidden="true"/><div><h3>Progress without shortcuts</h3><p>Regular attendance and thoughtful repetition turn instruction into dependable skill.</p></div></article>
        </div>
      </div>
    </section>

    <section className="about-belong" aria-labelledby="about-belong-title">
      <div className="container about-belong__grid">
        <div><p className="about-kicker">Practice close to home</p><h2 id="about-belong-title">Four dojos. A shared standard.</h2><p>Classes are available in Thiruverkadu, Ayyapanthangal and Thundalam. Sensei Kannan leads an Ayyapanthangal dojo, while Sensei Kowsalya teaches at the Thiruverkadu, Ayyapanthangal and Thundalam dojos.</p></div>
        <div className="about-belong__affiliation"><span>Affiliation</span><h3>Connected to a wider traditional practice.</h3><p>Member of Sanbo Ken-Kai Goju-Ryu Karate-Do India (SANBO). Sanbo is affiliated with TOGKF, Okinawa, Japan.</p><Link href="/dojos">View locations and class times <ArrowUpRight aria-hidden="true"/></Link></div>
      </div>
    </section>
  </>;
}
