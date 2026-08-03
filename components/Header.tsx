"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navigation } from "@/data/site";

const logo = "/images/brand/darkhan-academy-logo-clean.png";

export function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href="/" className="site-brand" onClick={() => setOpen(false)}>
          <Image
            src={logo}
            width={80}
            height={80}
            className="site-brand__logo"
            alt="Darkan Traditional Okinawan Karate Academy emblem"
            priority
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
          className="site-header__toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navigation.map(([name, href], index) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}>
              <span>0{index + 1}</span>
              {name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
