import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { dojos } from "@/data/dojos";

export const metadata: Metadata = {
  title: "Contact Darkan Karate | Dojos in Chennai",
  description: "Contact Kowsalya or Kannan about Darkan Goju-Ryu Karate-Do and Kobudo classes in Thiruverkadu, Ayyapanthangal and Thundalam.",
};

const contacts = [
  { name: "Kowsalya", phone: "7305120039" },
  { name: "Kannan", phone: "7397321512" },
];

export default function Contact() {
  return <>
    <section className="contact-hero">
      <div className="container contact-hero__grid">
        <div><p>Contact Darkan</p><h1>Ask about a class.</h1></div>
        <p>Speak directly with an instructor or send the details below. Choose the dojo that is convenient for your regular training.</p>
      </div>
    </section>

    <main className="contact-page">
      <div className="container contact-layout">
        <aside className="contact-directory" aria-label="Instructor contact details">
          <header><p>Direct contact</p></header>
          <div className="contact-directory__people">
            {contacts.map(contact => <article key={contact.phone}><span><Phone aria-hidden="true"/></span><div><p>{contact.name}</p><a href={`tel:+91${contact.phone}`}>+91 {contact.phone}</a></div></article>)}
          </div>
          <a className="contact-directory__email" href="mailto:darkankarate25@gmail.com"><Mail aria-hidden="true"/><span><small>Email</small>darkankarate25@gmail.com</span></a>
          <div className="contact-directory__dojos"><p><MapPin aria-hidden="true"/>Dojos</p>{dojos.map(dojo => <span key={dojo.slug}>{dojo.name}</span>)}</div>
        </aside>

        <section className="contact-enquiry" aria-label="Class enquiry form">
          <div className="contact-enquiry__head"><p>Class enquiry</p></div>
          <ContactForm/>
        </section>
      </div>
    </main>
  </>;
}
