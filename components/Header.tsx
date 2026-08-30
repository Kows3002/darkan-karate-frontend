"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/data/site";
import { ResponsiveImage } from "@/components/ResponsiveImage";

const logo = "/images/brand/darkan-academy-logo-clean.webp";

export function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const toggle = toggleRef.current;
    document.body.style.overflow = "hidden";
    mobileNavRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const handleMenuKeys = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "Tab") {
        const links = mobileNavRef.current?.querySelectorAll<HTMLAnchorElement>("a");
        if (!toggle || !links?.length) return;
        const lastLink = links[links.length - 1];
        if (event.shiftKey && document.activeElement === toggle) {
          event.preventDefault();
          lastLink.focus();
        } else if (!event.shiftKey && document.activeElement === lastLink) {
          event.preventDefault();
          toggle.focus();
        }
      }
    };
    window.addEventListener("keydown", handleMenuKeys);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleMenuKeys);
      toggle?.focus();
    };
  }, [open]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1181px)");
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href="/" className="site-brand" onClick={() => setOpen(false)}>
          <ResponsiveImage
            src={logo}
            fallbackSrc="/images/brand/darkan-academy-logo-clean.png"
            width={80}
            height={80}
            className="site-brand__logo"
            alt=""
            sizes="(max-width: 390px) 50px, (max-width: 600px) 59px, (max-width: 1180px) 70px, 88px"
            loading="eager"
          />
          <span className="site-brand__name">
            <strong>Darkan Traditional Okinawan</strong>
            <small>Goju-Ryu Karate-Do &amp; Kobudo Academy</small>
          </span>
        </Link>

        <nav className="site-nav" aria-label="Main navigation">
          {navigation.map(([name, href]) => (
            <Link
              key={href}
              href={href}
              className={path === href ? "is-active" : ""}
              aria-current={path === href ? "page" : undefined}
            >
              {name}
            </Link>
          ))}
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="site-header__toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <nav ref={mobileNavRef} id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
          {navigation.map(([name, href], index) => (
            <Link key={href} href={href} aria-current={path === href ? "page" : undefined} onClick={() => setOpen(false)}>
              <span>0{index + 1}</span>
              {name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
