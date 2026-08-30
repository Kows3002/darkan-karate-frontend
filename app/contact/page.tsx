import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { dojos } from "@/data/dojos";
import { createPageMetadata } from "@/data/metadata";
import { JsonLd } from "@/components/JsonLd";
import { contactStructuredData } from "@/data/structuredData";

export const metadata = createPageMetadata({
  title: "Contact Darkan Karate Academy in Chennai",
  description: "Contact Darkan instructors about traditional Goju-Ryu Karate-Do and Kobudo classes in Thiruverkadu, Ayyapanthangal or Thundalam, Tamil Nadu.",
  path: "/contact",
  image: "/images/brand/darkan-academy-logo-clean.webp",
  imageAlt: "Darkan Traditional Okinawan Karate Academy logo",
  imageWidth: 1254,
  imageHeight: 1254,
});

const contacts = [
  { name: "Kowsalya", phone: "7305120039" },
  { name: "Kannan", phone: "7397321512" },
];

export default function Contact() {
  return <>
    <JsonLd data={contactStructuredData()}/>
    <section className="contact-hero">
      <div className="container contact-hero__grid">
        <div><p>Contact Darkan</p><h1>Ask about a class.</h1></div>
        <p>Speak directly with an instructor or send the details below. Choose the dojo that is convenient for your regular training.</p>
      </div>
    </section>

    <div className="contact-page">
      <div className="container contact-layout">
        <aside className="contact-directory" aria-label="Instructor contact details">
          <h2 className="sr-only">Instructor contact details</h2>
          <header><p>Direct contact</p></header>
          <div className="contact-directory__people">
            {contacts.map(contact => <article key={contact.phone}><span><Phone aria-hidden="true"/></span><div><p>{contact.name}</p><a href={`tel:+91${contact.phone}`}>+91 {contact.phone}</a></div></article>)}
          </div>
          <a className="contact-directory__email" href="mailto:darkankarate25@gmail.com"><Mail aria-hidden="true"/><span><small>Email</small>darkankarate25@gmail.com</span></a>
          <div className="contact-directory__dojos"><p><MapPin aria-hidden="true"/>Dojos</p>{dojos.map(dojo => <span key={dojo.slug}>{dojo.name}</span>)}</div>
        </aside>

        <section className="contact-enquiry" aria-label="Class enquiry form">
          <h2 className="sr-only">Class enquiry form</h2>
          <div className="contact-enquiry__head"><p>Class enquiry</p></div>
          <ContactForm/>
        </section>
      </div>
    </div>
  </>;
}
