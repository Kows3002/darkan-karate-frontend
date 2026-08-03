"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { galleryItems, type GalleryItem } from "@/data/gallery";

function GalleryCard({ item, index, open, featured = false }: { item: GalleryItem; index: number; open: (index: number) => void; featured?: boolean }) {
  return <article className={`gallery-card ${item.portrait ? "gallery-card--portrait" : ""} ${featured ? "gallery-card--featured" : ""}`}>
    <button className="gallery-card__image" onClick={() => open(index)} aria-label={`Open ${item.title}`}>
      <Image src={item.src} fill alt={item.alt} quality={100} priority={index < 2} sizes={featured ? "(max-width: 700px) 100vw, 66vw" : "(max-width: 700px) 100vw, 33vw"} style={{ objectPosition: item.position }} />
      <span aria-hidden="true">View photograph</span>
    </button>
    <div className="gallery-card__caption"><h3>{item.title}</h3><time dateTime={item.date}>{item.date}</time></div>
  </article>;
}

export function GalleryGrid({ limit }: { limit?: number }) {
  const items = useMemo(() => limit ? galleryItems.slice(0, limit) : galleryItems, [limit]);
  const [active, setActive] = useState<number | null>(null);
  const tournament = items.map((item, index) => ({ item, index })).filter(({ item }) => item.category === "National Tournament");
  const grading = items.map((item, index) => ({ item, index })).filter(({ item }) => item.category === "Belt Grading");

  useEffect(() => {
    function key(event: KeyboardEvent) {
      if (active === null) return;
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive((active + 1) % items.length);
      if (event.key === "ArrowLeft") setActive((active - 1 + items.length) % items.length);
    }
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [active, items.length]);

  const open = (index: number) => setActive(index);

  return <>
    {limit ? <div className="photo-gallery">{items.map((item, index) => <button key={item.id} onClick={() => open(index)} className={`photo-gallery__item group ${item.portrait ? "photo-gallery__item--portrait" : ""}`} aria-label={`View ${item.title}, ${item.date}`}><Image src={item.src} fill alt={item.alt} className="object-cover transition duration-500 group-hover:scale-[1.02]" style={{ objectPosition: item.position }} quality={95} sizes="(max-width:700px) 100vw, (max-width:1100px) 50vw, 33vw"/><span className="photo-gallery__label"><small>{item.category}</small><b>{item.title}</b><time>{item.date}</time></span></button>)}</div> : <div className="gallery-collections">
      <section className="gallery-collection" aria-labelledby="tournament-gallery-title">
        <header className="gallery-collection__head"><div><p>12 July 2026</p><h2 id="tournament-gallery-title">National Tournament</h2></div><span>{tournament.length} photographs</span></header>
        <div className="gallery-collection__grid gallery-collection__grid--tournament">{tournament.map(({ item, index }, order) => <GalleryCard key={item.id} item={item} index={index} open={open} featured={order === 0}/>)}</div>
      </section>
      <section className="gallery-collection gallery-collection--grading" aria-labelledby="grading-gallery-title">
        <header className="gallery-collection__head"><div><p>Student progression</p><h2 id="grading-gallery-title">Belt Gradings</h2></div><span>{grading.length} photographs</span></header>
        <div className="gallery-collection__grid gallery-collection__grid--grading">{grading.map(({ item, index }) => <GalleryCard key={item.id} item={item} index={index} open={open}/>)}</div>
      </section>
    </div>}

    {active !== null && <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label="Gallery photograph">
      <button onClick={() => setActive(null)} className="gallery-lightbox__close" aria-label="Close photograph"><X size={30}/></button>
      <button onClick={() => setActive((active - 1 + items.length) % items.length)} className="gallery-lightbox__previous" aria-label="Previous photograph"><ChevronLeft size={38}/></button>
      <figure><Image src={items[active].src} fill alt={items[active].alt} className="object-contain" quality={100} sizes="92vw"/></figure>
      <button onClick={() => setActive((active + 1) % items.length)} className="gallery-lightbox__next" aria-label="Next photograph"><ChevronRight size={38}/></button>
    </div>}
  </>;
}
