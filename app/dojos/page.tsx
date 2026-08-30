import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, Clock3, MapPin, MapPinned, ShieldCheck, UserRound } from "lucide-react";
import { dojos } from "@/data/dojos";
import { createPageMetadata } from "@/data/metadata";
import { JsonLd } from "@/components/JsonLd";
import { dojoStructuredData } from "@/data/structuredData";

export const metadata = createPageMetadata({
  title: "Karate Dojos in Chennai & Tamil Nadu | Darkan",
  description: "Find Darkan Karate dojo locations, class timings, instructors and Google Maps directions in Thiruverkadu, Ayyapanthangal and Thundalam, Tamil Nadu.",
  path: "/dojos",
  image: "/images/hero/traditional-goju-ryu-training.webp",
  imageAlt: "Traditional Goju-Ryu karate training at Darkan Academy in Tamil Nadu",
  imageWidth: 1536,
  imageHeight: 1024,
});

export default function Dojos() {
  return <>
    <JsonLd data={dojoStructuredData()}/>
    <section className="dojo-page-hero">
      <div className="container dojo-page-hero__grid">
        <div><p>Traditional training locations · Tamil Nadu</p><h1>Choose your dojo.</h1></div>
        <div className="dojo-page-hero__aside"><MapPinned aria-hidden="true"/><Link href="/contact">Ask about your first class <ArrowUpRight aria-hidden="true"/></Link></div>
      </div>
    </section>

    <section className="dojo-directory" aria-labelledby="dojo-directory-title">
      <div className="container">
        <header className="dojo-directory__head"><div><p>Weekly class directory</p><h2 id="dojo-directory-title">Times, instructors and exact locations.</h2></div><p>Compare the schedule below, then open the matching location in Google Maps. Contact us before attending so the instructor can confirm the class and guide first-time students.</p></header>
        <div className="dojo-directory__list">{dojos.map((dojo,index)=><article className="dojo-directory__card" id={dojo.slug} key={dojo.slug} style={{"--dojo-order":index} as CSSProperties}>
          <div className="dojo-directory__index"><span>0{index+1}</span><MapPin aria-hidden="true"/></div>
          <div className="dojo-directory__identity"><small>{dojo.area}</small><h3>{dojo.name}</h3><p>{dojo.programmes.join(" · ")}</p></div>
          <div className="dojo-directory__details">
            <div><Clock3 aria-hidden="true"/><span><small>Class time</small>{dojo.schedule.map(item=><strong key={item}>{item}</strong>)}</span></div>
            <div><UserRound aria-hidden="true"/><span><small>Instructor</small><strong>Sensei {dojo.instructor}</strong></span></div>
          </div>
          <div className="dojo-directory__actions"><a href={dojo.mapUrl} target="_blank" rel="noreferrer" aria-label={`Open ${dojo.name} in Google Maps`}>Open Google Maps <ArrowUpRight aria-hidden="true"/></a><Link href="/contact">Enquire</Link></div>
        </article>)}</div>
      </div>
    </section>

    <section className="dojo-first-visit">
      <div className="container dojo-first-visit__grid"><div><p>Before your first visit</p><h2>A clear start makes training easier.</h2></div><div className="dojo-first-visit__steps"><article><CalendarDays aria-hidden="true"/><span>01</span><h3>Confirm the class</h3><p>Choose your preferred dojo and contact us to confirm the next suitable session.</p></article><article><UserRound aria-hidden="true"/><span>02</span><h3>Share student details</h3><p>Tell us the student’s age and previous martial arts experience, if any.</p></article><article><ShieldCheck aria-hidden="true"/><span>03</span><h3>Attend and observe</h3><p>Arrive a little early, meet the instructor and understand how the dojo class is conducted.</p></article></div></div>
    </section>
  </>;
}
