import { dojos } from "@/data/dojos";
import { site } from "@/data/site";

const absolute = (path: string) => new URL(path, site.url).toString();

export const organizationId = `${site.url}/#organization`;
export const websiteId = `${site.url}/#website`;

export function homeStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: site.name,
        alternateName: site.shortName,
        url: site.url,
        logo: {
          "@type": "ImageObject",
          url: absolute("/images/brand/darkan-academy-logo-clean.png"),
          contentUrl: absolute("/images/brand/darkan-academy-logo-clean.png"),
          width: 1254,
          height: 1254,
        },
        image: absolute("/images/brand/darkan-academy-logo-clean.png"),
        description: "Traditional Okinawan Goju-Ryu Karate-Do and Kobudo academy serving children and adults in Tamil Nadu.",
        foundingDate: site.established,
        email: site.email,
        telephone: site.phone,
        contactPoint: site.contacts.map((contact) => ({
          "@type": "ContactPoint",
          name: contact.name,
          telephone: contact.phone,
          email: site.email,
          contactType: "class enquiries",
          areaServed: "IN-TN",
          availableLanguage: ["en", "ta"],
        })),
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Tamil Nadu",
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: site.url,
        name: site.shortName,
        alternateName: site.name,
        inLanguage: "en-IN",
        publisher: { "@id": organizationId },
      },
    ],
  };
}

export function breadcrumbStructuredData(name: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${absolute(path)}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: site.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name,
        item: absolute(path),
      },
    ],
  };
}

export function dojoStructuredData() {
  const services = [
    {
      "@type": "Service",
      "@id": `${absolute("/dojos")}#karate-training`,
      name: "Traditional Okinawan Goju-Ryu Karate-Do Classes",
      serviceType: "Karate training",
      description: "Structured traditional Goju-Ryu Karate-Do classes for children aged six and above and adults.",
      provider: { "@id": organizationId },
      areaServed: "Tamil Nadu",
      audience: { "@type": "Audience", audienceType: "Children aged 6+ and adults" },
      url: absolute("/dojos"),
    },
    {
      "@type": "Service",
      "@id": `${absolute("/dojos")}#kobudo-training`,
      name: "Traditional Okinawan Kobudo Classes",
      serviceType: "Kobudo training",
      description: "Progressive traditional Okinawan weapons training with emphasis on safety, coordination and correct fundamentals.",
      provider: { "@id": organizationId },
      areaServed: "Tamil Nadu",
      audience: { "@type": "Audience", audienceType: "Children aged 6+ and adults" },
      url: absolute("/dojos"),
    },
  ];

  const locations = dojos.map((dojo) => ({
    "@type": "SportsActivityLocation",
    "@id": `${absolute("/dojos")}#${dojo.slug}`,
    name: `${site.shortName} — ${dojo.name}`,
    description: `${dojo.programmes.join(" and ")} classes taught by Sensei ${dojo.instructor}.`,
    url: `${absolute("/dojos")}#${dojo.slug}`,
    hasMap: dojo.mapUrl,
    image: absolute("/images/brand/darkan-academy-logo-clean.png"),
    sport: ["Karate", "Kobudo"],
    email: site.email,
    telephone: site.phone,
    parentOrganization: { "@id": organizationId },
    address: {
      "@type": "PostalAddress",
      addressLocality: dojo.area,
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    areaServed: dojo.area,
    makesOffer: services.map((service) => ({
      "@type": "Offer",
      itemOffered: { "@id": service["@id"] },
    })),
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [breadcrumbStructuredData("Dojos", "/dojos"), ...services, ...locations],
  };
}

export function contactStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbStructuredData("Contact", "/contact"),
      {
        "@type": "ContactPage",
        "@id": `${absolute("/contact")}#webpage`,
        url: absolute("/contact"),
        name: "Contact Darkan Karate Academy",
        description: "Contact Darkan instructors about traditional Goju-Ryu Karate-Do and Kobudo classes in Tamil Nadu.",
        inLanguage: "en-IN",
        isPartOf: { "@id": websiteId },
        about: { "@id": organizationId },
        mainEntity: { "@id": organizationId },
      },
    ],
  };
}
