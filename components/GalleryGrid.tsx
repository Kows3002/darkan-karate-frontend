"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { galleryItems, type GalleryItem } from "@/data/gallery";
import { ResponsiveImage } from "@/components/ResponsiveImage";

function GalleryCard({ item, index, open, featured = false }: { item: GalleryItem; index: number; open: (index: number, trigger: HTMLButtonElement) => void; featured?: boolean }) {
  return <article className={`gallery-card ${item.portrait ? "gallery-card--portrait" : ""} ${featured ? "gallery-card--featured" : ""}`}>
    <button type="button" className="gallery-card__image" onClick={(event) => open(index, event.currentTarget)} aria-label={`Open ${item.title}`}>
      <ResponsiveImage src={item.src} fallbackSrc={item.fallbackSrc} width={item.width} height={item.height} fill alt={item.alt} sizes={featured ? "(max-width: 700px) 100vw, 66vw" : "(max-width: 700px) 100vw, 33vw"} style={{ objectPosition: item.position }} />
      <span aria-hidden="true">View photograph</span>
    </button>
    <div className="gallery-card__caption"><h3>{item.title}</h3><time>{item.date}</time></div>
  </article>;
}

export function GalleryGrid({ limit }: { limit?: number }) {
  const items = useMemo(() => limit ? galleryItems.slice(0, limit) : galleryItems, [limit]);
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const isOpen = active !== null;
  const tournament = items.map((item, index) => ({ item, index })).filter(({ item }) => item.category === "National Tournament");
  const grading = items.map((item, index) => ({ item, index })).filter(({ item }) => item.category === "Belt Grading");

  useEffect(() => {
    function key(event: KeyboardEvent) {
      if (!isOpen) return;
      if (event.key === "Escape") {
        event.preventDefault();
        setActive(null);
      }
      if (event.key === "ArrowRight") setActive((current) => current === null ? 0 : (current + 1) % items.length);
      if (event.key === "ArrowLeft") setActive((current) => current === null ? 0 : (current - 1 + items.length) % items.length);
      if (event.key === "Tab") {
        const controls = dialogRef.current?.querySelectorAll<HTMLElement>("button:not([disabled])");
        if (!controls?.length) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    }
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    window.addEventListener("keydown", key);
    return () => {
      window.removeEventListener("keydown", key);
      document.body.style.overflow = previousOverflow;
      triggerRef.current?.focus();
    };
  }, [isOpen, items.length]);

  const open = (index: number, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setActive(index);
  };

  return <>
    {limit ? <div className="photo-gallery">{items.map((item, index) => <button type="button" key={item.id} onClick={(event) => open(index, event.currentTarget)} className={`photo-gallery__item group ${item.portrait ? "photo-gallery__item--portrait" : ""}`} aria-label={`View ${item.title}, ${item.date}`}><ResponsiveImage src={item.src} fallbackSrc={item.fallbackSrc} width={item.width} height={item.height} fill alt={item.alt} className="object-cover transition duration-500 group-hover:scale-[1.02]" style={{ objectPosition: item.position }} sizes="(max-width:700px) 100vw, (max-width:1100px) 50vw, 33vw"/><span className="photo-gallery__label"><small>{item.category}</small><b>{item.title}</b><time>{item.date}</time></span></button>)}</div> : <div className="gallery-collections">
      <section className="gallery-collection" aria-labelledby="tournament-gallery-title">
        <header className="gallery-collection__head"><div><p>12 July 2026</p><h2 id="tournament-gallery-title">National Tournament</h2></div><span>{tournament.length} photographs</span></header>
        <div className="gallery-collection__grid gallery-collection__grid--tournament">{tournament.map(({ item, index }, order) => <GalleryCard key={item.id} item={item} index={index} open={open} featured={order === 0}/>)}</div>
      </section>
      <section className="gallery-collection gallery-collection--grading" aria-labelledby="grading-gallery-title">
        <header className="gallery-collection__head"><div><p>Student progression</p><h2 id="grading-gallery-title">Belt Gradings</h2></div><span>{grading.length} photographs</span></header>
        <div className="gallery-collection__grid gallery-collection__grid--grading">{grading.map(({ item, index }) => <GalleryCard key={item.id} item={item} index={index} open={open}/>)}</div>
      </section>
    </div>}

    {active !== null && <div ref={dialogRef} className="gallery-lightbox" role="dialog" aria-modal="true" aria-labelledby="gallery-lightbox-title">
      <button ref={closeRef} type="button" onClick={() => setActive(null)} className="gallery-lightbox__close" aria-label="Close photograph"><X size={30} aria-hidden="true"/></button>
      <button type="button" onClick={() => setActive((active - 1 + items.length) % items.length)} className="gallery-lightbox__previous" aria-label="Previous photograph"><ChevronLeft size={38} aria-hidden="true"/></button>
      <figure><ResponsiveImage src={items[active].src} fallbackSrc={items[active].fallbackSrc} width={items[active].width} height={items[active].height} fill alt={items[active].alt} className="object-contain" sizes="92vw"/><figcaption id="gallery-lightbox-title" className="sr-only">{items[active].title}, {items[active].date}</figcaption></figure>
      <button type="button" onClick={() => setActive((active + 1) % items.length)} className="gallery-lightbox__next" aria-label="Next photograph"><ChevronRight size={38} aria-hidden="true"/></button>
    </div>}
  </>;
}
