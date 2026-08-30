import { EventList } from "@/components/EventList";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { createPageMetadata } from "@/data/metadata";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbStructuredData } from "@/data/structuredData";

export const metadata = createPageMetadata({
  title: "Karate Events & Belt Gradings | Darkan Academy",
  description: "View Darkan Academy karate events, belt grading dates, tournament participation and student self-defence programmes across Chennai and Tamil Nadu.",
  path: "/events",
  image: "/images/events/velammal-self-defence/session-address.webp",
  imageAlt: "Darkan instructors leading a student self-defence awareness programme in Avadi",
  imageWidth: 864,
  imageHeight: 1152,
});

export default function Events() {
  return <>
    <JsonLd data={breadcrumbStructuredData("Events", "/events")}/>
    <section className="events-hero">
      <div className="container events-hero__grid">
        <div><h1>Work beyond the dojo.</h1></div>
        <div className="events-hero__next"><span>Next scheduled date</span><strong>16 August 2026</strong></div>
      </div>
    </section>

    <section className="school-session" aria-labelledby="school-session-title">
      <div className="container school-session__grid">
        <div className="school-session__story">
          <p className="school-session__eyebrow">Invited awareness programme · Avadi</p>
          <h2 id="school-session-title">Self-defence begins before a physical response.</h2>
          <p className="school-session__lead">We conduct a self-defence awareness session for the students of Velammal Nexus, Avadi.</p>
          <dl>
            <div><dt>Programme</dt><dd>Student self-defence awareness</dd></div>
            <div><dt>Host</dt><dd>Velammal Nexus, Avadi</dd></div>
            <div><dt>Instructors</dt><dd>Kannan and Kowsalya</dd></div>
          </dl>
        </div>
        <div className="school-session__photos" aria-label="Photographs from the Velammal Nexus self-defence awareness session">
          <figure className="school-session__photo school-session__photo--main"><ResponsiveImage src="/images/events/velammal-self-defence/session-address.webp" fallbackSrc="/images/events/velammal-self-defence/session-address.jpeg" width={864} height={1152} fill sizes="(min-width: 900px) 35vw, 100vw" alt="Kowsalya addressing students with Kannan during the self-defence awareness programme at Velammal Nexus Avadi"/></figure>
          <figure className="school-session__photo"><ResponsiveImage src="/images/events/velammal-self-defence/school-recognition.webp" fallbackSrc="/images/events/velammal-self-defence/school-recognition.jpeg" width={3119} height={4160} fill sizes="(min-width: 900px) 18vw, 50vw" alt="Velammal Nexus student and school representative with Kannan and Kowsalya after the awareness programme"/></figure>
          <figure className="school-session__photo"><ResponsiveImage src="/images/events/velammal-self-defence/awareness-session-team.webp" fallbackSrc="/images/events/velammal-self-defence/awareness-session-team.jpeg" width={3119} height={4160} fill sizes="(min-width: 900px) 18vw, 50vw" alt="Kannan and Kowsalya receiving an acknowledgement at Velammal Nexus Avadi"/></figure>
        </div>
      </div>
    </section>

    <section className="events-register">
      <div className="container">
        <header className="events-register__head"><div><p>Training record</p><h2>Gradings and tournament participation</h2></div></header>
        <EventList/>
      </div>
    </section>
  </>;
}
